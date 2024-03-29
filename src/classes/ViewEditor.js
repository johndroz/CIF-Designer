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
            selection: true,
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
            selectable: false,
            excludeFromExport: true
        });
        this.setView = props.setView;
        this.designElements = props.designElements;
        this.designIndex = props.designIndex;
    }

    getIndex(element){
        return this.canvas.getObjects().indexOf(element);
    }

    newPreview(){
        var scale;
        new fabric.Image.fromURL(this.prevImg, (prevImg)=>{
            scale = 800 / prevImg.width;
            this.prevCanvas.setBackgroundImage(prevImg, this.prevCanvas.renderAll.bind(this.prevCanvas), {
            originX: 0,
            originY: 0,
            scaleX: scale,
            scaleY: scale
            });
        });
    }

    resizeCanvas() {
        if(window.location == 'http://localhost:3000/'){
            var outerCanvasContainer = document.getElementById('design-area');
            var ratio = this.canvas.getWidth() / this.canvas.getHeight();
            var containerWidth  = outerCanvasContainer.clientWidth > 800 ? 800 : outerCanvasContainer.clientWidth;
            var scale = containerWidth / this.canvas.getWidth();
            var zoom  = this.canvas.getZoom() * scale;
            
            this.canvas.setDimensions({width: containerWidth, height: containerWidth / ratio});
            this.prevCanvas.setDimensions({width: containerWidth, height: containerWidth / ratio});

            this.canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
            this.prevCanvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
            
        }

        
    }

    componentWillUnmount(){
        window.removeEventListener('resize');
    }

    configure(){

        var desArea = document.querySelector('#design-area');
        window.addEventListener('resize', ()=>{
            if(desArea){
                this.resizeCanvas();
            }           
        });
        
        setTimeout(()=>{
            if(desArea.clientWidth < 1180){
                this.resizeCanvas();
            }
            
        }, 100);


        

        //PREVIEW DESIGN BACKGROUND AND PREVIEW BACKGROUND
        new fabric.Image.fromURL(this.bgImg, (img)=>{
            this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas), {
            originX: 0,
            originY: 0,
            scaleX: this.canvas.width / img.width,
            scaleY: this.canvas.height / img.height,
            excludeFromExport: true
            });
        });

        new fabric.Image.fromURL(this.prevImg, (prevImg)=>{
            this.prevCanvas.setBackgroundImage(prevImg, this.prevCanvas.renderAll.bind(this.prevCanvas), {
            originX: 0,
            originY: 0,
            scaleX: this.prevCanvas.width / prevImg.width,
            scaleY: this.prevCanvas.height / prevImg.height,
            });
        });

        this.canvas.add(this.boundary);
        
        
    }

    

}

export default ViewEditor;