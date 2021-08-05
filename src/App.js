import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./Additem";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";

//app is the parent element and from there we can
//pass props down to every child element
function App() {
  //DEFAULT STATE CAN BE STRING or ARRAY
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList"))
  );

  //set state for form input
  const [newItem, setNewItem] = useState(" ");
  //set state for search
  const [search, setSearch] = useState(" ");
  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppingList", JSON.stringify(newItems));
  };
  //additem function
  const addItem = (item) => {
    //set id by looking at the last item in arr(-1),add one to id,
    //otherwise leave id to be one if there is no items to add
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  };

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
    setAndSaveItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    //set state
    setAndSaveItems(listItems);
  };
  //on submit item through form
  const handleSubmit = (e) => {
    e.preventDefault();
    //if field is empty  exit this function
    if (!newItem) return;
    console.log(newItem);
    //addItem
    addItem(newItem);
    setNewItem("");
  };
  return (
    <div className="App">
      {/* <div className = "title">Shopping List</div> */}
      <Header title="Shopping List" />

      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
