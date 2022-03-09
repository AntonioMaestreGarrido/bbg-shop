import { useGameBase, IDtoGame, getname } from "../aux/bggHooks";
import { UseShoppingCart, cartReducer, TYPES } from "../reducer/UsecartReducer";

export function Checkout({ state, dispatch }) {
  //const sortedState=state.sort((a,b)=>parseInt(a.id)- parseInt( b.id))
  const sortedState = state.sort((a, b) => {
    let x = getname(IDtoGame(a.id));
    console.log(x);
    let y = getname(IDtoGame(b.id));
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });

  console.log(state);
  console.log(sortedState);
  return (
    <div>
      <h1>Carrito</h1>
      {sortedState.map((ele) => {
        let game = IDtoGame(ele.id);
        return (
          <div index={ele.id}>
            <img src={game.thumbnail} alt="" width="40px" />
            <span>
              {getname(game)} X {ele.count}
            </span>
            <button
              className="remove one"
              onClick={(e) =>
                dispatch({
                  type: TYPES.REMOVE_ONE_TO_CART,
                  payload: e.target.parentElement.getAttribute("index")
                })
              }
            >
              Remove
            </button>
            <br></br>
          </div>
        );
      })}
      <button onClick={(e) => dispatch({ type: TYPES.REMOVE_ALL })}>
        Clear all
      </button>
    </div>
  );
}
