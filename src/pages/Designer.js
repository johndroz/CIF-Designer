import React from 'react';
import ViewEditor from '../classes/ViewEditor';
import GlobalEditor from '../classes/GlobalEditor';

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
                <input type="image" src="image-icon.png" id="toolbar-add-img"></input>
                <input id="add-img" type='file'></input>
                <input type="image" src="add-Text.png" id="toolbar-add-txt"></input>
            </div>
            <div className="toolbar-finish">
              <button id="toolbar-preview" className="toolbar-btn">Preview</button>
            </div>
            <div className="prev-buttons">
            <button id="preview-close" className="toolbar-btn">Close</button>
            <button id="preview-save" className="toolbar-btn">Save</button>
          </div>
          </div>
      </>
    )
  }

  function Designbar(){
    return (
      <div id="designbar">
        <div id="elements-front"></div>
        <div id="elements-back"></div>
      </div>
    )
      
  }

  function DesignArea(){
    return (
      <div id="design-area">
        <Designbar/>
        <div id="designs">
          <canvas id="design-front"></canvas>
          <canvas id="design-back"></canvas>
        </div>
        <Previews/>
      </div>
      
        
      
    )
  }

    /*
   * The window will be hidden by default, and display when the user selects preview
   */
    function Previews(){
      return (
        <div id="previews">
          <canvas id="preview-front"></canvas>
          <canvas id="preview-back"></canvas>
        </div> 
      )
    }


    // The "Editor" comnines all of the editor components for the UI
  class Editor extends React.Component{  
    constructor(props){
      super(props);
    }

    componentDidMount(){
      // BOUNDARY PROPERTIES
    let designerWidth = 800;
    let designerHeight = 800;
    let boundaryW = designerWidth * 0.9;
    let boundaryH = designerHeight * 0.9;
    let boundaryX = (designerWidth * 0.05);
    let boundaryY = (designerHeight * 0.05);

    // EDITOR PROPERTIES FRONT
    let img = 'shirt-template-front.jpg';
    let  previmg = 'mock-up-front-copy.png';
    const propsF = {
      viewName: 'front',
      canvas: document.getElementById('design-front'),
      container: 'design-front-container',
      bgImg: img,
      prevCanvas: document.getElementById('preview-front'),
      prevContainer: 'preview-front-container',
      prevImg: previmg,
      designbar: document.getElementById('elements-front'),
      boundaryX: boundaryX,
      boundaryY: boundaryY,
      boundaryW: boundaryW,
      boundaryH: boundaryH,
      setView: document.getElementById('placement-front'),
      designElements: [],
      designIndex: 0
    }

    // EDITOR PROPERTIES BACK
    let imgB = 'shirt-template-back.jpg';
    let previmgB = 'mock-up-back-copy.png';
    const propsB = {
      viewName: 'back',
      canvas: document.getElementById('design-back'),
      container: 'design-back-container',
      bgImg: imgB,
      prevCanvas: document.getElementById('preview-back'),
      prevContainer: 'preview-back-container',
      prevImg: previmgB,
      designbar: document.getElementById('elements-back'),
      boundaryX: boundaryX,
      boundaryY: boundaryY,
      boundaryW: boundaryW,
      boundaryH: boundaryH,
      setView: document.getElementById('placement-back'),
      designElements: [],
      designIndex: 0
    }

    const editorF = new ViewEditor(propsF);
    editorF.configure();

    const editorB = new ViewEditor(propsB);
    editorB.configure();
    

    //CREATE GLOBAL EDITORS - DEFINE VIEWS & UI BUTTONS
    let views = [editorF, editorB];

    const globalEditor = new GlobalEditor(views);
    globalEditor.configure();
    }
    
    render(){

      return(
        <>
          <Toolbar/>
          <DesignArea/>
        </>
        
      );

    }
    


}

export default Editor;