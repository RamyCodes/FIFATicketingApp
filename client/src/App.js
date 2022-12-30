import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/home/product/Product";
import Cart from "./pages/home/cart/Cart";
import Tickets from "./pages/home/tickets/Tickets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Product" element={<Product/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Tickets" element={<Tickets/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;