import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./Additem";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

//app is the parent element and from there we can
//pass props down to every child element
function App() {
  const API_URL = "http://localhost:3500/items";
  //DEFAULT STATE CAN BE STRING or ARRAY
  // const [items, setItems] = useState(
  //   JSON.parse(localStorage.getItem("shoppinglist")) || []
  // );
  const [items, setItems] = useState([]);

  //set state for form input
  const [newItem, setNewItem] = useState(" ");
  //set state for search
  const [search, setSearch] = useState(" ");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   localStorage.setItem("shoppinglist", JSON.stringify(items));
  // }, [items]);
  // console.log("after useEffect");
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not received expected data");

        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        console.log(err);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => fetchItems(), 2000);
  }, []);

  //additem function
  const addItem = async (item) => {
    //set id by looking at the last item in arr(-1),add one to id,
    //otherwise leave id to be one if there is no items to add
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    //update rest of the list
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //item that we add is new item
      body: JSON.stringify(myNewItem),
    };

    //if there is result, if we added item, fetch error
    //will be resut and not null
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  const handleCheck = async (id) => {
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

    //get item that is checked
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    console.log(myItem[0]);
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    //set state
    setItems(listItems);
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
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Content
            // items={items.filter((item) =>
            //   item.item.toLowerCase().includes(search.toLowerCase())
            // )}
            items={items}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
