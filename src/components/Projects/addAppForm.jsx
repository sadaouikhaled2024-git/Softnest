import React, { useState } from 'react';
import { useApiRequest } from '../../hooks/useApiRequest';
import './addAppForm.css';
import axios from 'axios';

const AddAppForm = () => {
  const [form, setForm] = useState({
    name: '',
    developer: '',
    description: '',
    imageUrl: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { request, loading, error } = useApiRequest();

  // Gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Upload files using axios (adapted to backend requirements)
  const uploadFiles = async (appId, files) => {
    const filesFormData = new FormData();
    files.forEach((file) => {
      filesFormData.append('files', file);
    });
    // The backend expects files as 'files', and appId in the URL
    const response = await axios.post(
      `http://localhost:3002/api/apps/apps/${appId}/files`,
      filesFormData,
    );
    return response.data;
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer l'objet à envoyer (JSON)
    const payload = {
      name: form.name,
      developer: form.developer,
      description: form.description,
      photo_url: form.imageUrl,
    };

    // Envoi de la requête pour créer l'application avec toutes les informations
    const createdApp = await request('/api/apps', 'POST', JSON.stringify(payload), {
      'Content-Type': 'application/json',
    });

    // Vérifier si l'application a été créée avec succès
    if (!createdApp || !createdApp.id) {
      alert("⚠️ Impossible de créer l'application.");
      return;
    }

    // Always try to upload files after app creation
    let fileUploadSuccess = true;
    if (selectedFiles.length > 0) {
      try {
        await uploadFiles(createdApp.id, selectedFiles);
      } catch (err) {
        fileUploadSuccess = false;
      }
    }

    if (fileUploadSuccess) {
      alert('🎉 Application et fichiers envoyés avec succès !');
    } else {
      alert("⚠️ Application créée mais erreur lors de l'envoi des fichiers.");
    }

    // Réinitialiser le formulaire
    setForm({ name: '', developer: '', description: '', imageUrl: '' });
    setSelectedFiles([]);
  };

  return (
    <form onSubmit={handleSubmit} className="add-app-form animated-fadein">
      <h2>📦 Ajouter une nouvelle application</h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nom de l'application"
        required
        className="animated-input"
      />

      <input
        type="text"
        name="developer"
        value={form.developer}
        onChange={handleChange}
        placeholder="Nom du développeur"
        required
        className="animated-input"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="animated-input"
      ></textarea>

      <input
        type="text"
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="URL de l'image (facultatif)"
        className="animated-input"
      />

      {/* File input for uploading files */}
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="animated-input"
        style={{ marginTop: '10px' }}
      />

      {error && <p className="error-text animated-fadein">⚠️ Une erreur est survenue. + {error}</p>}

      <button type="submit" disabled={loading} className="animated-btn">
        {loading ? 'Chargement...' : 'Ajouter l’application'}
      </button>
    </form>
  );
};

export default AddAppForm;
