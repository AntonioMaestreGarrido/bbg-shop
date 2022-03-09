import { Link, Router, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function Header({ state }) {
  const pushLink = useNavigate();

  function handleClick(link) {
    pushLink(link, false);
  }
  return (
    <div id="header">
      <h1 id="header">Aqui va a ir la cabecera {countItemsinCart(state)}</h1>
      <button onClick={() => handleClick("about")}>About</button>
      <button onClick={() => handleClick("landing")}>Landing</button>
      <button onClick={() => handleClick("cart")}>Cart</button>
      <button onClick={() => handleClick("items")}>Items</button>
    </div>
  );
}
//  <Link to="/about">cart</Link>
function countItemsinCart(state) {
  console.log("count");
  console.log(state);
  let count = 0;
  state.forEach((ele) => {
    count = ele.count + count;
  });
  return count;
}
