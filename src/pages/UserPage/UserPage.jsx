import "./UserPage.css"

import UserDetails from "../../components/User/UserDetails"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import { useParams } from "react-router-dom"
function UserProfile() {
    const {userid} = useParams()
    console.log(userid)
  return (<>
    <Navbar/>
        { <UserDetails userId={userid}/>}
    <Footer/>
    </>
  )
}

export default UserProfile
