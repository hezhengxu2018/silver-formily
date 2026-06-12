import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'

import { createElementPlusDesignerPreset, elementPlusDesignerMaterials, elementPlusPreviewComponents } from '../index'

describe('elementPlusDesignerMaterials', () => {
  it('should expose input and select materials', () => {
    expect(elementPlusDesignerMaterials.map(item => item.name)).toEqual(['Input', 'Select'])
  })

  it('should create a minimal preset with preview components', () => {
    const preset = createElementPlusDesignerPreset()

    expect(preset.materials).toHaveLength(2)
    expect(Object.keys(preset.previewComponents)).toEqual(['Input', 'Select'])
  })

  it('should render preview components', async () => {
    const InputPreview = elementPlusPreviewComponents.Input
    const SelectPreview = elementPlusPreviewComponents.Select

    const inputScreen = await render(InputPreview, {
      props: {
        placeholder: 'Type here',
      },
    })

    const selectScreen = await render(SelectPreview, {
      props: {
        placeholder: 'Please select',
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ],
      },
    })

    await expect.element(inputScreen.getByRole('textbox')).toBeInTheDocument()
    await expect.element(selectScreen.getByRole('combobox')).toBeInTheDocument()
  })
})
