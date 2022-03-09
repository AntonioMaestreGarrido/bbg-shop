import { useState, useEffect } from "react";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import { Product } from "./Product";
import { getname, dataFiltered } from "../aux/bggHooks";
import { productData } from "../data/extendedData.json";
import { UseShoppingCart, cartReducer, TYPES } from "../reducer/UsecartReducer";

export function Products({ items, handleCart, filter, nameFilter, dispatch }) {
  //
  const [end, setEnd] = useState(20);
  const [start, setStart] = useState(0);
  items = productData;

  const pushLink = useNavigate();
  let { search } = useLocation();
  const step = 200; //Define la cantidad de juegos q se muestran a la vez
  let listado = dataFiltered(filter);
  if (nameFilter) {
    listado = listado.filter((e) =>
      getname(e).toLowerCase().includes(nameFilter)
    );
  }
  return (
    <div id="productos">
      {listado.map((ele, index) => {
        return (
          <div className="item" key={ele.id} index={ele.id}>
            <p className="gamename">{getname(ele)}</p>
            <img
              onClick={() => {
                pushLink(`/product/${ele.id}`);
              }}
              src={ele.thumbnail}
              alt=""
            />
            <button
              onClick={(e) =>
                dispatch({
                  type: TYPES.ADD_TO_CART,
                  payload: e.target.parentElement.getAttribute("index")
                })
              }
            >
              Add
            </button>
          </div>
        );
      })}

      {start !== 0 && (
        <button
          onClick={() => {
            setEnd(end - step);
            setStart(start - step);
          }}
        >
          Prev
        </button>
      )}
      <button
        onClick={() => {
          setEnd(end + step);
          setStart(start + step);
        }}
      >
        Next
      </button>
      <p>
        {start + 1}to {end} of {listado.length} juegos
      </p>
    </div>
  );
}

//.filter(  (ele) => items.indexOf(ele) < end && items.indexOf(ele) >= start  )

/*
 let query = new URLSearchParams(search);
  let desde = query.get("desde") ? query.get("desde") : 0;
  let hasta = query.get("hasta") ? query.get("desde") : 50;
  */
