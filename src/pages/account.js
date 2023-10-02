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
                        designArea.appendChild(newDesign);
    
                        // TITLE, TOOLBAR & USER DESIGN FRONT/BACK STYLES
    
                        let userTB = document.createElement('div');
                        userTB.classList.add('user-design-toolbar');
    
                        let tbDownload = document.createElement('div');
                        let downloadBtn = document.createElement('input');
                        downloadBtn.type = 'button';
                        downloadBtn.value = "Download";
                        tbDownload.appendChild(downloadBtn);
    
                        userTB.appendChild(tbDownload);
    
                        let designFront = document.createElement('canvas');
                        designFront.id = design['_id'] + '-front';
    
                        let designBack = document.createElement('canvas');
                        designBack.id = design['_id'] + '-back';
    
                        // ADD TOOLBAR, DESIGN FRONT, DESIGN BACK
                        newDesign.append(userTB, designFront, designBack);

                        let front = new fabric.Canvas(design['_id']+ '-front');
                        front.loadFromJSON(design.front, ()=>{
                            let objects = front.getObjects();
                            let scale = 300 / 800;
                            objects.forEach(o=>{
                                o.scaleX *= scale;
                                o.scaleY *= scale;
                                o.left *= scale;
                                o.top *= scale;
                            })
                            front.setHeight(300);
                            front.setWidth(300);
                            front.backgroundImage.scaleX *= scale;
                            front.backgroundImage.scaleY *= scale;
                            front.renderAll();

                            let back = new fabric.Canvas(design['_id'] + '-back');
                            back.loadFromJSON(design.back, ()=>{
                                let obs = back.getObjects();
                                let scl = 300 / 800;
                                obs.forEach(o=>{
                                    o.scaleX *= scl;
                                    o.scaleY *= scl;
                                    o.left *= scl;
                                    o.top *= scl;
                                })
                                back.setHeight(300);
                                back.setWidth(300);
                                back.backgroundImage.scaleX *= scl;
                                back.backgroundImage.scaleY *= scl;
                                back.renderAll();
                            });
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