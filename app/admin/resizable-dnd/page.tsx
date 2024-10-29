'use client'

import PageLayout from '@/components/shared/page-layout'
import DraggableSection from '@/components/ui/draggable-section'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TableSampleUser from './_components/table-sample-user'
import TableSampleProduct from './_components/table-sample-product'
import { ScrollArea } from '@/components/ui/scroll-area'

const ResizableDnD = () => {
  const [sections, setSections] = useState([
    { id: '1', children: TableSampleUser },
    { id: '2', children: TableSampleProduct },
    { id: '3', children: TableSampleUser },
    { id: '4', children: TableSampleProduct },
  ])

  const moveSection = (fromId: string, toId: string) => {
    const fromIndex = sections.findIndex((section) => section.id === fromId)
    const toIndex = sections.findIndex((section) => section.id === toId)

    if (fromIndex === -1 || toIndex === -1) return // Safety check

    const updatedSections = [...sections]
    // Swap the elements at fromIndex and toIndex
    const temp = updatedSections[fromIndex]
    updatedSections[fromIndex] = updatedSections[toIndex]
    updatedSections[toIndex] = temp
    setSections(updatedSections)
  }

  return (
    <PageLayout title="Resizable & DnD Components">
      <DndProvider backend={HTML5Backend}>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[calc(100vh-162px)] rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <ScrollArea className="h-full">
                  <DraggableSection
                    id={sections[0].id}
                    moveSection={moveSection}
                  >
                    {sections[0].children()}
                  </DraggableSection>
                </ScrollArea>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={50}>
                <ScrollArea className="h-full">
                  <DraggableSection
                    id={sections[1].id}
                    moveSection={moveSection}
                  >
                    {sections[1].children()}
                  </DraggableSection>
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <ScrollArea className="h-full">
                  <DraggableSection
                    id={sections[2].id}
                    moveSection={moveSection}
                  >
                    {sections[2].children()}
                  </DraggableSection>
                </ScrollArea>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={50}>
                <ScrollArea className="h-full">
                  <DraggableSection
                    id={sections[3].id}
                    moveSection={moveSection}
                  >
                    {sections[3].children()}
                  </DraggableSection>
                </ScrollArea>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DndProvider>
    </PageLayout>
  )
}

export default ResizableDnD
