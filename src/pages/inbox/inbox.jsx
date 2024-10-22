import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../component/modal/modal'; 
import { supabase } from '../../supabase';

function Inbox({ inbox_data }) {
    const navigate = useNavigate();
    const inbox = inbox_data?.contacts || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [privateKey] = useState('123456789abcdef123456789abcdef123456789abcdef'); // Simule une clé privée

    useEffect(() => {
        // Toute logique d'effet ici
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true); // Ouvrir le modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Fermer le modal
    };

    const Logout = async () => {
        supabase.auth.signOut()
    }

    return (
        <div className='container'>
            <div className='nav-bar'>
                <h2>INJOY</h2>
                
            </div>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src="/icons/back.svg" alt="" onClick={() => navigate(-1)} />
                    <h1>INJOY</h1>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {inbox_data && inbox.length > 0 ? (
                            inbox.map((contact, index) => (
                                <li key={index} className="contact-item">
                                    <img src={contact?.userInfo?.avatar} alt="Avatar" className="avatar" />
                                    <div className="contact-info">
                                        <span className="username">{contact?.userInfo?.username}</span>
                                        <span className="last-message">
                                            {contact?.messageCount > 0
                                                ? (contact?.lastMessage?.[0]?.message
                                                    ? `${contact.messageCount}+ new messages`
                                                    : `${contact.messageCount}+ new messages`)
                                                : (contact?.lastMessage?.[0]?.message
                                                    ? contact.lastMessage[0].message
                                                    : 'No message yet')
                                            }
                                        </span>
                                    </div>
                                    <span className="message-count"></span>
                                </li>
                            ))
                        ) : (
                            <p>No contacts available.🎉</p>
                        )}
                    </ul>
                </nav>
            </div>
            <div className='contact-content'>
                <ul>
                    {inbox_data && inbox.length > 0 ? (
                        inbox.map((contact, index) => (
                            <li key={index} className="contact-item">
                                <img src={contact?.userInfo?.avatar} alt="Avatar" className="avatar" />
                                <div className="contact-info">
                                    <span className="username">{contact?.userInfo?.username}</span>
                                    <span className="last-message">
                                        {contact?.messageCount > 0
                                            ? (contact?.lastMessage?.[0]?.message
                                                ? `${contact.messageCount}+ new messages`
                                                : `${contact.messageCount}+ new messages`)
                                            : (contact?.lastMessage?.[0]?.message
                                                ? contact.lastMessage[0].message
                                                : 'No message yet')
                                        }
                                    </span>
                                </div>
                                <span className="message-count"></span>
                            </li>
                        ))
                    ) : (
                        <p>No contacts available.🎉</p>
                    )}
                </ul>
            </div>
            <div className='message-content'>
                <button onClick={handleOpenModal}>Active Chat 🎉</button>
            </div>
            {isModalOpen && <Modal onClose={handleCloseModal} privateKey={privateKey} />}
        </div>
    );
}

export default Inbox;
