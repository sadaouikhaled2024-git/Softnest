import RepositoryContent from "../../components/Repository/RepositoryContent"
import AboutSection from "../../components/RepoSidebar/AboutSection.jsx"
import './RepositoryPage.css'
import Navbar from "../../components/navbar/Navbar.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import { useParams } from "react-router-dom"
import { useApiRequest } from "../../hooks/useApiRequest.js"
import { useEffect } from "react"

export default function RepositoryPage() {
    const {repoid} = useParams()
    const {data :repository, error , loading , request} = useApiRequest("http://localhost:3002")
    useEffect(()=>{
        request(`/api/repositories/${repoid}`,'GET');
    },[request])
  return (
    <>
        <Navbar/>
        <div className="content-wrapper">
            {!loading && <RepositoryContent loading={loading} repository={repository}/>}
          
          {!loading && repository && <AboutSection repositoryInfo={repository}/>}
        </div>
        <Footer/>
    </>
  )
}