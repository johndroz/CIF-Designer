import React from 'react';
import {fabric} from 'fabric';

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
                    obj.designs.forEach((design)=>{
                        
                        // WRAPPER FOR NEW DESIGN
                        let newDesign = document.createElement('div');
                        newDesign.classList.add('newDesign');
                        designArea.append(newDesign);
    
                        // TITLE, TOOLBAR & USER DESIGN FRONT/BACK STYLES
    
                        let userTB = document.createElement('div');
                        userTB.classList.add('user-design-toolbar');
    
                        let tbDownload = document.createElement('div');
                        let downloadBtn = document.createElement('input');
                        downloadBtn.type = 'button';
                        downloadBtn.value = "Download";
                        tbDownload.append(downloadBtn);
    
                        userTB.append(tbDownload);
    
                        let designFront = document.createElement('canvas');
                        designFront.id = 'user-design-front';
    
                        let designBack = document.createElement('canvas');
                        designBack.id = 'user-design-back';
    
                        // ADD TOOLBAR, DESIGN FRONT, DESIGN BACK
                        newDesign.append(userTB, designFront, designBack);

                        let front = new fabric.Canvas('user-design-front');
                        front.loadFromJSON(design.front, ()=>{
                            let objects = front.getObjects();
                            let scale = 300 / 800;
                            objects.forEach(o=>{
                                o.scaleX = scale;
                                o.scaleY = scale;
                            })
                            front.setHeight(300);
                            front.setWidth(300);
                            front.backgroundImage.scaleX *= scale;
                            front.backgroundImage.scaleY *= scale;
                            front.renderAll();
                        });
                        let back = new fabric.Canvas('user-design-back');
                        back.loadFromJSON(design.back, ()=>{
                            let objects = back.getObjects();
                            let scale = 300 / 800;
                            objects.forEach(o=>{
                                o.scaleX = scale;
                                o.scaleY = scale;
                            })
                            back.setHeight(300);
                            back.setWidth(300);
                            back.backgroundImage.scaleX *= scale;
                            back.backgroundImage.scaleY *= scale;
                            back.renderAll();
                        });
    
                    })
                    
                } else {
                    designArea.innerHTML = "<h3>No Designs Yet.</h3><br><a href='/'>Go to Designer</a>"
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