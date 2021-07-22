import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
const Content = () => {
  // name is a current state, setName is stat we set, we use const because we never modify name, we use state to do it later in code!!
  // const [name, setName] = useState("kris"); //default name
  // const [count, setCount] = useState(0);
  // const handleNameChange = () => {
  //   const names = ["Bob", "Mike", "Dave"];
  //   const int = Math.floor(Math.random() * 3);
  //   setName(names[int]);

  //DEFAULT STATE CAN BE STRING or ARRAY
  const [items, setItems] = useState([
    { id: 1, checked: true, item: "almonds" },

    { id: 2, checked: false, item: "peanuts" },
    { id: 3, checked: false, item: "cashews" },
  ]);

  const handleCheck = (id) => {
    //check if item.id  is not checked and copy array of unchecked items, else retun items
    const listItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item
    );
    //set state
    setItems(listItems);
    //use LS so list stays same after reload
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    //set state
    setItems(listItems);
    //use LS so list stays same after reload
    localStorage.setItem("shoppingList", JSON.stringify(listItems));
  };

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
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                //listen to change and call function-we have to pass call into anonymous function
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
              />
              <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(item.id)}
              >
                {item.item}
              </label>
              <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex="0"
              ></FaTrashAlt>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty</p>
      )}
    </main>
  );
};

export default Content;
