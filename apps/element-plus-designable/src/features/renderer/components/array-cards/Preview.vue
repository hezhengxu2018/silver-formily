<script lang="tsx">
import { TreeNodeWidget, useNode } from '@silver-formily/designer-vue'
import { ElCard, ElEmpty } from 'element-plus'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DnArrayCardsPreview',
  inheritAttrs: false,
  setup(_, { attrs }) {
    const nodeRef = useNode()

    return () => {
      const node = nodeRef.value
      const item = node?.children.find(child => child.props?.type !== 'void')
      const content = item?.children.map(child => <TreeNodeWidget key={child.id} node={child} />)

      return (
        <div class="dn-designable-array-cards">
          <ElCard {...attrs} shadow="never">
            {{
              default: () => content?.length
                ? content
                : <ElEmpty description="Droppable" imageSize={48} />,
              header: () => <span>{String(attrs.title ?? 'Array Cards')}</span>,
            }}
          </ElCard>
        </div>
      )
    }
  },
})
</script>
