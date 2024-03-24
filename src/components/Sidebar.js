import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Block from "./Block";

export default function Sidebar({ data: initialData }) {
  const [data, setData] = useState(initialData); // State to hold modified data

  const handleInputChange = (event, id) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, input: event.target.value } : item
    );
    setData(newData);
  };

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <Droppable droppableId="side_menu">
        {(provided) => (
          <ul
            className=""
            ref={provided.innerRef}
            {...provided.droppableProps}
            
          >
            {data.map((item, index) => (
              <Draggable
                key={item.id.toString()} 
                draggableId={item.id.toString()} 
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Block
                      item={item}
                      index={index}
                      handleInputChange={handleInputChange}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
