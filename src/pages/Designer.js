import React from 'react';
import ViewEditor from '../classes/ViewEditor';

/*
  - TOOL BAR (Placement Buttons, buttons-Add elements, button-Preview)
  - DESIGN ELEMENTS (sidebar)
  - DESIGN AREA (Global Editor)
    PROPS:
        viewName
        canvas
        bgImg
        prevCanvas
        prevImg
        boundaryX
        boundaryY
        boundaryW
        boundaryH
*/


function Toolbar(){
    return (
      <>
        <div className="toolbar">
            <div className="placement-choices">
              <button id="placement-front" className="placement-choice">Front</button>
              <button id="placement-back" className="placement-choice">Back</button>
            </div>
            <div className="toolbar-icons">
                <span id="toolbar-add-img">Add Image</span>
                <span id="toolbar-add-txt">Add Text</span>
            </div>
            <div className="toolbar-finish">
              <button id="toolbar-preview" className="toolbar-btn">Preview</button>
            </div>
          </div>
      </>
    )
  }
  
  /*
   * The window will be hidden by default, and display when the user selects preview
   */
  function Previews(){
    return (
      <div id="previews">
        <div className="preview-placement-choices">
          <button id="preview-placement-front" className="preview-placement-choice">Front</button>
          <button id="preview-placement-back" className="preview-placement-choice">Back</button>
        </div>
        <canvas id="preview-front"></canvas>
        <canvas id="preview-back"></canvas>
  
        <div className="prev-buttons">
          <button id="preview-close" className="preview-pane-btn">Close</button>
          <button id="preview-save" className="preview-pane-btn">Save</button>
        </div>
  
      </div>
        
      
    )
  }

  function DesignArea(){
    return (
      <div id="designs">
        <canvas id="design-front"></canvas>
        <canvas id="design-back"></canvas>
  
      </div>
        
      
    )
  }


  class Editor extends React.Component{  
    constructor(props){
      super(props);
    }

    componentDidMount(){
      // BOUNDARY PROPERTIES
    let ppi = 21;
    let boundarySizeW = 11;
    let boundarySizeH = 8.25;
    let boundaryW = ppi * boundarySizeW;
    let boundaryH = ppi * boundarySizeH;
    let boundaryX = (800 / 2) - (boundaryW / 2);
    let boundaryY = (800 / 2) - (boundaryH / 2);

    // EDITOR PROPERTIES
    let img = 'shirt-template-front.jpg';
    let  previmg = 'mock-up-front-copy.png';
    const propsF = {
      viewName: 'front',
      canvas: document.getElementById('design-front'),
      bgImg: img,
      prevCanvas: document.getElementById('preview-front'),
      prevImg: previmg,
      boundaryX: boundaryX,
      boundaryY: boundaryY,
      boundaryW: boundaryW,
      boundaryH: boundaryH,
    };
    const editorF = new ViewEditor(propsF);
    editorF.configure();
    console.log(propsF);
    }
    
    render(){

      return(
        <>
          <Toolbar/>
          <DesignArea/>
          <Previews/>
        </>
        
      );

    }
    


}

export default Editor;