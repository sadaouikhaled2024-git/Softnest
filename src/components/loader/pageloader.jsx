import React from "react";
import './pageloader.css'
const PageLoader = ({casting , black, text}) =>{
    return (
        <>
            <div className={casting ? "" : "loading-overlay"}>
                <div className={casting ? "casted" : "pageloader"}>
                    <div className={black ? 'page-box-black' : "page-box"}></div>
                    <div className={black ? 'page-hill-black' : "page-hill"}></div>
                    {text && <div className="loader-text" style={{color: black}} >Loading...</div>}
                </div>
            </div>
            
        </>
    )
}

export default PageLoader