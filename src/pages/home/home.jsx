import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatePost from '../../component/create/create';
import Post from '../../component/post/post';
import Stories from '../../component/storie/storie';

function Home({posts_data, friends, uuid}) {
    const navigate = useNavigate();
    const posts = posts_data;
    
    useEffect(() => {
        
    }, []);

    




    const Open = (page) => {
        navigate(page)
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
                        <li ><a ><img src="/icons/home.svg"/>Home</a></li>
                        <li onClick={() => Open('/exploare')}><a ><img src="/icons/exploare.svg"/>Explore</a></li>
                        <li onClick={() => Open('/inbox')}><a ><img src="/icons/inbox.svg"/>Inbox</a></li>
                        <li onClick={() => Open('/profile/'+uuid)}><a ><img src={"https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/"+ uuid +".png"} className='img-profile'/>Profile</a></li>
                    </ul>
                </nav>
            </div>
            <div className='content'>
                {/* <Stories/> */}
                <br />
                <CreatePost uuid={uuid}/>
                {posts && posts.length > 0 &&
                    posts.map(post => (
                        <Post post_data={post} friends={friends} uuid={uuid}/>
                    ))
                }
                {posts && posts.length === 0 && <p>No posts found</p>}
                {!posts && <p>Loading</p>}
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

export default Home;