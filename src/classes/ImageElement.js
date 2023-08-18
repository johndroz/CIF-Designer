import {fabric} from 'fabric';

class ImageElement {
    constructor(imgSrc, view) {
        this.imgSrc = imgSrc;
        this.view = view;
    }

    controller = document.createElement('div');
    image = new Image();
    img;
    wInput = document.createElement('input');
    hInput = document.createElement('input');
    

    configure(){
        // CREATE FABRIC IMAGE
        this.image.src = this.imgSrc;
        var image = this.image;
        this.image.onload = ()=>{
            var scale = (image.width > image.height ? (200) / image.width  : (200) / image.height);
            this.img = new fabric.Image.fromURL(this.imgSrc, (img)=>{
                img.left = this.view.boundary.left;
                img.top = this.view.boundary.top;
                img.scaleX = scale;
                img.scaleY = scale;
                this.view.canvas.add(img);

                // SET DRAG LIMIT FOR IMAGE
                const boundingBox = this.view.boundary;
                const movingBox = img;
                const canvas = this.view.canvas;
                var inbounds;
                var location;

                canvas.on("object:moving", function(e) {
                    var top = movingBox.top;
                    var bottom = top + movingBox.height;
                    var left = movingBox.left;
                    var right = left + movingBox.width;
                    var topBound = boundingBox.top;
                    var bottomBound = topBound + boundingBox.height;
                    var leftBound = boundingBox.left;
                    var rightBound = leftBound + boundingBox.width;
                    

                    if(movingBox.intersectsWithObject(boundingBox)){
                        inbounds = true;
                        location = movingBox._getCoords();
                    } else {
                        /*setTimeout(()=>{
                            inbounds = false;
                            movingBox.left = location.tl.x;
                            movingBox.top = location.tl.y;
                        }, 500);*/
                
                        canvas.on("mouse:up", function(e){  
                            inbounds = false;
                            movingBox.left = location.tl.x;
                            movingBox.top = location.tl.y;
                            movingBox.setCoords();

                        });
                        
                    }

                    console.log(location);
                    console.log("inbounds: " + inbounds);
            });
                
             });


        }
    }


}

export default ImageElement;