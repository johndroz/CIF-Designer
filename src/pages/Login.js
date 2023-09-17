import React from 'react';

class Login extends React.Component{
      login = (e)=>{
        e.preventDefault();
        var message = document.getElementById('message');
        message.innerHTML = '';
        var url = '/users?username=' + e.target.username.value + '&password=' + e.target.password.value;
        fetch(url)
        .then((data)=> data.text())
        .then((text)=> {
            message.innerHTML = text;
            console.log(text);
        })
        .catch((err)=> console.log(err));
        

      }

      render(){

        return(
          <>
            <form method="get" onSubmit={this.login}>
                <input name="username" placeholder='Username'></input>
                <input name="password" placeholder='password' type='password'></input>
                <input type='submit' value="Submit"></input>
            </form>

            <p id="message"></p>
          </>
          
        );
  
      }
}

export default Login;