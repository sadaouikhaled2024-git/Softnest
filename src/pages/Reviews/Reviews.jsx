import React from "react";
import AllReviews from "../../components/allReviews/allReviews";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const ReviewPage = ()=>{
    return(
        <div className="main-content">
            <Navbar/>
            <AllReviews/>
            <Footer/>
        </div >
    )
}
export default ReviewPage