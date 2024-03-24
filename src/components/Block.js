import React from "react";

const Block = ({ item, index, handleInputChange }) => {
  return (
    <div>
      <div
        className={`flex flex-row text-white px-2 py-1 my-2 text-sm cursor-pointer rounded ${item.color} custom-block mt-5 shadow `}
        key={item.id}
      >
        <div class="puzzle-top"></div>
        <div className="content flex flex-row p-2">
          <p className="flex-3">{item.func}</p>
          <input
            type={item.inputType}
            className="border-black text-black rounded mx-2 sideBaritem-input text-sm "
            value={item.input}
            onChange={(event) => handleInputChange(event, item.id)}
          />
        </div>

        <div class="puzzle-bottom"></div>
      </div>
    </div>
  );
};

export default Block;
