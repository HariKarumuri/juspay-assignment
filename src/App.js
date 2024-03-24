import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import FunctionListData from "./components/FunctionList";
import PreviewArea from "./components/PreviewArea";
import "./App.css";

const columnsFromBackend = {
  [uuid()]: {
    name: "Side Bar",
    items: FunctionListData,
  },
  [uuid()]: {
    name: "Mid Area",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);

  const handleInputChange = (columnId, itemId, newValue) => {
    const updatedColumns = { ...columns };
    const column = updatedColumns[columnId];
    const updatedItems = column.items.map((item) =>
      item.id === itemId ? { ...item, input: newValue } : item
    );
    column.items = updatedItems;
    setColumns(updatedColumns);
  };

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => (
            <div
              className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2"
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                className={`flex flex-row text-white px-2 py-1 my-2 text-sm cursor-pointer rounded ${item.color} custom-block mt-5 shadow `}
                              >
                                <div class="puzzle-top"></div>
                                <div className="content flex flex-row p-2">
                                  <p className="flex-3">{item.func}</p>
                                  <input
                                    type={item.inputType}
                                    className="border-black text-black rounded mx-2 sideBaritem-input text-sm "
                                    value={item.input}
                                    onChange={(e) =>
                                      handleInputChange(
                                        columnId,
                                        item.id,
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div class="puzzle-bottom"></div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}

          <div className="w-1/3 relative h-screen overflow-scroll flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea columns={columns} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
