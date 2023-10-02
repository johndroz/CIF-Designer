import { Outlet, Link } from "react-router-dom";

function Nav(){ 
    return (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Designer</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/login">Account</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
    };
    
    export default Nav;