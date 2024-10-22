import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './profile.css';

function Profile({uuid}) {
    const navigate = useNavigate();
    const id = useParams();
    const [profile, setProfile] = useState();
    const [activeTab, setActiveTab] = useState('posts');
    console.log(id)
    useEffect(() => {
        fetchProfile();
        
    }, []);

    const fetchProfile = () => {
        fetch('https://server-b133.onrender.com/api/profile/'+ id.id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setProfile(data);
                console.log(data)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
      }




    const Open = (page) => {
        navigate(page)
    }


    if(id.id === "undefined"){
        return (
            <div className='container'>
            <div className='nav-bar'>
                <h2>INJOY</h2>
            </div>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <h1>INJOY</h1>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li onClick={() => Open('/home')}><a ><img src="/icons/home.svg"/>Home</a></li>
                        <li onClick={() => Open('/exploare')}><a ><img src="/icons/exploare.svg"/>Explore</a></li>
                        <li onClick={() => Open('/inbox')}><a ><img src="/icons/inbox.svg"/>Inbox</a></li>
                        <li onClick={() => Open('/profile')}><a ><img src="https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/8d25ad2d-33e4-4928-b3b9-387c09833def.png" className='img-profile'/>Profile</a></li>
                    </ul>
                </nav>
            </div>
            <div className='content'>
                
                <b>Error : User not found</b>

                
            </div>
            <div className="hashtags"></div>
            <div className='footer'>
                <button><img src="/icons/home.svg"/></button>
                <button onClick={() => Open('/exploare')}><img src="/icons/exploare.svg"/></button>
                <button onClick={() => Open('/create')}><img src="/icons/create.svg" /></button>
                <button onClick={() => Open('/inbox')}><img src="/icons/inbox.svg"/></button>
                <button onClick={() => Open('/profile')}><img src="https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/8d25ad2d-33e4-4928-b3b9-387c09833def.png" className='img-profile'/></button>
            </div>
        </div>
        )
    }

    

    return (
        <div className='container'>
            <div className='nav-bar'>
                <h2>INJOY</h2>
            </div>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <h1>INJOY</h1>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li onClick={() => Open('/home')}><a ><img src="/icons/home.svg"/>Home</a></li>
                        <li onClick={() => Open('/exploare')}><a ><img src="/icons/exploare.svg"/>Explore</a></li>
                        <li onClick={() => Open('/inbox')}><a ><img src="/icons/inbox.svg"/>Inbox</a></li>
                        <li onClick={() => Open('/profile')}><a ><img src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/"+ uuid +".png"} className='img-profile'/>Profile</a></li>
                    </ul>
                </nav>
            </div>
            <div className='content'>
                
                <div className="profile-nav">
                    <button onClick={() => navigate(-1)}>
                        <img src="/icons/back.svg"/>
                    </button>
                    <div className="profile-info">
                        <h2>@{profile?.user?.username}</h2>
                        <b>{profile?.PostsCount} post</b>
                    </div>
                </div>
                <div className="banner">
                    <img src="https://i.imgur.com/8Q4u3QD.jpg"/>
                </div>

                <div className="profile-data">
                    <div className="actions">
                        {id.id !== uuid &&
                            <button className="btn-follow">Follow</button>
                        }
                    </div>
                    <div className='profile-avatar'>
                        <img src={profile?.user?.avatar}/>
                    </div>
                    <div className="content-data">
                        <h2>{profile?.user?.username}</h2>
                        <b>@{profile?.user?.username}</b>
                        <br />
                        <p>{profile?.bios}</p>
                        <div className="count">
                            <p><b>{profile?.followingCount}</b> following</p>
                            <p><b>{profile?.followersCount}</b> follower</p>
                        </div>
                        {/* Ajout du sélecteur de tabs */}
                        <div className="tabs">
                            <button 
                                className={`tab ${activeTab === 'posts' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('posts')}>
                                {activeTab === 'posts' &&
                                    <img src="/icons/posts.png"/>
                                }
                                {activeTab !== 'posts' &&
                                    <img src="/icons/d_posts.png"/>
                                }
                            </button>
                            <button 
                                className={`tab ${activeTab === 'videos' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('videos')}>
                                {activeTab === 'videos' &&
                                    <img src="/icons/videos.png"/>
                                }
                                {activeTab !== 'videos' &&
                                    <img src="/icons/d_videos.png"/>
                                }
                            </button>
                            <button 
                                className={`tab ${activeTab === 'notes' ? 'active' : ''}`} 
                                onClick={() => setActiveTab('notes')}>
                                {activeTab === 'notes' &&
                                    <img src="/icons/notes.png"/>
                                }
                                {activeTab !== 'notes' &&
                                    <img src="/icons/d_notes.png"/>
                                }
                            </button>
                        </div>

                        {/* Contenu des onglets */}
                        <div className="tab-content">
                            {activeTab === 'posts' && (
                                <div>
                                    <div>
                                        <b>View</b>
                                        <select name="" id="">
                                            <option value="Grid">Grid</option>
                                            <option value="List">List</option>
                                        </select>
                                        <b className='c2'>Sorting</b>
                                        <select name="" id="">
                                            <option value="Grid">Latest</option>
                                            <option value="List">Oldest</option>
                                            <option value="List">Popular</option>
                                        </select>
                                    </div>
                                    <br />
                                    {profile && profile.PostImage.length > 0 &&
                                        profile.PostImage.map(post => (
                                            <img key={post.id} src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/post/"+post.src}/>
                                        ))
                                    }
                                    
                                </div>
                            )}
                            {activeTab === 'videos' && (
                                <div>
                                    <h3>Vidéos</h3>
                                    {/* Afficher les vidéos ici */}
                                </div>
                            )}
                            {activeTab === 'notes' && (
                                <div>
                                    <h3>Notes</h3>
                                    {/* Afficher les notes ici */}
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="hashtags"></div>
            <div className='footer'>
                <button><img src="/icons/home.svg"/></button>
                <button onClick={() => Open('/exploare')}><img src="/icons/exploare.svg"/></button>
                <button onClick={() => Open('/create')}><img src="/icons/create.svg" /></button>
                <button onClick={() => Open('/inbox')}><img src="/icons/inbox.svg"/></button>
                <button onClick={() => Open('/profile/'+ uuid)}><img src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/"+ uuid +".png"} className='img-profile'/></button>
            </div>
        </div>
    );
}

export default Profile;