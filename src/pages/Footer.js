import React from 'react';

class Footer extends React.Component{


    render(){
        return(
            <footer id="footer">
                <ul>
                    <li>
                        <a className="footer-link" href="mailto:johndrozdzynski@outlook.com">Contact</a> 
                    </li>
                    <li>
                        <a className="footer-link" href="">Resume</a>
                    </li>
                    <li>
                        <a className="footer-link" href="">Github</a>
                    </li>
                </ul>
            </footer>
        )
    }


}

export default Footer;