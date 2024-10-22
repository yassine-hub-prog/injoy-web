import React, { useState } from 'react';
import './modal.css';

function Modal({ onClose, privateKey }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(privateKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Réinitialiser après 3 secondes
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>End-to-End Encryption</h2>
                <p>
                    Your messages will be encrypted from end to end, which means that no one (not even us) 
                    will be able to access the content of your messages. 
                    The public key used for encryption will be stored in our database, while the private key 
                    used for decryption will only be stored on your device.
                </p>
                <p>
                    Make sure to securely store your private key, as without it you won’t be able to read 
                    your messages on another device. Below is your private key. Please save it in a secure 
                    place (e.g., a file or a note):
                </p>
                
                {/* Clé privée partiellement affichée */}
                <div className="private-key-display">
                    <span>{privateKey.slice(0, 15)}... (hidden)</span> {/* Afficher les 15 premiers caractères, le reste caché */}
                </div>
                
                {/* Bouton pour copier la clé privée */}
                <button onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy Private Key"}
                </button>

                <button className="accept-button" onClick={onClose}>Accept and Continue</button>
            </div>
        </div>
    );
}

export default Modal;
