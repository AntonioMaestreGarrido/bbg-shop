import { useState, useEffect, useReducer } from "react";

//export const cartInitialState = [4, 4];

export const TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ONE_TO_CART: "REMOVE_ONE_TO_CART",
  REMOVE_ALL: "REMOVE_ALL",
  CLEAR_CART: "CLEAR_CART"
};

export function cartReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let item = state.find((ele) => ele.id === action.payload);
      if (item === undefined) {
        return [...state, { id: action.payload, count: 1 }];
      } else {
        return [
          ...state.filter((ele) => ele.id !== action.payload),
          { id: item.id, count: item.count++ }
        ];
      }
    }
    case TYPES.REMOVE_ALL: {
      state = [];
      console.log("newState", state);
      return state;
    }
    case TYPES.REMOVE_ONE_TO_CART: {
      let tempItem = state.find((ele) => ele.id === action.payload);
      if (tempItem.count > 1) {
        return [
          ...state.filter((ele) => ele.id !== action.payload),
          { id: tempItem.id, count: tempItem.count - 1 }
        ];
      } else {
        return [...state.filter((ele) => ele.id !== action.payload)];
      }
    } /*
    case TYPES.CLEAR_CART: {
      console.log("");
      return newState;
    }*/
    default: {
      console.log("defaul");
      return state;
    }
  }
}
