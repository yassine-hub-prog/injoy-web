import React, { useState } from 'react';
import './modal.css';

function Modal({ onClose, friends }) {
    const [selectedFriends, setSelectedFriends] = useState([]);

    const handleCheckboxChange = (friendId) => {
        setSelectedFriends((prevSelected) =>
            prevSelected.includes(friendId)
                ? prevSelected.filter((id) => id !== friendId)
                : [...prevSelected, friendId]
        );
    };

    const handleSend = () => {
        selectedFriends.forEach((friendId, index) => {
            console.log(`Envoi du post au ${index + 1}e ami, ID: ${friendId}`);
        });
        onClose();
    };

    return (
        <div className="modal-overlay2" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}  // Empêche la propagation du clic
            >
                <h2>Select Friends</h2>
                <br />
                <div className="friend-list">
                    {friends.map((friend) => (
                        <div key={friend.uuid} className="friend-item">
                            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                            <span className="friend-name">{friend.username}</span>
                            <input 
                                type="checkbox"
                                checked={selectedFriends.includes(friend.uuid)}
                                onChange={() => handleCheckboxChange(friend.uuid)}
                            />
                        </div>
                    ))}
                </div>
                
                {selectedFriends.length > 0 &&   
                    <button onClick={handleSend} className="send-button active">
                        Send
                    </button>
                }
                {selectedFriends.length === 0 &&   
                    <button onClick={handleSend} disabled className="send-button">
                        Send
                    </button>
                }
            </div>
        </div>
    );
}

export default Modal;