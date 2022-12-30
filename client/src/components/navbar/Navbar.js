import "./navbar.css"
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  return (
    <div className="header">
        <div className="header-logo">
            <Link to={'/'}>
              <img src="https://digitalhub.fifa.com/transform/3a170b69-b0b5-4d0c-bca0-85880a60ea1a/World-Cup-logo-landscape-on-dark" alt="World Cup Logo"/>  
            </Link>
        </div>
        <div className="header-title">
            <p>Tickets - FIFA World Cup 2022™</p>
        </div>
        <div className="header-buttons">
            <button>Login</button>
            <Link to={'/Tickets'}>
            <button>My Tickets</button>
            </Link>
            <Link style={{color: "black"}} to={`/Cart`}>
            <Badge badgeContent ={quantity} color="primary">
            <ShoppingCartOutlinedIcon style={{fontSize:"35px", color:"white"}}/>
            </Badge>
            </Link>
        </div>
    </div>
  )
}

export default Navbar