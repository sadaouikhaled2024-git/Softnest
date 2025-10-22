
import ProfileSettings from "./ProfileSettings"
import "./SettingsContent.css"
import { useNavigate } from "react-router-dom";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useEffect } from "react";
import PageLoader from "../loader/pageloader";
export default function SettingsContent() {
  const { data : userData, error, loading, request } = useApiRequest('http://localhost:3002');
  const navigate = useNavigate(); 

  const HandleLogOut = async () => {
    
    try {
      await request('/auth/logout', 'GET'); 
      navigate('/login')
    } catch (err) {
      console.error('Logout failed', err);
    }
  };
  useEffect(()=>{
    request('/api/users/profile','GET')
  },[request])
  const user = userData
  return (
    <div className="settings-content">
      {loading && <PageLoader casting={true} text={true}/>}
      {!loading && user && <ProfileSettings HandleLogOut={HandleLogOut} user={user} /> }
    </div>
  )
}
