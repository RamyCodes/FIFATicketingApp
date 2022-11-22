import "./navbar.css"
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div class="header">
        <div class="header-logo">
            <Link to={'/'}>
              <img src="https://digitalhub.fifa.com/transform/3a170b69-b0b5-4d0c-bca0-85880a60ea1a/World-Cup-logo-landscape-on-dark" alt="World Cup Logo"/>  
            </Link>
        </div>
        <div class="header-title">
            <p>Tickets - FIFA World Cup 2022™</p>
        </div>
        <div class="header-buttons">
            <button>Register</button>
            <button>Login</button>
        </div>
    </div>
  )
}

export default Navbar