import React from 'react';
import {fabric} from 'fabric';
import { Buffer } from "buffer";

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
        var result;
        var urlParams = new URLSearchParams(window.location.search);
        this.username = urlParams.get('username');
        var formData = new FormData();
        formData.append('username', this.username);
        var url = '/account';
        fetch(url, {method: "POST", cache: "reload", body: new URLSearchParams(formData), redirect: 'follow'})
        .then(response=>{
        const reader = response.body.getReader();

        // Function to read and process data as it arrives.
        const processStream = ({ done, value }) => {
            if (done) {
                console.log('Stream finished.');
                return;
            }
        
            // Process the chunk of data as it arrives.
            console.log(value);
            
            // Continue reading the next chunk.
            return reader.read().then(processStream);
            };
        
            // Start processing the stream.
            return reader.read().then(processStream);
        })
        .then(response=>{
            console.log(response);
            //let text = Buffer.from(result).toString('utf8');
            
        })
        .then(response=>{
            return JSON.parse(response)
        })
        .then((obj) =>{
            let designArea = document.getElementById('user-designs');
            let desLength = obj.designs.length;
            if(obj.validated == false){
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
                        newDesign.appendChild(userTB);
                        newDesign.appendChild(designFront);
                        newDesign.appendChild(designBack);


                        // LOAD FRONT VIEW JSON INTO CANVAS
                        let designF = JSON.parse(design.front);
                        let front = new fabric.Canvas(design['_id']+ '-front');
                        console.log(designF);
                        front.loadFromJSON(JSON.stringify(designF), ()=>{
                            let scale = 300 / 800;
                            front.setHeight(300);
                            front.setWidth(300);
                            front.backgroundImage.scaleX *= scale;
                            front.backgroundImage.scaleY *= scale;
                            front.getObjects().forEach((o, i)=>{
                                o.scaleX *= scale;
                                o.scaleY *= scale;
                                o.left *= scale;
                                o.top *= scale;
                                front.bringToFront(o);
                                console.log("front object: ", i);
                            })
                            front.requestRenderAll();
                        });

                        // LOAD BACK VIEW JSON INTO CANVAS
                        let designB = JSON.parse(design.back);
                        let back = new fabric.Canvas(design['_id'] + '-back');
                        back.loadFromJSON(designB);
                        /*back.loadFromJSON(designB, ()=>{
                            let scl = 300 / 800;
                            back.setHeight(300);
                            back.setWidth(300);
                            back.backgroundImage.scaleX *= scl;
                            back.backgroundImage.scaleY *= scl;
                            back.getObjects().forEach((o, i)=>{
                                o.scaleX *= scl;
                                o.scaleY *= scl;
                                o.left *= scl;
                                o.top *= scl;
                                o.selectable = false;
                                console.log("back object: ", i);
                            })
                            back.requestRenderAll();
                        });*/
    
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