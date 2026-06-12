<script setup lang="ts">
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed, onMounted, ref } from 'vue'

interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  target?: string
  rel?: string
}

interface HeroConfig {
  name?: string
  text?: string
  tagline?: string
  image?: DefaultTheme.ThemeableImage
  actions?: HeroAction[]
}

const GITHUB_REPO_URL = 'https://github.com/hezhengxu2018/silver-formily'
const GITHUB_API_URL = 'https://api.github.com/repos/hezhengxu2018/silver-formily'
const INITIAL_STARS = 6

const { frontmatter } = useData()
const stars = ref(INITIAL_STARS)

const hero = computed(() => frontmatter.value.hero as HeroConfig | undefined)
const primaryAction = computed(() => hero.value?.actions?.[0])
const formattedStars = computed(() => new Intl.NumberFormat('en-US').format(stars.value))

onMounted(async () => {
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok)
      return

    const data = await response.json() as { stargazers_count?: number }
    if (typeof data.stargazers_count === 'number')
      stars.value = data.stargazers_count
  }
  catch {
    // Keep the latest verified fallback value when the request fails.
  }
})
</script>

<template>
  <section v-if="hero" class="VPHero VPHomeHero">
    <div class="container">
      <div class="main">
        <div class="copy">
          <h1 class="heading">
            <span v-if="hero.name" class="name" v-html="hero.name" />
            <span v-if="hero.text" class="text" v-html="hero.text" />
          </h1>
          <p v-if="hero.tagline" class="tagline" v-html="hero.tagline" />
        </div>

        <div class="hero-actions">
          <a
            v-if="primaryAction"
            class="hero-primary-action"
            :href="primaryAction.link"
            :target="primaryAction.target"
            :rel="primaryAction.rel"
          >
            <span class="hero-primary-action__text">{{ primaryAction.text }}</span>
            <span class="hero-primary-action__arrow" aria-hidden="true">→</span>
          </a>

          <a
            class="hero-stars"
            :href="GITHUB_REPO_URL"
            target="_blank"
            rel="noreferrer"
            aria-label="View Silver Formily on GitHub"
          >
            <span class="hero-stars__icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="32" height="32" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.49 7.49 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
            </span>
            <span class="hero-stars__value">{{ formattedStars }}</span>
            <span class="hero-stars__label">GitHub Stars</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.VPHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 52px) 24px 72px;
  --hero-glow-brand: color-mix(in srgb, var(--vp-c-brand-1) 28%, transparent);
  --hero-glow-brand-soft: color-mix(in srgb, var(--vp-c-brand-3) 18%, transparent);
}

@media (min-width: 640px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 72px) 40px 88px;
  }
}

@media (min-width: 960px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 88px) 56px 104px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1180px;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  text-align: center;
}

.copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.heading {
  display: flex;
  flex-direction: column;
  margin: 0;
}

.name,
.text {
  max-width: 12ch;
  line-height: 0.96;
  letter-spacing: -0.05em;
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 800;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  text-wrap: balance;
  text-shadow:
    -1px 0 0 var(--hero-glow-brand),
    1px 0 0 var(--hero-glow-brand),
    0 0 18px var(--hero-glow-brand),
    0 0 42px var(--hero-glow-brand-soft),
    0 0 78px var(--hero-glow-brand-soft);
}

.tagline {
  margin: 0;
  max-width: 30ch;
  font-size: clamp(1.05rem, 2vw, 1.45rem);
  line-height: 1.65;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-wrap: balance;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px 32px;
}

.hero-primary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 120px;
  min-height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  background: linear-gradient(135deg, #2898ff, #0a6fe1);
  color: #fff;
  text-decoration: none;
  box-shadow:
    0 20px 48px rgba(37, 99, 235, 0.24),
    inset 0 1px 0 color-mix(in srgb, white 22%, transparent);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;
}

.hero-primary-action:hover {
  transform: translateY(-1px);
  color: #fff;
  background: linear-gradient(135deg, #2898ff, #0a6fe1);
  box-shadow:
    0 24px 56px rgba(37, 99, 235, 0.28),
    inset 0 1px 0 color-mix(in srgb, white 24%, transparent);
  filter: saturate(1.05);
}

.hero-primary-action__text,
.hero-primary-action__arrow {
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
}

.hero-stars {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.hero-stars:hover {
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
}

.hero-stars__icon {
  display: inline-flex;
  color: var(--vp-c-text-1);
  transform: scale(0.8);
}

.hero-stars__value,
.hero-stars__label {
  font-size: 14px;
  line-height: 1.1;
}

.hero-stars__value {
  font-weight: 600;
  padding: 0 4px;
}

.hero-stars__label {
  font-weight: 400;
}

@media (max-width: 767px) {
  .main {
    gap: 28px;
  }

  .hero-actions {
    width: 100%;
    gap: 16px;
  }

  .hero-primary-action {
    width: auto;
    min-width: 0;
    min-height: 40px;
    padding: 0 18px;
  }

  .hero-primary-action__text,
  .hero-primary-action__arrow {
    font-size: 14px;
  }

  .hero-stars__value,
  .hero-stars__label {
    font-size: 14px;
  }
}
</style>
