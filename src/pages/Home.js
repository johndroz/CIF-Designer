/* 
  - PLACEMENTS
  - TOOL BAR
  - DESIGN ELEMENTS (sidebar)
  - DESIGN AREA
*/


const Home = () => {
    return(
      <>
        <div className="placements-choices">
          <button id="placement-front"></button>
          <button id="placement-back"></button>
        </div>
        <div className="toolbar">
          <div className="toolbar-icons">
              <span id="toolbar-add-img"></span>
              <span id="toolbar-add-txt"></span>
          </div>
          <div className="toolbar-fin">
            <button id="toolbar-save"></button>
            <button id="toolbar-prev"></button>
          </div>

        </div>
      </>
    )
  };
  
  export default Home;