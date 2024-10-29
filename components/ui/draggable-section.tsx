import { useDrag, useDrop } from 'react-dnd'

interface Props {
  id: string
  children: React.ReactNode
  moveSection: (fromId: string, toId: string) => void
  className?: string
}

const DraggableSection = ({ id, children, moveSection, className }: Props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'SECTION',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, dropRef] = useDrop({
    accept: 'SECTION',
    drop: (item: { id: string }) => {
      if (item.id !== id) {
        moveSection(item.id, id)
        item.id = id
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <section
      ref={(node) => {
        if (node) {
          dragRef(node)
          dropRef(node)
        }
      }}
      style={{
        backgroundColor: isDragging
          ? 'lightblue'
          : isOver
            ? 'lightcoral'
            : 'transparent',
        opacity: isDragging || isOver ? 0.5 : 1,
        cursor: isDragging ? 'move' : 'pointer',
        width: '100%',
        height: '100%',
      }}
      className={className}
    >
      {children}
    </section>
  )
}

export default DraggableSection
