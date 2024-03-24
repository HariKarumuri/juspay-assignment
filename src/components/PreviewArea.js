import React, { useState } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ columns }) {
  const [animations, setAnimations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStart = () => {
    const newAnimations = [];
    console.log(columns);
    Object.values(columns).forEach((column) => {
      if (column.name === "Mid Area") {
        column.items.forEach((item) => {
          switch (item.func) {
            case "move_steps":
              newAnimations.push({
                type: "translateX",
                value: `${item.input}px`,
              });
              break;
            case "turn_right":
              newAnimations.push({ type: "rotate", value: `${item.input}deg` });
              break;
            case "turn_left":
              newAnimations.push({
                type: "rotate",
                value: `-${item.input}deg`,
              });
              break;
            case "say":
              newAnimations.push({
                type: "say",
                message: item.input,
              });
              break;
            case "think":
              newAnimations.push({
                type: "think",
                message: item.input,
              });
              break;
            default:
              break;
          }
        });
      }
    });
    setAnimations(newAnimations);
    executeAnimations(newAnimations, 0); // Start executing animations
    console.log(newAnimations);
  };

  const executeAnimations = (animations, index) => {
    if (index >= animations.length) return; // Exit if all animations are executed
    setTimeout(() => {
      setCurrentIndex(index); // Set the current index to trigger the animation
      executeAnimations(animations, index + 1); // Execute next animation recursively
      // If it's a say or think animation, show a pop-up
      if (animations[index].type === "say") {
        alert(animations[index].message);
      } else if (animations[index].type === "think") {
        alert(`I am thinking: ${animations[index].message}`);
      }
    }, 500); // Adjust the delay as needed
  };

  return (
    <div className="h-full overflow-y-auto p-2 cat-body">
      <div className="flex justify-end">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleStart}
        >
          Start
        </button>
      </div>
      <div className="cat-container">
        <div className="playCat" style={{ position: "relative" }}>
          <div
            className="cat"
            style={{
              position: "absolute",
              transition: "all 0.3s ease-in-out",
              transform: animations
                .slice(0, currentIndex + 1)
                .reduce((acc, anim) => {
                  switch (anim.type) {
                    case "translateX":
                      return `${acc} translateX(${anim.value})`;
                    case "rotate":
                      return `${acc} rotate(${anim.value})`;
                    default:
                      return acc;
                  }
                }, ""),
            }}
          >
            <CatSprite />
          </div>
        </div>
      </div>
    </div>
  );
}
