
import {fabric} from 'fabric';

class ImageElement {
    constructor(imgEl, view) {
        this.imgEl = imgEl;
        this.view = view;
    }
    id;
    controller = document.createElement('div');
    swatchContainer = document.createElement('div');
    swatch;
    image = new Image();
    obj;
    btnDelete = document.createElement('input');
    btnMoveUp = document.createElement('input');
    btnMoveDown = document.createElement('input');
    width = document.createElement('input');
    wLabel = document.createElement('sub');
    height = document.createElement('input');
    hLabel = document.createElement('sub');
    index;

    placeholder(image){
        var scaleFactor = (433 / 22);
        var width = (image.width * image.scaleX) / scaleFactor;
        var height = (image.height * image.scaleY) / scaleFactor;

        this.width.value = '';
        this.height.value = '';
        this.width.placeholder = width.toPrecision(4) + ' in.';
        this.height.placeholder = height.toPrecision(4) + ' in.';
    }

    updateDim(dim, image){
        var scaleFactor = (433 / 22);
        var newSize;
        var currentInput;
        var scale;

        if(dim == 'w'){
            newSize = Number(this.width.value) * scaleFactor;
            currentInput = this.width;
        }
        if(dim == 'h'){
            newSize = Number(this.height.value) * scaleFactor;
            currentInput = this.height;
        }
        if(isNaN(newSize)){
            alert('Please enter in a number.');
            currentInput.value = '';
            currentInput.focus();
            return
          }
          if(newSize / scaleFactor > 99){
            alert('Please enter in a smaller size');
            currentInput.value = '';
            currentInput.focus();
            return;
          }
          if(newSize / scaleFactor < 1){
            return
          }
          if(dim == 'w'){
            scale = newSize / this.image.width;
            image.scaleX = scale;
            image.scaleY = scale;
            console.log('width: ' + image.width);
            console.log('height: ' + image.height);
            image.setCoords();
            this.view.canvas.requestRenderAll();
            this.width.value = '';
            this.placeholder(image);
          }
          if(dim == 'h'){
            scale = newSize / this.image.height;
            image.scaleX = scale;
            image.scaleY = scale;
            console.log('width: ' + image.width);
            console.log('height: ' + image.height);
            image.setCoords();
            this.view.canvas.requestRenderAll();
            this.height.value = '';
            this.placeholder(image);
          }

          console.log('new size: ' + newSize);
          console.log('scale: ' + scale + ' scaleFactor: ' + scaleFactor);
          

    }
    
    arrangeDesignbar(){
        this.view.canvas.requestRenderAll();
        var length = this.view.designElements.length;
        console.log(length);

            if(length > 0){
                this.view.designElements.forEach((element)=>{
                    if(element.index > length){
                        element.obj.moveTo(length);
                        element.index = length;
                        element.controller.style.order = length;
                    }else{
                        var newIndex = this.view.canvas.getObjects().indexOf(element.obj);
                        element.index = newIndex;
                        element.controller.style.order = newIndex;
                    }
                });
            }       
    }

    objSelected(){
        let selectedObjects = this.view.canvas.getActiveObjects();
        let designElements = this.view.designElements;

        designElements.forEach((elem)=>{
            if(selectedObjects.includes(elem.obj)){
                elem.controller.classList.add('selected');
            } else {
               elem.controller.classList.remove('selected');
            }
        })
    }
    
    configure(){
        // GET DESIGN IDEX FOR ID OF CONTROLLER AND IMAGE ELEMENT
        this.view.designElements.push(this);
        this.id = this.view.designIndex + this.view.viewName;
        console.log("ImageElement: " + this.id);


        // CREATE FABRIC IMAGE
        this.image = this.imgEl;
        var img = this.image;

        // IMAGE LOAD BEGINS
            var loadSize = 200;
            var scale = (img.width > img.height ? loadSize / img.width  : loadSize / img.height);
            new fabric.Image.fromURL(img.src, (img)=>{

                // ASSOCIATE DESIGN ELEMENT WITH FABRIC OBJECT
                this.obj = img;

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
                    if(!this.obj.intersectsWithObject(this.view.boundary)){
                        this.obj.left = this.view.boundary.left;
                        this.obj.top = this.view.boundary.top;           
                    }
                    this.view.canvas.discardActiveObject();
                    this.view.canvas.setActiveObject(this.obj);
                    this.obj.setCoords();
                    this.view.canvas.renderAll();
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
                this.placeholder(img);

                // ARRANGE THE SIDEBAR ELEMENTS - SET INDEX USING LAYER POSITION 
                this.arrangeDesignbar();

                // SET DRAG LIMIT FOR TEXT
                const boundingBox = this.view.boundary;
                const movingBox = this.obj;
                const canvas = this.view.canvas;
                const element = this;
                var inbounds;
                var location = movingBox.aCoords;
                var selected;
                var selectedItems;

                canvas.on("object:moving", function(e) {
                    selectedItems = canvas.getActiveObjects();
                    selected = selectedItems.length > 1 ? e.target : movingBox;
                    if(selected.intersectsWithObject(boundingBox)){
                        inbounds = true;
                        location = selected.aCoords;
                    } else {
                        inbounds = false;
                        selected.on("mouseup", function(e){  
                            if(!inbounds){
                                selected.left = location.tl.x;
                                selected.top = location.tl.y;
                                selected.setCoords();
                            }
                        });  
                    }
                    
                    selected.on("deselected", function(e){
                        if(!movingBox.intersectsWithObject(boundingBox)){
                            movingBox.left = boundingBox.left
                            movingBox.top = boundingBox.top;
                            movingBox.setCoords();
                        }
                    });
                });

                // STYLE ACTIVE ELEMENT CONTROLLER
                movingBox.on('deselected', function(e){
                    element.objSelected();
                });

                movingBox.on('selected', function(e){
                    element.objSelected();
                });

                canvas.on("object:modified", function(e){
                    element.placeholder(img);
                })
                
                // INCREMENT DESIGN INDEX WHEN EVERYTHING HAS RENDERED ANYTIME ELEMENT ADDED TO THE CANVAS.
                this.view.designIndex++; 


             });// IMAGE LOAD ENDS


        //}
    }


}

export default ImageElement;