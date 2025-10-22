import { useEffect, useState } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import "./RepositoryList.css";
import { useParams } from "react-router-dom";
import PageLoader from "../loader/pageloader";

export default function RepositoryList({ownerId, repoId: propRepoId ,user}) {
  const { repoId: paramRepoId } = useParams();
  const repoId = propRepoId || paramRepoId;

  const { data: files, error, loading, request } = useApiRequest();
  const [repositories, setRepositories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newRepo, setNewRepo] = useState({ files: [] });
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const allowChange = ownerId === user?.id 
  useEffect(() => {
    if (!repoId) return;
    request(`/api/repositories/${repoId}/files`, "GET");
  }, [repoId, request]);

  useEffect(() => {
    if (Array.isArray(files)) {
      setRepositories(files);
    }
  }, [files]);

  const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files);
  const fileReadPromises = selectedFiles.map((file) => {
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
    .then(async (filesWithContent) => {
      setNewRepo({ files: filesWithContent });

      // 🔥 déclenche l'upload ici
      try {
        await request(`/api/repositories/${repoId}/files`, "POST", {
          files: filesWithContent,
        });
        await request(`/api/repositories/${repoId}/files`, "GET"); // refresh
        setNewRepo({ files: [] });
      } catch (error) {
        console.error("Erreur lors de l'ajout des fichiers:", error);
      }
    })
    .catch((error) => {
      console.error("Erreur de lecture fichier :", error);
    });
};

  const handleFileUpload = async () => {
    if (newRepo.files.length === 0) return;
    setShowPopup(false);

    try {
      await request(`/api/repositories/${repoId}/files`, "POST", {
        files: newRepo.files,
      });

      // Re-fetch files to reflect the update
      request(`/api/repositories/${repoId}/files`, "GET");

      // Reset state
      setNewRepo({ files: [] });
    } catch (error) {
      console.error("Erreur lors de l'ajout des fichiers:", error);
    }
  };

  const handleDeleteFile = async () => {
    if (!selectedFileId) return;
    console.log(selectedFileId)
    const fileId = selectedFileId
    try {
      await request(`/api/repositories/${repoId}/files/${fileId}`, "DELETE");
      console.log('its happened, fileid : ' + fileId + 'repoid ' + repoId)
      // Re-fetch files to reflect the deletion
      request(`/api/repositories/${repoId}/files`, "GET");

      // Réinitialiser l'état de fichier sélectionné
      setSelectedFileName(null);
      setSelectedFileContent(null);
      setSelectedFileId(null);
    } catch (error) {
      console.error("Erreur lors de la suppression du fichier :", error);
    }
  };

  const handleViewFile = (file) => {
    setSelectedFileName(file.name);
    setSelectedFileContent(file.content);
    setSelectedFileId(file.id); // Store file ID for deletion
  };

  return (
    <div className="repository-list">
      {loading && <PageLoader casting={true} >Loading files...</PageLoader>}
      {error && <p className="error">Error loading files: {error.message}</p>}

      <div className="repo-files-container">
        <div className="file-list">
          {repositories.length === 0 ? (
            <p>No files available in this repository.</p>
          ) : (
            repositories.map((file) => (
              <div
                key={file.id}
                className="file-item"
                onClick={() => handleViewFile(file)}
              >
                📄 {file.name}
              </div>
            ))
          )}
        </div>

        {(
          <div className="file-viewer">
            <h3 style={{color:'white'}}>- {selectedFileName || 'No file selected'}</h3>
            <pre className="file-content">{selectedFileContent}</pre>
            {selectedFileName && allowChange && <button className="delete-file" onClick={handleDeleteFile}>
               Delete File
            </button>}
          </div>
        )}
      </div>

      {allowChange && <><label htmlFor="fileInput" className="repo-add-button">
                 Add files
              </label> <input required
                id="fileInput"
                type="file"
                className="hidden-input"
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFileChange}  />
                </>
      }

      {showPopup &&  (
        <div className="repo-popup-backdrop">
          <div className="repo-popup-container">
            <h3>Upload New File</h3>
            <div className="custom-upload">
              <label htmlFor="fileInput" className="custom-button">
                📁 Choisir un fichier
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

            <div className="repo-popup-controls">
              <button className="file-add-button" onClick={handleFileUpload}>
                Add
              </button>
              <button className="file-cancel-button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
