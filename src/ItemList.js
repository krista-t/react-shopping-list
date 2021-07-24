import { FaTrashAlt } from "react-icons/fa";
const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
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
  );
};

export default ItemList;
