import { useState, useEffect } from "react";
import "./ProfileForm.css";
import { useApiRequest } from "../../hooks/useApiRequest";

export default function ProfileForm({ userInfo, HandleLogOut }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const {data , error , loading, request} = useApiRequest(); 

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setBio(userInfo.bio || "");
      setGithubLink(userInfo.githubLink || "");
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      bio,
      github_link: githubLink,
    };
    console.log(firstName + lastName + bio + githubLink)
    try {
      await request("/api/users/profile", 'PUT', updatedData);
      alert("Profile updated 🫡");
    } catch (err) {
      console.error("Update failed", err);
      alert("Error updating profile 😵");
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" id="name" className="form-input" placeholder="Your name"
          value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" id="username" className="form-input" placeholder="Your username"
          value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input disabled type="email" id="email" className="form-input" placeholder="Your email"
          value={userInfo?.email || ""} />
        <p className="form-help">Your email is used for notifications and can be viewed by others. (fonctionality disabled for now)</p>
      </div>

      <div className="form-group">
        <label htmlFor="bio" className="form-label">Bio</label>
        <textarea id="bio" className="form-textarea" placeholder="Tell us about yourself"
          value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
        <p className="form-help">Brief description about yourself that will be displayed on your profile.</p>
      </div>

      <div className="form-group">
        <label htmlFor="website" className="form-label">Website</label>
        <input type="url" id="website" className="form-input" placeholder="https://example.com"
          value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
      </div>

      <div className="form-actions">
        <button type="submit" className="save-button">{loading ? "Saving..." : "Save changes"}</button>
        <button type="button" className="cancel-button">Cancel</button>
        <button type="button" onClick={HandleLogOut} className="remove-button">Log out</button>
      </div>
    </form>
  );
}
