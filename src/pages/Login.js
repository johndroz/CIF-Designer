import React from 'react';

class Login extends React.Component{
      login = (e)=>{
        e.preventDefault();
        var formData = new FormData();
        formData.append('username', e.target.username.value);
        formData.append('password', e.target.password.value);
        var message = document.getElementById('message');
        message.innerHTML = '';
        //var url = '/users?username=' + e.target.username.value + '&password=' + e.target.password.value;
        var url = '/users';
        fetch(url, {method: "POST", cache: "reload", body: new URLSearchParams(formData)})
        .then((response)=>{
          console.log(response);
          return response.text();
        })
        .then(text=>{
          message.innerHTML = text;
        })
        .catch((err)=> console.log(err));
      }

      render(){

        return(
          <>
            <form id="login" action="/users" method='post' onSubmit={this.login}>
                <input id="username" name="username" placeholder='Username'></input>
                <input id="password" name="password" placeholder='Password' type='password'></input>
                <button type='submit'>Submit</button>
            </form>

            <p id="message"></p>
          </>
          
        );
  
      }
}

export default Login;