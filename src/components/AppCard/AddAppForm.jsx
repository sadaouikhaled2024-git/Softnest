// components/AddAppForm/AddAppForm.jsx
import { useState } from "react";
import "./AddAppForm.css"; // tu peux faire sobre ou funky, à toi de voir

function AddAppForm({ onAppAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    developer: "",
    category: "",
    rating: "",
    reviews: "",
    size: "",
    version: "",
    lastUpdated: "",
    description: "",
    features: "",
    iconUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApp = {
      ...formData,
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      features: formData.features.split(",").map(f => f.trim()),
      userReviews: [],
    };

    const res = await fetch("http://localhost:3001/api/apps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newApp)
    });

    if (res.ok) {
      const addedApp = await res.json();
      onAppAdded(addedApp);
      setFormData({
        name: "", developer: "", category: "", rating: "", reviews: "",
        size: "", version: "", lastUpdated: "", description: "",
        features: "", iconUrl: ""
      });
    } else {
      alert("Oups, y'a eu une galère dans l'ajout 😬");
    }
  };

  return (
    <form className="add-app-form" onSubmit={handleSubmit}>
      <h3>Add a New App</h3>
      <input type="text" name="name" placeholder="App Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="developer" placeholder="Developer" value={formData.developer} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <input type="number" step="0.1" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} />
      <input type="number" name="reviews" placeholder="Number of Reviews" value={formData.reviews} onChange={handleChange} />
      <input type="text" name="size" placeholder="Size" value={formData.size} onChange={handleChange} />
      <input type="text" name="version" placeholder="Version" value={formData.version} onChange={handleChange} />
      <input type="text" name="lastUpdated" placeholder="Last Updated" value={formData.lastUpdated} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
      <input type="text" name="features" placeholder="Features (comma-separated)" value={formData.features} onChange={handleChange} />
      <input type="text" name="iconUrl" placeholder="Icon URL" value={formData.iconUrl} onChange={handleChange} />
      <button type="submit">Add App</button>
    </form>
  );
}

export default AddAppForm;
