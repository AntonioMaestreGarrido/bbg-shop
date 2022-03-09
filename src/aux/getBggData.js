import { useState, useEffect } from "react";
import react from "react";
import productlist from "../data/productlist2.json";
import bggXmlApiClient from "bgg-xml-api-client";

export async function getItemData() {
  const gameData = [];

  for (let id of productlist.juegos) {
    let nombre, thumb;
    const data = await bggXmlApiClient.get("thing", { id: id });
    //console.log(data.data.item);

    /*if (Array.isArray(data.data.item.name)) {
      nombre = data.data.item.name[0].value;
    } else {
      nombre = data.data.item.name.value;
    }
    thumb = data.data.item.thumbnail;
*/
    gameData.push(data.data.item);

    //console.log(data.data.item.name[0].value);
  }
  var jsonData = JSON.stringify(gameData);

  return gameData;
}
