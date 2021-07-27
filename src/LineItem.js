import { FaTrashAlt } from "react-icons/fa";
const LineItem = ({ item, handleCheck, handleDelete }) => (
  <li className="item">
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
      aria-label={`Delete ${item.item}`}
    ></FaTrashAlt>
  </li>
);

export default LineItem;
