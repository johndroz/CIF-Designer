/*
    - ViewEditor:
        - Background image for design
        - Mock image for design
        - boundary X, Y, width, and height

        PROPS:
            viewName
            canvas
            bgImg
            prevCanvas
            prevImg
            designbar
            boundaryX
            boundaryY
            boundaryW
            boundaryH


*/

import {fabric} from 'fabric';

class ViewEditor{
    constructor(props){
        this.viewName = props.viewName;
        this.canvas = new fabric.Canvas(props.canvas, {
            width: 800,
            height: 800,
            selection: false,
            containerClass: props.container,
            preserveObjectStacking: true
        });
        this.bgImg = props.bgImg;
        this.prevCanvas = new fabric.Canvas(props.prevCanvas, {
            width: 800,
            height: 800,
            selection: false,
            containerClass: props.prevContainer,
            preserveObjectStacking: true
        });
        this.prevImg = props.prevImg;
        this.designbar = props.designbar;
        this.boundaryX = props.boundaryX;
        this.boundaryY = props.boundaryY;
        this.boundaryW = props.boundaryW;
        this.boundaryH = props.boundaryH;

        this.boundary = new fabric.Rect({
            left: this.boundaryX,
            top: this.boundaryY,
            width: this.boundaryW,
            height: this.boundaryH,
            fill: 'rgba(0,0,0,0)',
            selectable: false
        });
        this.setView = props.setView;
        this.designElements = props.designElements;
    }

    configure(){
        //PREVIEW DESIGN BACKGROUND AND PREVIEW BACKGROUND
        new fabric.Image.fromURL(this.bgImg, (img)=>{
            this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
            originX: 0,
            originY: 0,
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height
            });
            console.log("bgImg: loaded");
        });

        new fabric.Image.fromURL(this.prevImg, (img)=>{
            this.prevCanvas.setBackgroundImage(img, this.prevCanvas.renderAll.bind(this.prevCanvas), {
            originX: 0,
            originY: 0,
            scaleX: this.prevCanvas.width / img.width,
            scaleY: this.prevCanvas.height / img.height
            });
            console.log("prevImg: loaded");
        });

        this.canvas.add(this.boundary);
        
    }

}

export default ViewEditor;