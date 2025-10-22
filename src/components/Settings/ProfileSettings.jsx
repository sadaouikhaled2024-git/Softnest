import ProfileForm from "./ProfileForm"
import AvatarUpload from "./AvatarUpload"
import "./ProfileSettings.css"

export default function ProfileSettings({user, HandleLogOut}) {
  return (
    <div className="profile-settings">
      <h1 className="settings-title">Profile Settings</h1>
      <p className="settings-description">This information will be displayed publicly so be careful what you share.</p>

      <div className="settings-section">
        <h2 className="section-settings-title">Profile Picture</h2>
        <AvatarUpload   imgUrl={user?.photoUrl} />
      </div>

      <div className="settings-section">
        <h2 className="section-settings-title">Personal Information</h2>
        <ProfileForm HandleLogOut={HandleLogOut} userInfo={user} />
      </div>
    </div>
  )
}
