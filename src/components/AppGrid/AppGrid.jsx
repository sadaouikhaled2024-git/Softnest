import AppCard from "../AppCard/AppCard"
import PageLoader from "../loader/pageloader"
import "./AppGrid.css"

function AppGrid({loading , apps}) {
  return (
    <>
    {loading ? (<PageLoader black={true} text={true} casting={true}/>) : (
    <div className="app-grid">
      {apps.length > 0 ? (
        apps.map((app) => (
          <AppCard
            key={app.id}
            id= {app.id}
            name={app.name}
            author={app.developer}
            description={app.description}
            recommended={app.ownerName}
            rating={app.averageRating}
            iconUrl={app.photoUrl}
          />
        ))
      ) : (
        <div className="no-results">No apps found matching your criteria</div>
      )}
    </div>)}
    </>
    
  )
}

export default AppGrid

