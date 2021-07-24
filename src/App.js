import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";

//app is the parent element and from there we can
//pass props down to every child element
function App() {
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
  return (
    <div className="App">
      <Header title="Groceries" />

      <Content
        items={items}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
