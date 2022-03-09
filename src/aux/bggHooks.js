import { useState, useEffect } from "react";
import productData from "../data/extendedData.json";

export function useGameBase() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(productData);
  }, []);
  return items;
}
//devuelve el bojeto juego a partir del ID
export function IDtoGame(id) {
  const items = productData;

  const temp = items.filter((ele) => ele.id === id);
  return temp[0];
}
export function dataFiltered(filtro) {
  const items = productData;

  // Usin an object with the Key and value to find
  const data = [];
  let KeytoFind = filtro.keyToFind;
  let valueToFind = filtro.valueToFind;
  items.forEach((ele) => {
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
export function getname(data) {
  let gameName;
  if (Array.isArray(data.name)) {
    gameName = data.name[0].value;
  } else {
    gameName = data.name.value;
  }

  return gameName;
}
