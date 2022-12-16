import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/home/product/Product";
import Cart from "./pages/home/cart/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Product" element={<Product/>} />
        <Route path="/Cart" element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;