import React from 'react';

class Login extends React.Component{

      login = (e)=>{
        e.preventDefault();
        var formData = new FormData();
        formData.append('username', e.target.username.value);
        formData.append('password', e.target.password.value);
        var message = document.getElementById('message');
        message.innerHTML = '';
        var url = '/users';
        fetch(url, {method: "POST", cache: "reload", body: new URLSearchParams(formData), redirect: 'follow'})
        .then(res=>{
          return res.json()
        })
        .then(res=>{
          if(res.validated){
            window.location.href = res.url
          }else {
            message.innerHTML = res.message;
          }
        })
        .catch((err)=> console.log(err));
      }

      componentDidMount(){
        // CHECK IF USER IS LOGGED IN.
        fetch('/login', {method: "POST", cache: "reload", redirect: 'follow'})
        .then((response)=>{
          return response.json()
        })
        .then(res=>{
          if(res.validated){
            window.location.href = res.url
          }
        })
        .catch((err)=> console.log(err));
      }

      render(){

        return(
          <>
            <form id="login" action="/users" method='post' onSubmit={this.login}>
              <h3>Log in here</h3>
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