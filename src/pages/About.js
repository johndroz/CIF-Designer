const About = ()=> {
    
    return  <>
                <div id="about-wrapper">
                    <h1>T Shirt Mock-Up Generator Web Application</h1>

                    <h2>Project Overview</h2>
                    <p>
                    This project demonstrates user authentication and basic CRUD functionality. This web application can be used to create simple T-shirt mockups. It allows you to add your own image and styled text. You can create an account to save designs to your profile for future viewing.
                    </p>

                    <h2>Technologies Used</h2>
                    <ul>
                        <li>Frontend: <strong>React JS</strong></li>
                        <li>Backend: <strong>Node JS</strong></li>
                        <li>Databse: <strong>MongoDB</strong> with the <strong>mongoose</strong> library</li>
                    </ul>

                    <h2>Features</h2>
                    <ul>
                        <li>User Authentication</li>
                        <li>Mock up design editing</li>
                        <li>Preview shirt mock up</li>
                        <li>Account creation</li>
                        <li>Save mockups</li>
                        <li>Manage saved designs</li>
                    </ul>

                    <h3>User Authentication</h3>
                    <p>
                    I implemented <strong>passport js</strong> using the <strong>"Local Strategy."</strong> Once a user is authenticated by logging in with the correct creds, passport js creates cookie and session info that keep track of the current user. Passport js can be used as a middleware for handling request to routes which require authentication.
                    </p>

                    <h3>Mock-up Editor</h3>
                    <p>
                    The mock up generator is composed of multiple HTML canvas elements that have controls built into the UI. The canvas elements allow me to render graphics within the pixel grid. This allows me render user images and text which I can modify in the web application. I can select, resize, reposition or remove elements from the editor. I used a library <strong>fabric js</strong> to help me work with the HTML canvas elements.
                    </p>

                    <h3>Account Creation</h3>
                    <p>
                    The sign up form can be used to create an acount for the application. The form will check if the user already exists and will create the user in the database if there are no conflicts. Once an account is created, newly created mock ups can be saved.
                    </p>

                    <h3>Saving</h3>
                    <p>
                    After a design is created, it can be saved to your profile after logging in successfully. This creates a design object in the database and associates the user with the design.
                    </p>

                    <h3>Manage saved designs</h3>
                    <p>
                    After logging in, previously saved designs are visible in the account page. Saved designs can be downloaded onto your device or deleted if they are no longer needed.
                    </p>
                    
                </div>
                

        
            </>
}

export default About;