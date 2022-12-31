import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/home/product/Product";
import Cart from "./pages/home/cart/Cart";
import Tickets from "./pages/home/tickets/Tickets";
import Stats from "./pages/home/stats/Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Product" element={<Product/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Tickets" element={<Tickets/>} />
        <Route path="/Stats" element={<Stats/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;