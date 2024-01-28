import { Outlet, Link } from "react-router-dom";

function Nav(){

  window.onload = ()=>{
    var menuBtn = document.getElementById('menu-icon');
    var menuItems = document.querySelectorAll('.menu-item');
    console.log(menuItems);
    menuBtn.onclick = ()=>{
      menuItems.forEach(item=>{
        item.classList.toggle('visible');
      });
  }


  }
    return (
      
        <>
          <nav>
            <span id="tagline">
              Design<b className="alt">.</b> Create<b className="alt">.</b> Iterate<b className="alt">.</b>
            </span>
            <ul>
              <li id="menu-icon">
                <img src="menu.svg"></img>
              </li>
              <li className="menu-item">
                <Link to="/">Designer</Link>
              </li>
              <li className="menu-item">
                <Link to="/about">About</Link>
              </li>
              <li className="menu-item">
                <Link to="/login">Account</Link>
              </li>
              <li className="menu-item">
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
    };
    
    export default Nav;