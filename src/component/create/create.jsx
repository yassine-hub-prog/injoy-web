import React, { useState, useRef } from 'react';
import './create.css';

const CreatePost = ({uuid}) => {
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const textAreaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = 'auto'; // Réinitialise la hauteur pour recalculer
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Ajuste jusqu'à un maximum de 150px
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Simule un clic sur l'input file
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crée une URL temporaire pour l'image
      setSelectedImage(imageUrl); // Stocke l'image sélectionnée
    }
  };

  return (
    <div className="create-post">
      <div className="post-header">
        <img src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/"+ uuid +".png"} alt="avatar" className="avatar" />
        <textarea
          className="post-input"
          placeholder="Quoi de neuf ?!"
          value={postText}
          onChange={handlePostTextChange}
          ref={textAreaRef}
          rows="1"
        />
      </div>
      {selectedImage && (
        <div className="image-preview">
          <img src={selectedImage} alt="Preview" className="selected-image" />
        </div>
      )}
      <div className="post-options">
        <div className="post-actions">
          <i className='icon bx bx-image-add' onClick={handleImageClick}></i>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }} // Cache l'input
          />
          <i className='icon bx bx-list-ol'></i>
          <i className='icon bx bx-smile'></i>
          <i className='icon bx bx-calendar-event'></i>
          <i className='icon bx bx-code-alt'></i>
        </div>
        <button className="post-button">
          Poster
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
