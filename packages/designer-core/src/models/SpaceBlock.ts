import type { ILineSegment, Rect } from '@silver-formily/designer-shared'
import type { ISpaceBlockType } from '../internals/TransformGeometry'
import type { TransformHelper } from './TransformHelper'
import type { TreeNode } from './TreeNode'
import {
  calcCrossSpaceBlockRect,
  calcSpaceBlockExtendsLine,
  calcSpaceBlockSnapLine,
  calcSpaceBlockSnapLineDistance,
  isEqualSpaceBlockDistance,
  shouldExtendSpaceBlock,
  TRANSFORM_HELPER_THRESHOLD,
} from '../internals/TransformGeometry'
import { SnapLine } from './SnapLine'

export type { ISpaceBlockType } from '../internals/TransformGeometry'

export interface ISpaceBlock {
  id?: string
  refer?: TreeNode
  rect?: Rect
  distance?: number
  type?: ISpaceBlockType
}

export type AroundSpaceBlock = Record<ISpaceBlockType, SpaceBlock>

export class SpaceBlock {
  _id: string
  distance: number
  refer: TreeNode
  helper: TransformHelper
  rect: Rect
  type: ISpaceBlockType
  constructor(helper: TransformHelper, box: ISpaceBlock) {
    this.helper = helper
    this.distance = box.distance
    this.refer = box.refer
    this.rect = box.rect
    this.type = box.type
  }

  get referRect() {
    if (!this.refer)
      return
    return this.helper.getNodeRect(this.refer)
  }

  get id() {
    return (
      this._id
      ?? `${this.rect.x}-${this.rect.y}-${this.rect.width}-${this.rect.height}`
    )
  }

  get next() {
    const spaceBlock = this.helper.calcAroundSpaceBlocks(this.referRect)
    return spaceBlock[this.type as any]
  }

  get extendsLine() {
    return calcSpaceBlockExtendsLine(
      this.type,
      this.rect,
      this.referRect,
      this.helper.dragNodesRect,
    )
  }

  get needExtendsLine() {
    return shouldExtendSpaceBlock(
      this.type,
      this.rect,
      this.referRect,
      this.helper.dragNodesRect,
    )
  }

  get crossReferRect() {
    return calcCrossSpaceBlockRect(
      this.rect,
      this.referRect,
      this.helper.dragNodesRect,
      this.type,
      'refer',
    )
  }

  get crossDragNodesRect() {
    return calcCrossSpaceBlockRect(
      this.rect,
      this.referRect,
      this.helper.dragNodesRect,
      this.type,
      'drag',
    )
  }

  get isometrics() {
    const results: SpaceBlock[] = []
    let spaceBlock: SpaceBlock = this as any
    while (spaceBlock.next) {
      spaceBlock = spaceBlock.next
      if (
        isEqualSpaceBlockDistance(
          this.distance,
          spaceBlock.distance,
          TRANSFORM_HELPER_THRESHOLD,
        )
      ) {
        if (results.some(box => box.distance !== spaceBlock.distance))
          continue
        results.push(spaceBlock)
      }
    }
    return results
  }

  get snapLine() {
    if (!this.isometrics.length)
      return
    const nextRect = this.next.rect
    const referRect = this.referRect
    const line = calcSpaceBlockSnapLine(this.type, nextRect, referRect)
    const distance = calcSpaceBlockSnapLineDistance(
      line,
      this.helper.dragNodesRect,
    )
    return new SnapLine(this.helper, {
      ...(line as ILineSegment),
      distance,
      type: 'space-block',
    })
  }
}
