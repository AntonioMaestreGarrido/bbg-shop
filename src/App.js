import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";

import { Footer } from "./component/Footer";
import { Header } from "./component/Header";
import { Product } from "./component/Product";

import { Side } from "./component/Side";
import "./styles.css";
import productData from "./data/extendedData.json";
import { Checkout } from "./component/Checkout";
import { Landing } from "./component/Landing";
import { About } from "./component/About";
import { getItemData } from "./aux/getBggData";
import { UseShoppingCart, cartReducer, TYPES } from "./reducer/UsecartReducer";

export default function App() {
  const [items, setItems] = useState(null);
  const [cart, setCart] = useState([]);

  const handleCart = (item) => {
    item = items.filter((ele) => ele.id === item);
    setCart([...cart, ...item]);
  };
  const removeCart = (item) => {
    setCart(cart.filter((ele) => item !== ele.id));
  };
  useEffect(() => {
    setItems(productData);
  }, []);

  // reducer

  const [state, dispatch] = useReducer(cartReducer, []);

  //          dispatch({type: 'increment'})}
  console.log(state.length);
  if (Array.isArray(items)) {
    return (
      <div>
        <Router>
          <Header state={state} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/landing" element={<Landing />} />
            <Route
              path="/product/:id"
              element={<Product handleCart={handleCart} dispatch={dispatch} />}
            />

            <Route
              path="/cart"
              element={<Checkout state={state} dispatch={dispatch} />}
            />
            <Route
              path="/items"
              element={
                <div id="middle">
                  <Side
                    items={items}
                    handleCart={handleCart}
                    dispatch={dispatch}
                  />
                </div>
              }
            />
          </Routes>
        </Router>
        <Footer />
      </div>
    );
  } else {
    return <h1>CARGANDO...</h1>;
  }
}
/*
    <Route path="/cart" element={<Checkout cart={cart} items={items}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/landing" element={<Landing />} />
*/
