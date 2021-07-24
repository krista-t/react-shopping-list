// const Header = (props) => {
//   return (
//     <header>
//       <h1>{props.title}</h1>
//     </header>
//   );
// };

//DESCTRUCTURING
const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

//SETDEFAULT IN CASE THERE IS NO PROPS
Header.defaultProps = {
  title: "Deafult Title",
};

export default Header;
