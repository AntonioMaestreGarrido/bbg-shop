import { useState } from "react";
import { Products } from "./Products";

export function Side({ items, handleCart, dispatch }) {
  //analiza(items);
  const [nameFilter, setNameFilter] = useState("");
  const [filter, setFilter] = useState({
    keyToFind: "boardgamecategory",
    valueToFind: "*"
  });
  const handleFilter = (filtro) => setFilter(filtro);
  const categorias = [
    "Card Game",
    "Civilization",
    "Economic",
    "Bluffing",
    "Miniatures",
    "Puzzle",
    "Wargame",
    "Negotiation",
    "Dice",
    "Party Game",
    "Abstract Strategy"
  ];
  //"type": "boardgamedesigner", "id": "789", "value": "Vlaada Chvátil"
  const newArray = FiltraArray(items, {
    keyToFind: "boardgamecategory",
    valueToFind: "*"
  });

  return (
    <>
      <div id="side">
        <input
          id="filterByName"
          type="text"
          onChange={(e) => {
            setNameFilter(e.target.value);
          }}
        ></input>
        <button
          className="filter"
          onClick={() =>
            setFilter({ keyToFind: "boardgamecategory", valueToFind: "*" })
          }
        >
          Todos
        </button>
        {categorias.map((ele) => {
          return (
            <button
              className="filter"
              key={ele}
              onClick={() =>
                setFilter({ keyToFind: "boardgamecategory", valueToFind: ele })
              }
            >
              {ele}
            </button>
          );
        })}
      </div>
      <Products
        handleCart={handleCart}
        filter={filter}
        nameFilter={nameFilter}
        dispatch={dispatch}
      />
    </>
  );
}
function analiza(items) {
  const data = {};
  let i = 0;

  items.forEach((ele) => {
    ele.link.forEach((key) => {
      if (key.type === "boardgamecategory") {
        let clave = key.value;

        if (clave in data) {
          i++;

          data[clave] = data[clave] + 1;
        } else {
          i++;

          data[clave] = 1;
        }
      }
    });
  });
}
function FiltraArray(array, filtro) {
  // Usin an object with the Key and value to find
  const data = [];
  let KeytoFind = filtro.keyToFind;
  let valueToFind = filtro.valueToFind;
  array.forEach((ele) => {
    ele.link.forEach((key) => {
      if (
        (key.type === KeytoFind && key.value === valueToFind) ||
        (key.type === KeytoFind && valueToFind === "*")
        //if there is an * we include every item
      ) {
        //check to avid duplicates

        if (data.filter((ele2) => ele2.id === ele.id).length === 0) {
          data.push(ele);
        }
      }
    });
  });

  return data;
}
