import { Outlet, Link } from "react-router-dom";

function Nav(){ 
    return (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Account</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
    };
    
    export default Nav;