/* 
  - PLACEMENTS
  - TOOL BAR
  - DESIGN ELEMENTS (sidebar)
  - DESIGN AREA
*/

/*
  - BUTTON FOR PREVIEW PANE
  <button id="toolbar-save" className="toolbar-btn">Save</button>
*/

const Toolbar = () => {
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


const Home = () => {
    return(
      <>
        <Toolbar />
      </>
    )
  };
  
  export default Home;