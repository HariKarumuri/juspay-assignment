import { v4 as uuid } from "uuid";

const FunctionListData = [
  {
    id: uuid(),
    category: "motion",
    color: "bg-blue-600",
    input: 20,
    inputType: "number",
    func: "move_steps",
  },
  {
    id: uuid(),
    category: "motion",
    color: "bg-blue-600",
    input: 15,
    inputType: "number",
    func: "turn_right",
  },
  {
    id: uuid(),
    category: "motion",
    color: "bg-blue-600",
    input: 90,
    inputType: "number",
    func: "turn_left",
  },
  {
    id: uuid(),
    category: "Looks",
    color: "bg-purple-600",
    input: "hello",
    inputType: "text",
    func: "say",
  },
  {
    id: uuid(),
    category: "Looks",
    color: "bg-purple-600",
    input: "hmm",
    inputType: "text",
    func: "think",
  },
];
export default FunctionListData;
