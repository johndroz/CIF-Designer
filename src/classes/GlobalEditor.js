import ImageElement from './ImageElement';

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

    setView(viewName){
        this.views.forEach(view => {

            if(viewName != view.viewName){
                document.querySelector('.' + view.canvas.containerClass).style.display = 'none';
            }

            if(viewName == view.viewName){
                document.querySelector('.' + view.canvas.containerClass).style.display = 'block';
                this.activeView = view;
            }
            
        });
    }

    addImage() {
        this.fileInput.value = '';
        this.fileInput.click();
    }

    configure(){
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

        // TRIGGER THE FILE INPUT TO ADD IMAGES
        this.imgButton.onclick = () => {
            this.addImage();
        }
        // FILE INPUT ADDS IMAGE INTO THE VIEW
        var activeView = this.activeView;
        var designElements = this.activeView.designElements;
        this.fileInput.addEventListener('change', function(e){
            var URL = window.webkitURL || window.URL;
            var url = URL.createObjectURL(e.target.files[0]);
            var img = new Image();
            img.src = url;
            img.onload = function(){

                var newImg = new ImageElement(url, activeView);
                newImg.configure();
                designElements.push(newImg);       
                
            }
        });


        //this.textButton = document.getElementById('toolbar-add-txt');

    }


}

export default GlobalEditor;