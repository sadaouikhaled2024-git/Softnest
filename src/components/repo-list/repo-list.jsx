import { useEffect, useState } from "react";
import "./repo-list.css";
import RepositoryItem from "../repo-list-item/repoItem";
import { useApiRequest } from "../../hooks/useApiRequest";

const RepoList = () => {
  const { data, error, loading, request } = useApiRequest('http://localhost:3002');

  // Lors du chargement initial, on récupère les repositories
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        await request('/api/users/repositories');
      } catch (err) {
        console.error('Erreur lors de la récupération des repositories:', err);
      }
    };

    fetchRepositories();
  }, [request]);

  const [repositories, setRepositories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newRepo, setNewRepo] = useState({
    name: "",
    description: "",
    language: "",
    files: [],
    rating: 'Not rated yet',
  });

  // Mettre à jour les repositories après que la réponse de l'API ait été reçue
  useEffect(() => {
    if (!loading && data) {
      setRepositories(data);
    }
  }, [loading, data]);

  const handleAddRepository = async () => {
    if (
      !newRepo.name.trim() ||
      !newRepo.description.trim() ||
      !newRepo.language.trim() ||
      !newRepo.files || newRepo.files.length === 0
    ) {
      alert("Merci de remplir tous les champs et de sélectionner un dossier 📁");
      return;
    }

    const repoToAdd = {
      name: newRepo.name,
      description: newRepo.description,
      language: newRepo.language,
      rating: newRepo.rating,
    };

    try {
      const addedRepo = await request("/api/repositories", "POST", repoToAdd);
      setRepositories((prevRepos) => [...prevRepos, addedRepo]);
      setShowPopup(false);
      setNewRepo({ name: "", description: "", language: "", files: [] });
      console.log('added a repo')
      // Après l'ajout du dépôt, permettre l'ajout de fichiers
      if (addedRepo.id) {
        // Ensure the repository ID is available
        await handleFileUpload(addedRepo.id); // Pass files explicitly
        console.log('added files', addedRepo.id)
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du repository:", error);
    }
  };

  // Fonction pour gérer les fichiers sélectionnés
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileReadPromises = selectedFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            name: file.webkitRelativePath || file.name,
            content: event.target.result,
          });
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
      });
    });

    Promise.all(fileReadPromises)
      .then(filesWithContent => {
        setNewRepo({ ...newRepo, files: filesWithContent });
      })
      .catch(error => {
        console.error("Erreur de lecture fichier :", error);
      });
  };

  // Fonction pour ajouter les fichiers au dépôt
  const handleFileUpload = async (repoId) => {
    const files = newRepo.files.map((file) => ({
      name: file.name,
      content: file.content,
    }));
  console.log(files[0].content )
    try {
      const response = await request(`/api/repositories/${repoId}/files`, "POST",  {files} );
      console.log("Fichiers ajoutés avec succès:", response);
    } catch (error) {
      console.error("Erreur lors de l'ajout des fichiers:", error);
    }
  };
  return (
    <div className="repo-list">
      {loading && (
        <div className="loading-indicator">
          Chargement des dépôts... <span className="spinner">🌀</span>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2 className="popup-header">Créer un nouveau dépôt</h2>
            <input
              required
              type="text"
              placeholder="Nom du dépôt"
              value={newRepo.name}
              onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
            />
            <input
              required
              type="text"
              placeholder="Description"
              value={newRepo.description}
              onChange={(e) => setNewRepo({ ...newRepo, description: e.target.value })}
            />
            <input
              required
              type="text"
              placeholder="Langage"
              value={newRepo.language}
              onChange={(e) => setNewRepo({ ...newRepo, language: e.target.value })}
            />
            <div className="custom-upload">
              <label htmlFor="fileInput" className="custom-button">
                📁 Choisir un dépôt
              </label>
              <input
                required
                id="fileInput"
                type="file"
                className="hidden-input"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFileChange}
              />
            </div>

            <div className="popup-actions">
              <button className="popup-button" onClick={handleAddRepository}>Ajouter</button>
              <button className="popup-button red" onClick={() => setShowPopup(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {repositories?.length === 0 && !loading && (
        <div className="no-repositories">Ajoutez un dépôt maintenant !</div>
      )}

      {Array.isArray(repositories) && repositories.length > 0 && !loading ? (
        repositories.map((repo) => (
          <RepositoryItem repository={repo} key={repo.id} />
        ))
      ) : (
        !loading && <div>Aucun dépôt à afficher pour le moment.</div>
      )}

      <button onClick={() => setShowPopup(true)} className="add-repo-btn">
        Ajouter un dépôt
      </button>
    </div>
  );
};

export default RepoList;
