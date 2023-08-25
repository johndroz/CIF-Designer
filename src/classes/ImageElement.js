
import {fabric} from 'fabric';

class ImageElement {
    constructor(imgSrc, view) {
        this.imgSrc = imgSrc;
        this.view = view;
    }
    id;
    controller = document.createElement('div');
    swatchContainer = document.createElement('div');
    swatch;
    image = new Image();
    img;
    btnDelete = document.createElement('input');
    btnMoveUp = document.createElement('input');
    btnMoveDown = document.createElement('input');
    width = document.createElement('input');
    wLabel = document.createElement('sub');
    height = document.createElement('input');
    hLabel = document.createElement('sub');
    index;

    updateDim(dim, image){
        var loadSize = 200;
        var newSize;
        var currentInput;
        var ratio = image.width / image.height;
        var scale = (this.image.width > this.image.height ? loadSize / this.image.width  : loadSize / this.image.height)

        if(dim == 'w'){
            newSize = Number(this.width.value);
            currentInput = this.width;
        }
        if(dim == 'h'){
            newSize = Number(this.height.value);
            currentInput = this.height;
        }
        if(isNaN(newSize)){
            alert('Please enter in a number.');
            currentInput.value = '';
            currentInput.focus();
            return;
          }
          if(newSize > 99){
            alert('Please enter in a smaller size');
            currentInput.value = '';
            currentInput.focus();
            return;
          }
          if(newSize < 1){
            return;
          }
          if(dim == 'w'){
            image.scaleX = (newSize * scale);
            image.scaleY = (newSize * scale);
            image.setCoords();
            this.view.canvas.requestRenderAll();
            this.width.value = '';
            //widthInput.placeholder = placeholder(dim, image);
            //heightInput.placeholder = placeholder('height', image);
          }
          if(dim == 'h'){
            image.scaleX = (newSize * scale * ratio);
            image.scaleY = (newSize * scale);
            this.view.canvas.setCoords();
            this.view.canvas.requestRenderAll();
            this.height.value = '';
            //heightInput.placeholder = placeholder(dim, image);
            //widthInput.placeholder = placeholder('width', image);
          }

    }
    
    arrangeDesignbar(){
        this.view.canvas.requestRenderAll();
        var length = this.view.designElements.length;
        console.log(length);

            if(length > 0){
                this.view.designElements.forEach((element)=>{
                    console.log('fabric: ' + this.view.canvas.getObjects().indexOf(element.img));
                    console.log('view method: ' + this.view.getIndex(element.img));

                    if(element.index > length){
                        element.img.moveTo(length);
                        element.index = length;
                        element.controller.style.order = length;
                        console.log('last element: ' + this.view.getIndex(element.img));
                    }else{
                        var newIndex = this.view.canvas.getObjects().indexOf(element.img);
                        element.index = newIndex;
                        element.controller.style.order = newIndex;
                        console.log('all elements less than length.');
                    }
                });
            }
            
    }
    configure(){
        // GET DESIGN IDEX FOR ID OF CONTROLLER AND IMAGE ELEMENT
        this.view.designElements.push(this);
        this.id = this.view.designIndex + this.view.viewName;
        console.log("ImageElement: " + this.id);


        // CREATE FABRIC IMAGE
        this.image.src = this.imgSrc;
        var image = this.image;

        // IMAGE LOAD BEGINS
        this.image.onload = ()=>{
            var loadSize = 200;
            var scale = (image.width > image.height ? loadSize / image.width  : loadSize / image.height);
            new fabric.Image.fromURL(this.imgSrc, (img)=>{

                // ASSOCIATE DESIGN ELEMENT WITH FABRIC OBJECT
                this.img = img;

                //SET ELEMENT ID TO CONTROLLER 
                //CREATE DESIGNBAR ELEMENT

                // ADD CONTROLLER DIV TO DESIGNBAR ELEMENT - SET STYLE CLASS
                this.controller.classList.add('designbar-control');
                this.controller.id = this.id + 'controller';
                this.view.designbar.appendChild(this.controller);
                console.log(this.controller.id);

                // ADD SWATCH SECTION TO CONTROLLER
                this.swatchContainer.classList.add('swatchContainer');
                this.controller.appendChild(this.swatchContainer);

                // INSERT THE SWATCH - SIZE DEFINED IN CSS CLASS
                this.swatch = this.image.cloneNode();
                this.swatch.classList.add('swatch');
                this.swatch.onclick = ()=>{
                    this.view.canvas.discardActiveObject();
                    this.view.canvas.setActiveObject(this.img);
                    this.view.canvas.requestRenderAll();
                };
                this.swatchContainer.appendChild(this.swatch);

                // BUTTONS FOR LAYER UP OR LAYER DOWN
                // BUTTON MOVE UP
                this.btnMoveUp.classList.add('designbar-controller-btnLayer');
                this.btnMoveUp.type = 'image';
                this.btnMoveUp.src = 'layer-up.png';
                this.btnMoveUp.onclick = ()=>{
                    var len = this.view.designElements.length;
                    console.log('old index position: ' + this.index);
                    if(len > 1 && this.index < len) {
                        img.moveTo(this.index + 1);
                        console.log('new index position: ' + this.index);   
                    }
                    this.arrangeDesignbar();
                }
                this.swatchContainer.appendChild(this.btnMoveUp);

                // BUTTON MOVE DOWN
                this.btnMoveDown.classList.add('designbar-controller-btnLayer');
                this.btnMoveDown.type = 'image';
                this.btnMoveDown.src = 'layer-down.png';
                this.btnMoveDown.onclick = ()=>{
                    var len = this.view.designElements.length;

                    console.log('old index position: ' + this.index);
                    if(len > 1 && this.index > 1) {
                        img.moveTo(this.index - 1);
                        console.log('new index position: ' + this.index);   
                    }
                    this.arrangeDesignbar();
                }
                this.swatchContainer.appendChild(this.btnMoveDown);

                // WIDTH & HEIGHT WRAPPERS
                var wWrap = document.createElement('div');
                wWrap.classList.add('dim-wrap');
                this.swatchContainer.appendChild(wWrap);

                var hWrap = document.createElement('div');
                hWrap.classList.add('dim-wrap');
                this.swatchContainer.appendChild(hWrap);


                // WIDTH FIELD - CANVAS OBJECT DIMENSION
                this.wLabel.innerHTML = 'Width: ';
                this.width.type = 'text';
                this.width.classList.add('element-dim');

                this.hLabel.innerHTML = 'Height: ';
                this.height.type = 'text';
                this.height.classList.add('element-dim');

                this.width.onblur = ()=>{
                    this.updateDim('w', img);
                }
                this.width.onkeyup = (e)=>{
                    if(e.key === 'Enter'){
                        this.updateDim('w', img);
                    }
                }
                this.height.onblur = ()=>{
                    this.updateDim('h', img);
                }
                this.height.onkeyup = (e)=>{
                    if(e.key === 'Enter'){
                        this.updateDim('h', img);
                    }
                }

                wWrap.append(this.wLabel, this.width);
                hWrap.append(this.hLabel, this.height);


                // BUTTON DELETE
                this.btnDelete.classList.add('designbar-controller-delete');
                this.btnDelete.type = 'image';
                this.btnDelete.src = 'dustbin.png';
                this.controller.appendChild(this.btnDelete);
                this.btnDelete.onclick = ()=>{
                    this.controller.remove();
                    this.image.remove();
                    this.view.designElements.splice(this.view.designElements.indexOf(this), 1);
                    this.view.canvas.remove(img);
                    this.view.canvas.requestRenderAll();
                    this.arrangeDesignbar();
                };

                // PROPERTIES OF THE CANVAS IMAGE OBJECT
                img.left = this.view.boundary.left;
                img.top = this.view.boundary.top;
                img.scaleX = scale;
                img.scaleY = scale;
                this.view.canvas.add(img);

                // ARRANGE THE SIDEBAR ELEMENTS - SET INDEX USING LAYER POSITION 
                this.arrangeDesignbar();

                // SET DRAG LIMIT FOR IMAGE
                const boundingBox = this.view.boundary;
                const movingBox = img;
                const canvas = this.view.canvas;
                var inbounds;
                var location;

                canvas.on("object:moving", function(e) {
                    if(movingBox.intersectsWithObject(boundingBox)){
                        inbounds = true;
                        location = movingBox._getCoords();
                    } else {
                        inbounds = false;
                        canvas.on("mouse:up", function(e){  
                            movingBox.left = location.tl.x;
                            movingBox.top = location.tl.y;
                            movingBox.setCoords();
                        });                     
                    }
                    console.log("inbounds: " + inbounds);
                });
                
                // INCREMENT DESIGN INDEX WHEN EVERYTHING HAS RENDERED ANYTIME ELEMENT ADDED TO THE CANVAS.
                this.view.designIndex++; 
             });
             // IMAGE LOAD ENDS

             


        }
    }


}

export default ImageElement;