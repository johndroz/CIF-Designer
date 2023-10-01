import React from 'react';

class Account extends React.Component{

    logout = (e)=>{
        var urlParams = new URLSearchParams(window.location.search);
        this.username = urlParams.get('username');
        var formData = new FormData();
        formData.append('username', this.username);
        fetch('/logout', {method: "POST", cache: "reload", body: new URLSearchParams(formData), redirect: 'follow'})
        .then(res=>{
            window.location.href = res.url;
        })
        .catch((err)=> console.log(err));
    }

      render(){

        var urlParams = new URLSearchParams(window.location.search);
        this.username = urlParams.get('username');
        var formData = new FormData();
        formData.append('username', this.username);
        var url = '/account';
        fetch(url, {method: "POST", cache: "reload", body: new URLSearchParams(formData), redirect: 'follow'})
        .then(response=>{
            return response.json();
        })
        .then((obj) =>{
            let designArea = document.getElementById('user-designs');
            let desLength = obj.designs.length;
            if(!obj.validated){
                window.location.href = '/login';
            } else {
                if(desLength > 0){  // VALIDATED RESPONSE START
                    obj.designs.forEach((design, i)=>{
                        
                        // WRAPPER FOR NEW DESIGN
                        let newDesign = document.createElement('div');
                        designArea.append(newDesign);
    
                        // TITLE, TOOLBAR & USER DESIGN FRONT/BACK STYLES
                        let title = document.createElement('h3');
                        title.innerHTML = design.title;
    
                        let userTB = document.createElement('div');
                        userTB.classList.add('user-design-toolbar');
    
                        let tbDownload = document.createElement('div');
                        let downloadBtn = document.createElement('input');
                        downloadBtn.type = 'button';
                        downloadBtn.value = "Download";
                        tbDownload.append(downloadBtn);
    
                        let tbPlacements = document.createElement('div');
                        let btnFront = document.createElement('input');
                        btnFront.type = 'button';
                        btnFront.value = "Front"
                        let btnBack = document.createElement('input');
                        btnBack.type = 'button';
                        btnBack.value = "Back";
                        tbPlacements.append(btnFront, btnBack);
    
                        userTB.append(tbDownload, tbPlacements);
    
                        let designFront = document.createElement('canvas');
                        designFront.classList.add('user-design-front')
    
                        let designBack = document.createElement('canvas');
                        designBack.classList.add('user-design-back');
    
    
                        // ADD TOOLBAR, DESIGN FRONT, DESIGN BACK
                        newDesign.append(title, userTB, designFront, designBack);
    
                    })
                    
                } else {
                    designArea.innerHTML = "<h3>No Designs Yet.</h3>"
                }
            } // VALIDATED RESPONSE END
            
        })
        .catch((err)=> console.log(err));

        return(
          <>
            <h2>Designs for {this.username}</h2>
            <div id="user-designs">

            </div>
            <button id="logout" onClick={this.logout}>Log out</button>
          </>
          
        );
  
      }
}

export default Account;