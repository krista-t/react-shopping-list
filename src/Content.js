import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import ItemList from "./ItemList";
const Content = ({ items, setItems, handleCheck, handleDelete }) => {
  // name is a current state, setName is stat we set, we use const because we never modify name, we use state to do it later in code!!
  // const [name, setName] = useState("kris"); //default name
  // const [count, setCount] = useState(0);
  // const handleNameChange = () => {
  //   const names = ["Bob", "Mike", "Dave"];
  //   const int = Math.floor(Math.random() * 3);
  //   setName(names[int]);

  // const handleClick = () => {
  //   console.log("clicked");
  // };
  // const handleClick2 = () => {
  //   setCount(count + 1);
  //   console.log(count);
  // };
  // const handleClick3 = (e) => {
  //   console.log(e.target);
  // };
  return (
    <main>
      {/* CHECK EVENT ON p!! */}
      {/* <p onDoubleClick={handleClick}>Hello {name}</p>
      <button onClick={handleNameChange}>Change Name</button>
      <button
        onClick={() => {
          handleClick2();
        }}
      >
        Click it
      </button>
      <button
        onClick={(e) => {
          handleClick3(e);
        }}
      >
        Click it
      </button> */}
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty</p>
      )}
    </main>
  );
};

export default Content;
