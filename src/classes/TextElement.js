import { fabric } from "fabric";

class TextElement {
    constructor(view){
        this.view = view;
    }

    id;
    controller = document.createElement('div');
    swatchContainer = document.createElement('div');
    swatch;
    obj;
    btnContainer = document.createElement('div');
    color = document.createElement('input');
    font = document.createElement('select');
    fonts = [
        'Arial',
        'Verdana',
        'Tahoma',
        'Trebuchet MS',
        'Times New Roman',
        'Georgia',
        'Garamond',
        'Courier New',
        'Brush Script MT'
    ];
    btnDelete = document.createElement('input');
    btnMoveUp = document.createElement('input');
    btnMoveDown = document.createElement('input');
    width = document.createElement('input');
    wLabel = document.createElement('sub');
    height = document.createElement('input');
    hLabel = document.createElement('sub');
    index;

    placeholder(element){
        var scaleFactor = (433 / 22);
        var width = (element.width * element.scaleX) / scaleFactor;
        var height = (element.height * element.scaleY) / scaleFactor;

        this.width.value = '';
        this.height.value = '';
        this.width.placeholder = width.toPrecision(4) + ' in.';
        this.height.placeholder = height.toPrecision(4) + ' in.';
    }

    updateDim(dim, element){
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
            scale = newSize / this.obj.width;
            element.scaleX = scale;
            element.scaleY = scale;
            console.log('width: ' + element.width);
            console.log('height: ' + element.height);
            element.setCoords();
            this.view.canvas.requestRenderAll();
            this.width.value = '';
            this.placeholder(element);
          }
          if(dim == 'h'){
            scale = newSize / this.obj.height;
            element.scaleX = scale;
            element.scaleY = scale;
            console.log('width: ' + element.width);
            console.log('height: ' + element.height);
            element.setCoords();
            this.view.canvas.requestRenderAll();
            this.height.value = '';
            this.placeholder(element);
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

    configure(){
        // GET DESIGN IDEX FOR ID OF CONTROLLER AND TEXT ELEMENT
        this.view.designElements.push(this);
        this.id = this.view.designIndex + this.view.viewName;
        console.log("TextElement: " + this.id);

        // CREATE FABRIC TEXT
        this.obj = new fabric.Textbox('Text', {
            left: this.view.boundary.left,
            top: this.view.boundary.top,
            editable: true
        });

        this.view.canvas.add(this.obj);

        // ADD CONTROLLER DIV TO DESIGNBAR ELEMENT - SET STYLE CLASS
        this.controller.classList.add('designbar-control');
        this.controller.id = this.id + 'controller';
        this.view.designbar.appendChild(this.controller);
        console.log(this.controller.id);

        // ADD TEXT SWATCH SECTION TO CONTROLLER
        this.swatchContainer.classList.add('swatchContainer');
        this.controller.appendChild(this.swatchContainer);

        // INSERT THE SWATCH - SIZE DEFINED IN CSS CLASS
        this.swatch = document.createElement('div');
        this.swatch.innerHTML = 'Aa';
        this.swatch.classList.add('swatch');
        this.swatch.onclick = ()=>{
            this.view.canvas.discardActiveObject();
            this.view.canvas.setActiveObject(this.obj);
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
                        element.obj.moveTo(this.index + 1);
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
                        element.obj.moveTo(this.index - 1);
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
                    this.updateDim('w', this.obj);
                }
                this.width.onkeyup = (e)=>{
                    if(e.key === 'Enter'){
                        this.updateDim('w', this.obj);
                    }
                }
                this.height.onblur = ()=>{
                    this.updateDim('h', this.obj);
                }
                this.height.onkeyup = (e)=>{
                    if(e.key === 'Enter'){
                        this.updateDim('h', this.obj);
                    }
                }

                wWrap.append(this.wLabel, this.width);
                hWrap.append(this.hLabel, this.height);

// ------------------------------
                // CONTAINER FOR COLOR PICKER - FONT DROPDOWN - DELETE BUTTON
                this.btnContainer.classList.add('btnContainer');
                this.controller.appendChild(this.btnContainer);

                // BUTTON DELETE
                this.btnDelete.classList.add('designbar-controller-delete');
                this.btnDelete.type = 'image';
                this.btnDelete.src = 'dustbin.png';
                this.btnContainer.appendChild(this.btnDelete);
                this.btnDelete.onclick = ()=>{
                    this.controller.remove();
                    this.view.designElements.splice(this.view.designElements.indexOf(this), 1);
                    this.view.canvas.remove(this.obj);
                    this.view.canvas.requestRenderAll();
                    this.arrangeDesignbar();
                };

                // COLOR & FONT PICKER
                this.color.type = 'color';
                this.btnContainer.appendChild(this.color);

                this.fonts.forEach((font)=>{
                    this.font.innerHTML += '<option>' + font + '</option>';
                });
                this.btnContainer.appendChild(this.font);
                

                // ARRANGE THE SIDEBAR ELEMENTS - SET INDEX USING LAYER POSITION 
                this.arrangeDesignbar();
                this.placeholder(this.obj);

                // SET DRAG LIMIT FOR TEXT
                const boundingBox = this.view.boundary;
                const movingBox = this.obj;
                const canvas = this.view.canvas;
                const element = this;
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
                });

                canvas.on("object:modified", function(e){
                    element.placeholder(e.target);
                });

                this.obj.onKeyUp = ()=>{
                    var text = this.obj.text;
                    if(text.length > 10){
                        text = text.substring(0, 10);
                    }    
                    this.swatch.innerHTML = text;
                }
                
                // INCREMENT DESIGN INDEX WHEN EVERYTHING HAS RENDERED ANYTIME ELEMENT ADDED TO THE CANVAS.
                this.view.designIndex++;


    }
}

export default TextElement;