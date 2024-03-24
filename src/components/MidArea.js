import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Block from "./Block";

export default function MidArea({ data }) {
  return (
    <div className="flex-1 h-full overflow-auto">
      <Droppable droppableId="midAreaDroppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            className="h-full"
          >
            {data.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Block item={item} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}