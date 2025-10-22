import "./AvatarUpload.css"

export default function AvatarUpload({imgUrl}) {
  
  return (
    <div className="avatar-upload">
      <div className="avatar-preview">
        <img src={imgUrl} alt="Profile" className="avatar-image" />
      </div>
      <div className="avatar-actions">
        <p className="avatar-help">Upload a new avatar. Images should be square and at least 200x200 pixels. (functionality disabled for now)</p>
        <div className="avatar-buttons">
          <button className="upload-button">Upload new picture</button>
          <button className="remove-button">Remove</button>
        </div>
      </div>
    </div>
  )
}
