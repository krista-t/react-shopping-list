import LineItem from "./LineItem";
const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        //LINEITEM IS A COMPONENT
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemList;
