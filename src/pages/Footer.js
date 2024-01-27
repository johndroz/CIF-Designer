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
                        <a target="_blank" className="footer-link" href="https://github.com/johndroz/CIF-Designer">Github</a>
                    </li>
                </ul>
            </footer>
        )
    }


}

export default Footer;