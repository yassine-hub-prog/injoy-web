import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Exploare({exploare_data, uuid}) {
    const navigate = useNavigate();

    console.log(uuid)
    
    useEffect(() => {
        
    }, []);

    if (!exploare_data) {
        return <div className='content'><p>Loading</p></div>;
    }

    const Open = (page) => {
        navigate(page)
    }


    return (
        <div className='container'>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <h1>INJOY</h1>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li onClick={() => Open('/home')}><a ><img src="/icons/home.svg"/>Home</a></li>
                        <li><a><img src="/icons/exploare.svg"/>Explore</a></li>
                        <li onClick={() => Open('/inbox')}><a ><img src="/icons/inbox.svg"/>Inbox</a></li>
                        <li onClick={() => Open('/profile/'+ uuid)}><a ><img src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/"+ uuid +".png"} className='img-profile'/>Profile</a></li>
                    </ul>
                </nav>
            </div>
            <div className='content-exploare'>
                {exploare_data.length > 0 ? (
                    exploare_data.map(exploare => (
                        <img src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/post/" + exploare.src}/>
                    ))
                ) : (
                    <p>No posts available.🎉</p>
                )}
            </div>
            <div className="hashtags"></div>
            <div className='footer'>
                <button onClick={() => Open('/home')}><img src="/icons/home.svg"/></button>
                <button><img src="/icons/exploare.svg"/></button>
                <button onClick={() => Open('/create')}><img src="/icons/create.svg" /></button>
                <button onClick={() => Open('/inbox')}><img src="/icons/inbox.svg"/></button>
                <button onClick={() => Open('/profile')}><img src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/"+ uuid +".png"} className='img-profile'/></button>
            </div>
        </div>
    );
}

export default Exploare;