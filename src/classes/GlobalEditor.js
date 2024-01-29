import ImageElement from './ImageElement';
import TextElement from './TextElement';

// FUCTIONALITIES
/*

    - INSERT IMAGE
    - INSERT TEXT
    - LIMIT DRAGGING AREA
    - CLIP GRAPHIC OUTSIDE DESIGN AREA
    - DESIGNBAR CONTROLS
    - PREVIEW DESIGN
    - DOWNLOAD DESIGN

*/



class GlobalEditor{
    constructor(views){
        this.views = views;
    }

    activeView;
    imgButton;
    fileInput;
    textButton;
    previewButton;
    previewClose;
    previewSave;

    setView(viewName){
        this.views.forEach((view)=> {

            const canvas = document.querySelector('.' + view.canvas.containerClass);
            const previewClass = '.' + view.prevCanvas.containerClass;
            const preview = document.querySelector(previewClass);

            if(viewName !== view.viewName){
                canvas.style.display = 'none';
                preview.style.display = 'none';
                view.designbar.style.display = 'none';
            }

            if(viewName === view.viewName){
                canvas.style.display = 'block';
                preview.style.display = 'block';
                view.designbar.style.display = 'flex';
                this.activeView = view;
            }
            
        });
    }



    showDesign(){
        document.getElementById('previews').style.display = 'none';
        document.getElementById('designs').style.display = 'block';
        document.querySelector('.prev-buttons').style.display = 'none';
        document.querySelector('.toolbar-finish').style.display = 'block';
        document.getElementById('designbar').style.display = 'block';
        document.querySelector('.toolbar-icons').style.display = 'flex';
    }

    preview(){
        // MAKE PREVIEW VISIBLE
        document.getElementById('previews').style.display = 'block';
        document.getElementsByClassName('prev-buttons')[0].style.display = 'block';
        document.getElementById('designs').style.display = 'none';
        document.querySelector('.toolbar-finish').style.display = 'none';
        document.getElementById('designbar').style.display = 'none';
        document.querySelector('.toolbar-icons').style.display = 'none';


        // LOOP THROUGH THE VIEWS
        this.views.forEach((view)=>{
            let preview = view.prevCanvas;
            let canvasGraphics;

            // CLEAR OLD PREVIEWS
            preview.clear();
            view.newPreview();

            // RENDER GRAPHICS INTO PREVIEW
            if(view.designElements.length > 0){
                canvasGraphics = view.canvas.toJSON();
                view.prevCanvas.loadFromJSON(canvasGraphics, ()=>{
                    var objects = view.prevCanvas.getObjects();
                    objects.forEach((obj)=>{
                        obj.set({selectable: false, opacity: 0.83});
                    });
                    view.prevCanvas.renderAll.bind(view.prevCanvas)
                });
                    view.newPreview();
                
            }

        });
    }

    addImage() {
        
        this.fileInput.value = '';
        this.fileInput.click();
    }

    save(){
        let formData = new FormData();
        this.views.forEach((view)=>{
            //let blob = new Blob([JSON.stringify(view.prevCanvas.toJSON(), null, 2)], {type: "application/json"});
            //blob.text().then(text=>console.log(text))

            //formData.append(view.viewName, JSON.stringify(view.prevCanvas))
            formData.append(view.viewName, JSON.stringify(view.prevCanvas.toDataURL({quality: 1.0})));
        });

        fetch('/save', {method: 'POST', cache: "reload", body: new URLSearchParams(formData)})
        .then(res=>{
            return res.json()
        })
        .then(obj=>{
            if(obj.validated){
                alert('Design saved.');
            }
            else{
                alert('Something went wrong. Your design did not save.');
            }
        })
        .catch(err=>{
            console.log(err);
        });
    }

    configure(){
        const editor = this;

        // MAP THE VIEWS WITH THE PLACEMENT BUTTONS
        this.views.forEach(view => {
            view.setView.onclick = () => {
                this.setView(view.viewName);
            }
        });

        // SET DEFAULT VIEW
        this.activeView = this.views[0];
        this.setView(this.activeView.viewName);

        // SET THE GLOBAL BUTTONS
        this.imgButton = document.getElementById('toolbar-add-img');
        this.fileInput = document.getElementById('add-img');
        this.textButton = document.getElementById('toolbar-add-txt');
        this.previewButton = document.getElementById('toolbar-preview');
        this.previewClose = document.getElementById('preview-close');
        this.previewSave = document.getElementById('preview-save');

        // TRIGGER THE FILE INPUT TO ADD IMAGES
        this.imgButton.onclick = () => {
            this.addImage();
        }
        // FILE INPUT ADDS IMAGE INTO THE VIEW
        // TOOLBAR BUTTON - ADD IMG
        this.fileInput.addEventListener('change', function(e){

            //var URL = window.webkitURL || window.URL;
            // = URL.createObjectURL(e.target.files[0]);
            var url;
            const selectedFile = e.target.files[0];
        
            if (selectedFile) {
            const reader = new FileReader();
        
            reader.onload = function(event) {
                // The result property contains the Base64-encoded image data.
                const base64String = event.target.result;
                url = base64String;
                //var img = document.createElement('img');
                var img = new Image();
                img.src = url;
                console.log('Base64 String:', url);
                img.onload = function(){
                    var newImg = new ImageElement(img, editor.activeView);
                    newImg.configure();  
                }
            };
        
            // Read the file as a data URL, which will return a Base64 string.
            //var newImg = new ImageElement(reader.readAsDataURL(selectedFile), editor.activeView);
            reader.readAsDataURL(selectedFile)
            
            
            }



            /*img.onload = function(){
                var newImg = new ImageElement(url, editor.activeView);
                newImg.configure();
                objectUrlToBase64(url)
                .then(base64String => {
                    if (base64String) {
                    console.log('Base64 String:', base64String.toString());
                    } else {
                    console.log('Conversion failed.');
                    }
                });   
            }*/ 

        }); //END OF INPUT ON-CHANGE <---

        // TOOLBAR BUTTON - ADD TEXT
        this.textButton.onclick = ()=>{
            var newTxt = new TextElement(editor.activeView);
            newTxt.configure();
        }

        // TOOLBAR BUTTON - PREVIEW
        this.previewButton.onclick = ()=>{
            this.preview();
        }

        // TOOLBAR BUTTON - PREVIEW CLOSE
        this.previewClose.onclick = ()=>{
            this.showDesign();
            
        }

        // TOOLBAR BUTTON - SAVE PREVIEWS
        this.previewSave.onclick = ()=>{
            this.save();
        }

    }


}

export default GlobalEditor;