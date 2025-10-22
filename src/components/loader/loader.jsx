import React from "react";
import './loader.css'
const Loader = ({active, text}) => {
    return (
    <>{ active ? (
      <>
        <div className="loader">
        <div className="box"></div>
        <div className="hill"></div>
      </div>
      <div className="text"> 
        {text}
      </div>
      </>
    ) : (
      <>  
      </>
    )
      }
      </>
    )
}
export default Loader