import React from 'react';

class Footer extends React.Component{


    render(){
        return(
            <footer id="footer">
                <ul>
                    <li>
                        <a class="footer-link" href="">Contact</a> 
                    </li>
                    <li>
                        <a class="footer-link" href="">Resume</a>
                    </li>
                    <li>
                        <a class="footer-link" href="">Github</a>
                    </li>
                </ul>
            </footer>
        )
    }


}

export default Footer;