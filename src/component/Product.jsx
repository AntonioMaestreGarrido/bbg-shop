import { useLocation, useParams } from "react-router-dom";
import { IDtoGame } from "../aux/bggHooks";
import { UseShoppingCart, cartReducer, TYPES } from "../reducer/UsecartReducer";

export function Product({ dispatch }) {
  const location = useLocation();
  const paramans = useParams();
  const game = IDtoGame(paramans.id);

  if (!game) {
    return <h1>Juego no encontrado</h1>;
  }
  //in cleartext we clean some simbol from XHTHL
  let description = clearText(game.description);

  return (
    <>
      <h1>{getname(game)}</h1>
      <div id="gameProfile">
        {" "}
        <img src={game.image} alt="" width="30%" />
        <div>
          {" "}
          <div id="des">{description}</div>
          <div>
            From {game.minplayers.value} to {game.maxplayers.value} players
          </div>
          <div className="">Duracion:{game.playingtime.value} minutos</div>
          <button
            onClick={() =>
              dispatch({ type: TYPES.ADD_TO_CART, payload: game.id })
            }
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
function getname(game) {
  let gameName;
  if (Array.isArray(game.name)) {
    gameName = game.name[0].value;
  } else {
    gameName = game.name.value;
  }
  return gameName;
}
function clearText(d) {
  d = d.replaceAll("&amp;#10;", "");

  d = d.replaceAll("&amp;ldquo;", '"');
  d = d.replaceAll("&amp;rdquo;", '"');
  d = d.replaceAll("&amp;quot;", '"');
  d = d.replaceAll("&amp;rsquo;", "`");
  d = d.replaceAll("&amp;nbsp;", " ");
  

  d = d.replaceAll("&amp;mdash;", "");
  d = d.replaceAll("&amp;amp;", "");
  return d;
}
