import React from 'react';

class Signup extends React.Component{

    signup = (e)=>{
        e.preventDefault();
        let message = document.getElementById('message');
        let formData = new FormData();
        formData.append('username', e.target.username.value);
        formData.append('password', e.target.password.value);
        let url = '/signup';
            fetch(url, {method: "POST", cache: "reload", body: new URLSearchParams(formData), redirect: 'follow'})
            .then(res=>{
                return res.json()
            })
            .then(obj=>{
                if(obj.userCreated){
                    window.location = obj.url;
                } else {
                    message.innerHTML = obj.message;
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
            <form id="signup" action="/signup" method='post' onSubmit={this.signup}>
              <h3>Sign Up here</h3>
                <input id="username" name="username" placeholder='Username'></input>
                <input id="password" name="password" placeholder='Password' type='password'></input>
                <input id="password-conf" name="password-conf" placeholder='Confirm Password' type='password'></input>
                <button type='submit'>Submit</button>
            </form>

            <p id="message"></p>
          </>
          
        );
  
      }
}

export default Signup;