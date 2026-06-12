<script setup lang="ts">
import type {
  BufferGeometry,
  Group,
  LineSegments,
  PerspectiveCamera,
  Points,
  Scene,
  WebGLRenderer,
} from 'three'
import { onBeforeUnmount, onMounted, shallowRef, useTemplateRef } from 'vue'

type ThreeModule = typeof import('three')

const canvasRef = useTemplateRef('canvas')
const hostRef = useTemplateRef('host')

const isReady = shallowRef(false)

let three: ThreeModule | undefined
let renderer: WebGLRenderer | undefined
let scene: Scene | undefined
let camera: PerspectiveCamera | undefined
let gridGroup: Group | undefined
let nodes: Points | undefined
let links: LineSegments | undefined
let dust: Points | undefined
let blueDust: Points | undefined
let frameId = 0
let resizeObserver: ResizeObserver | undefined

const pointerTarget = { x: 0, y: 0 }
const pointerCurrent = { x: 0, y: 0 }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function createCircleSprite() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext('2d')
  if (!context)
    return

  const center = size / 2
  const radius = size * 0.3
  const gradient = context.createRadialGradient(center, center, 0, center, center, radius * 1.9)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.94)')
  gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.42)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  context.fillStyle = gradient
  context.beginPath()
  context.arc(center, center, radius * 1.9, 0, Math.PI * 2)
  context.fill()

  return canvas
}

function onPointerMove(event: PointerEvent) {
  pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1
  pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1)
}

function onPointerLeave() {
  pointerTarget.x = 0
  pointerTarget.y = 0
}

function disposeGeometry(target?: BufferGeometry) {
  target?.dispose()
}

function disposeScene() {
  if (nodes) {
    disposeGeometry(nodes.geometry)
    nodes.material.dispose()
    scene?.remove(nodes)
    nodes = undefined
  }

  if (links) {
    disposeGeometry(links.geometry)
    links.material.dispose()
    scene?.remove(links)
    links = undefined
  }

  if (dust) {
    disposeGeometry(dust.geometry)
    dust.material.dispose()
    scene?.remove(dust)
    dust = undefined
  }

  if (blueDust) {
    disposeGeometry(blueDust.geometry)
    blueDust.material.dispose()
    scene?.remove(blueDust)
    blueDust = undefined
  }

  gridGroup = undefined
  scene = undefined

  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
    renderer.domElement.width = 0
    renderer.domElement.height = 0
    renderer = undefined
  }
}

function updateSize() {
  if (!renderer || !camera || !hostRef.value)
    return

  const { clientWidth, clientHeight } = hostRef.value
  if (!clientWidth || !clientHeight)
    return

  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(clientWidth, clientHeight, false)
}

function buildScene() {
  if (!three || !scene)
    return

  const {
    BufferGeometry,
    Color,
    Float32BufferAttribute,
    Group,
    LineBasicMaterial,
    LineSegments,
    Points,
    PointsMaterial,
    CanvasTexture,
  } = three

  const circleSprite = createCircleSprite()
  const pointMap = circleSprite ? new CanvasTexture(circleSprite) : undefined
  if (pointMap)
    pointMap.needsUpdate = true

  const nextGroup = new Group()

  const gridPositions: number[] = []
  const gridDivisionsX = 16
  const gridDivisionsY = 10
  const gridWidth = 22
  const gridHeight = 14

  for (let index = 0; index <= gridDivisionsX; index += 1) {
    const x = (index / gridDivisionsX - 0.5) * gridWidth
    gridPositions.push(x, -gridHeight / 2, 0, x, gridHeight / 2, 0)
  }

  for (let index = 0; index <= gridDivisionsY; index += 1) {
    const y = (index / gridDivisionsY - 0.5) * gridHeight
    gridPositions.push(-gridWidth / 2, y, 0, gridWidth / 2, y, 0)
  }

  const gridGeometry = new BufferGeometry()
  gridGeometry.setAttribute('position', new Float32BufferAttribute(gridPositions, 3))

  const gridMaterial = new LineBasicMaterial({
    color: new Color('#c6d7f2'),
    transparent: true,
    opacity: 0.34,
  })

  const grid = new LineSegments(gridGeometry, gridMaterial)
  grid.rotation.x = -0.91
  grid.rotation.z = -0.06
  grid.position.set(0, -2.5, -3.1)
  nextGroup.add(grid)

  const accentPositions: number[] = []
  for (let index = 0; index <= gridDivisionsX; index += 2) {
    for (let row = 0; row < gridDivisionsY; row += 2) {
      const x = (index / gridDivisionsX - 0.5) * gridWidth
      const y0 = (row / gridDivisionsY - 0.5) * gridHeight
      const y1 = ((row + 1) / gridDivisionsY - 0.5) * gridHeight
      accentPositions.push(x, y0, 0.35, x, y1, 0.35)
    }
  }

  const accentGeometry = new BufferGeometry()
  accentGeometry.setAttribute('position', new Float32BufferAttribute(accentPositions, 3))

  const accentMaterial = new LineBasicMaterial({
    color: new Color('#eff5ff'),
    transparent: true,
    opacity: 0.26,
  })

  const accents = new LineSegments(accentGeometry, accentMaterial)
  accents.rotation.copy(grid.rotation)
  accents.position.copy(grid.position)
  nextGroup.add(accents)

  const nodeCount = window.innerWidth < 768 ? 88 : 168
  const nodeBounds = {
    x: 12,
    y: 7.5,
    z: 4,
  }

  const pointPositions = new Float32Array(nodeCount * 3)
  const velocities = new Float32Array(nodeCount * 3)

  for (let index = 0; index < nodeCount; index += 1) {
    const base = index * 3
    pointPositions[base] = (Math.random() - 0.5) * nodeBounds.x * 2
    pointPositions[base + 1] = (Math.random() - 0.5) * nodeBounds.y * 2
    pointPositions[base + 2] = (Math.random() - 0.5) * nodeBounds.z * 2
    velocities[base] = (Math.random() - 0.5) * 0.0026
    velocities[base + 1] = (Math.random() - 0.5) * 0.002
    velocities[base + 2] = (Math.random() - 0.5) * 0.0016
  }

  const pointGeometry = new BufferGeometry()
  pointGeometry.setAttribute('position', new Float32BufferAttribute(pointPositions, 3))

  const pointMaterial = new PointsMaterial({
    color: new Color('#b44cff'),
    map: pointMap,
    alphaTest: 0.08,
    size: window.innerWidth < 768 ? 0.052 : 0.066,
    transparent: true,
    opacity: 0.82,
    sizeAttenuation: true,
  })

  const nextNodes = new Points(pointGeometry, pointMaterial)
  nextNodes.position.set(0, -0.2, -1.4)
  scene.add(nextNodes)

  const segmentLimit = window.innerWidth < 768 ? 240 : 520
  const linkThreshold = window.innerWidth < 768 ? 2.6 : 2.9
  const linkPositions: number[] = []

  for (let from = 0; from < nodeCount; from += 1) {
    const fromBase = from * 3
    const fromX = pointPositions[fromBase]
    const fromY = pointPositions[fromBase + 1]
    const fromZ = pointPositions[fromBase + 2]

    for (let to = from + 1; to < nodeCount; to += 1) {
      if (linkPositions.length / 6 >= segmentLimit)
        break

      const toBase = to * 3
      const dx = fromX - pointPositions[toBase]
      const dy = fromY - pointPositions[toBase + 1]
      const dz = fromZ - pointPositions[toBase + 2]
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (distance > linkThreshold || Math.random() > 0.42)
        continue

      linkPositions.push(
        fromX,
        fromY,
        fromZ,
        pointPositions[toBase],
        pointPositions[toBase + 1],
        pointPositions[toBase + 2],
      )
    }
  }

  const linkGeometry = new BufferGeometry()
  linkGeometry.setAttribute('position', new Float32BufferAttribute(linkPositions, 3))

  const linkMaterial = new LineBasicMaterial({
    color: new Color('#6fd0ff'),
    transparent: true,
    opacity: 0.16,
  })

  const nextLinks = new LineSegments(linkGeometry, linkMaterial)
  nextLinks.position.copy(nextNodes.position)
  scene.add(nextLinks)

  const dustCount = window.innerWidth < 768 ? 220 : 420
  const dustPositions = new Float32Array(dustCount * 3)

  for (let index = 0; index < dustCount; index += 1) {
    const base = index * 3
    dustPositions[base] = (Math.random() - 0.5) * 30
    dustPositions[base + 1] = (Math.random() - 0.5) * 16
    dustPositions[base + 2] = (Math.random() - 0.5) * 8
  }

  const dustGeometry = new BufferGeometry()
  dustGeometry.setAttribute('position', new Float32BufferAttribute(dustPositions, 3))

  const dustMaterial = new PointsMaterial({
    color: new Color('#8bdcff'),
    map: pointMap,
    alphaTest: 0.08,
    size: window.innerWidth < 768 ? 0.022 : 0.028,
    transparent: true,
    opacity: 0.28,
    sizeAttenuation: true,
  })

  const nextDust = new Points(dustGeometry, dustMaterial)
  nextDust.position.set(0, -0.4, -2.8)
  scene.add(nextDust)

  const blueDustCount = window.innerWidth < 768 ? 140 : 260
  const blueDustPositions = new Float32Array(blueDustCount * 3)

  for (let index = 0; index < blueDustCount; index += 1) {
    const base = index * 3
    blueDustPositions[base] = (Math.random() - 0.5) * 24
    blueDustPositions[base + 1] = (Math.random() - 0.5) * 12
    blueDustPositions[base + 2] = (Math.random() - 0.5) * 6
  }

  const blueDustGeometry = new BufferGeometry()
  blueDustGeometry.setAttribute('position', new Float32BufferAttribute(blueDustPositions, 3))

  const blueDustMaterial = new PointsMaterial({
    color: new Color('#52cfff'),
    map: pointMap,
    alphaTest: 0.08,
    size: window.innerWidth < 768 ? 0.026 : 0.034,
    transparent: true,
    opacity: 0.34,
    sizeAttenuation: true,
  })

  const nextBlueDust = new Points(blueDustGeometry, blueDustMaterial)
  nextBlueDust.position.set(0, -0.1, -1.9)
  scene.add(nextBlueDust)

  const updateFloatingNodes = () => {
    const positionAttribute = pointGeometry.getAttribute('position')
    const positions = positionAttribute.array as Float32Array

    for (let index = 0; index < nodeCount; index += 1) {
      const base = index * 3
      positions[base] += velocities[base]
      positions[base + 1] += velocities[base + 1]
      positions[base + 2] += velocities[base + 2]

      if (Math.abs(positions[base]) > nodeBounds.x)
        velocities[base] *= -1

      if (Math.abs(positions[base + 1]) > nodeBounds.y)
        velocities[base + 1] *= -1

      if (Math.abs(positions[base + 2]) > nodeBounds.z)
        velocities[base + 2] *= -1
    }

    positionAttribute.needsUpdate = true

    const linkAttribute = linkGeometry.getAttribute('position')
    const nextLinkPositions = linkAttribute.array as Float32Array
    let cursor = 0

    for (let from = 0; from < nodeCount; from += 1) {
      const fromBase = from * 3
      const fromX = positions[fromBase]
      const fromY = positions[fromBase + 1]
      const fromZ = positions[fromBase + 2]

      for (let to = from + 1; to < nodeCount; to += 1) {
        if (cursor >= nextLinkPositions.length)
          break

        const toBase = to * 3
        const dx = fromX - positions[toBase]
        const dy = fromY - positions[toBase + 1]
        const dz = fromZ - positions[toBase + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance > linkThreshold)
          continue

        nextLinkPositions[cursor] = fromX
        nextLinkPositions[cursor + 1] = fromY
        nextLinkPositions[cursor + 2] = fromZ
        nextLinkPositions[cursor + 3] = positions[toBase]
        nextLinkPositions[cursor + 4] = positions[toBase + 1]
        nextLinkPositions[cursor + 5] = positions[toBase + 2]
        cursor += 6
      }
    }

    while (cursor < nextLinkPositions.length) {
      nextLinkPositions[cursor] = 999
      nextLinkPositions[cursor + 1] = 999
      nextLinkPositions[cursor + 2] = 999
      nextLinkPositions[cursor + 3] = 999
      nextLinkPositions[cursor + 4] = 999
      nextLinkPositions[cursor + 5] = 999
      cursor += 6
    }

    linkAttribute.needsUpdate = true
  }

  gridGroup = nextGroup
  nodes = nextNodes
  links = nextLinks
  dust = nextDust
  blueDust = nextBlueDust
  scene.add(nextGroup)

  return updateFloatingNodes
}

onMounted(async () => {
  if (import.meta.env.SSR || !canvasRef.value || !hostRef.value)
    return

  three = await import('three')

  const {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
  } = three

  scene = new Scene()
  camera = new PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(0, 0, 14)

  renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvasRef.value,
    powerPreference: 'high-performance',
  })
  renderer.setClearAlpha(0)

  const updateFloatingNodes = buildScene()
  updateSize()
  isReady.value = true

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const render = (time: number) => {
    if (!renderer || !scene || !camera || !gridGroup)
      return

    pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.035
    pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.035

    const seconds = time * 0.001
    const drift = prefersReducedMotion ? 0.1 : 1

    gridGroup.rotation.y = pointerCurrent.x * 0.12
    gridGroup.rotation.x = -0.91 + pointerCurrent.y * 0.035
    gridGroup.position.x = pointerCurrent.x * 0.72
    gridGroup.position.y = -2.5 + pointerCurrent.y * 0.14

    if (nodes) {
      nodes.rotation.y = seconds * 0.044 * drift
      nodes.rotation.x = pointerCurrent.y * 0.03
      nodes.position.x = pointerCurrent.x * 0.58
      nodes.position.y = -0.2 + pointerCurrent.y * 0.14
      nodes.material.opacity = clamp(0.76 + Math.sin(seconds * 0.7) * 0.08, 0.68, 0.9)
    }

    if (links) {
      links.rotation.y = seconds * 0.04 * drift
      links.rotation.x = pointerCurrent.y * 0.03
      links.position.x = pointerCurrent.x * 0.58
      links.position.y = -0.2 + pointerCurrent.y * 0.14
      links.material.opacity = clamp(0.14 + Math.cos(seconds * 0.6) * 0.04, 0.11, 0.2)
    }

    if (dust) {
      dust.rotation.y = seconds * 0.018 * drift
      dust.position.x = pointerCurrent.x * 0.18
      dust.position.y = -0.4 + pointerCurrent.y * 0.08
      dust.material.opacity = clamp(0.24 + Math.sin(seconds * 0.35) * 0.04, 0.18, 0.32)
    }

    if (blueDust) {
      blueDust.rotation.y = seconds * 0.022 * drift
      blueDust.position.x = pointerCurrent.x * 0.24
      blueDust.position.y = -0.1 + pointerCurrent.y * 0.12
      blueDust.material.opacity = clamp(0.28 + Math.cos(seconds * 0.45) * 0.05, 0.22, 0.38)
    }

    camera.position.x = pointerCurrent.x * 0.55
    camera.position.y = pointerCurrent.y * 0.32
    camera.lookAt(0, 0, 0)

    if (!prefersReducedMotion)
      updateFloatingNodes?.()

    renderer.render(scene, camera)
    frameId = window.requestAnimationFrame(render)
  }

  resizeObserver = new ResizeObserver(() => updateSize())
  resizeObserver.observe(hostRef.value)

  window.addEventListener('resize', updateSize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave)

  frameId = window.requestAnimationFrame(render)
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(frameId)
  window.removeEventListener('resize', updateSize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
  resizeObserver?.disconnect()
  resizeObserver = undefined
  disposeScene()
})
</script>

<template>
  <div ref="host" class="portal-tech-grid" aria-hidden="true">
    <canvas ref="canvas" class="portal-tech-grid__canvas" />
    <div class="portal-tech-grid__wash" :class="{ 'is-ready': isReady }" />
  </div>
</template>

<style scoped>
.portal-tech-grid {
  position: absolute;
  top: calc(var(--vp-nav-height, 64px) - 1px);
  left: 0;
  right: 0;
  height: clamp(620px, 76vh, 900px);
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.98) 34%,
    rgba(0, 0, 0, 0.84) 74%,
    transparent 100%
  );
}

.portal-tech-grid__canvas,
.portal-tech-grid__wash {
  position: absolute;
  inset: 0;
}

.portal-tech-grid__canvas {
  width: 100%;
  height: 100%;
  opacity: 1;
}

.portal-tech-grid__wash {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.28) 0%,
    rgba(250, 252, 255, 0.1) 34%,
    rgba(255, 255, 255, 0) 76%
  );
  opacity: 0;
  transition: opacity 0.6s ease;
}

.portal-tech-grid__wash.is-ready {
  opacity: 1;
}

.dark .portal-tech-grid__canvas {
  opacity: 1;
}

.dark .portal-tech-grid__wash {
  background: linear-gradient(
    180deg,
    rgba(9, 12, 20, 0.42) 0%,
    rgba(9, 12, 20, 0.18) 34%,
    rgba(9, 12, 20, 0.04) 68%,
    transparent 100%
  );
}

@media (max-width: 768px) {
  .portal-tech-grid {
    height: clamp(520px, 64vh, 760px);
  }

  .portal-tech-grid__wash {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.24) 0%,
      rgba(250, 252, 255, 0.08) 34%,
      rgba(255, 255, 255, 0) 76%
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .portal-tech-grid__canvas {
    opacity: 0.7;
  }
}
</style>
