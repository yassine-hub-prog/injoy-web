import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/home';
import Exploare from './pages/exploare/exploare';
import { useEffect, useState } from 'react';
import Inbox from './pages/inbox/inbox';
import Profile from './pages/profile/profile';
import Login from './pages/login/login';
import Register from './pages/register/register'; // Import Register
import { supabase } from './supabase';

function App() {
  const [posts, setPosts] = useState(null);
  const [exploare, setExploare] = useState(null);
  const [inbox, setInbox] = useState(null);
  const [friends, setFriends] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [uuid, setUuid] = useState();

  useEffect(() => {
    checkUser();
    
    // Listen for changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsLoggedIn(false); // User is logged out or session is invalid
      } else {
        setIsLoggedIn(true); // User is logged in
      }
    });

    return () => {
      subscription.unsubscribe(); // Cleanup subscription on unmount
    };
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.log(session); // Debugging to see the session details
      setIsLoggedIn(true);
      setUuid(session.user.identities[0]?.id || session.user.id); // Ensure uuid is correctly assigned
      fetchPosts(session.user.id);
      fetchExploare();
      fetchInbox(session.user.id);
      fetchFriends(session.user.id);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false); // Set loading to false after checking session
  };

  const fetchPosts = (uuid) => {
    if (!uuid) return; // Vérifie si uuid est bien défini
    fetch('https://server-b133.onrender.com/api/posts/following/' + uuid)
      .then(response => response.json())
      .then(data => setPosts(data.posts))
      .catch(error => console.error('Erreur:', error));
  };

  const fetchExploare = () => {
    fetch('https://server-b133.onrender.com/exploare')
      .then(response => response.json())
      .then(data => setExploare(data))
      .catch(error => console.error('Erreur:', error));
  };

  const fetchInbox = (uuid) => {
    if (!uuid) return; // Vérifie si uuid est bien défini
    fetch('https://server-b133.onrender.com/api/contact/' + uuid)
      .then(response => response.json())
      .then(data => setInbox(data))
      .catch(error => console.error('Erreur:', error));
  };

  const fetchFriends = (uuid) => {
    if (!uuid) return; // Vérifie si uuid est bien défini
    fetch('https://server-b133.onrender.com/api/friends/' + uuid)
      .then(response => response.json())
      .then(data => setFriends(data))
      .catch(error => console.error('Erreur:', error));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchPosts(uuid);
    fetchExploare();
    fetchInbox(uuid);
    fetchFriends(uuid);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    fetchPosts(uuid);
    fetchExploare();
    fetchInbox(uuid);
    fetchFriends(uuid);
  };

  return (
    <BrowserRouter>
      {loading ? ( // Render loading state while checking session
        <div>Loading...</div>
      ) : (
        <Routes>
          {isLoggedIn ? (
            uuid ? ( // Ensure uuid is defined before rendering components
              <>
                <Route path="/" element={<Home posts_data={posts} friends={friends} uuid={uuid} />} />
                <Route path="/home" element={<Home posts_data={posts} friends={friends} uuid={uuid} />} />
                <Route path="/exploare" element={<Exploare exploare_data={exploare} uuid={uuid} />} />
                <Route path="/inbox" element={<Inbox inbox_data={inbox} />} />
                <Route path="/profile/:id" element={<Profile uuid={uuid} />} />
              </>
            ) : (
              <div>Loading...</div> // Another loading state for when uuid is not yet available
            )
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Ensure the login route is always available */}
              <Route path="/register" element={<Register onRegister={handleRegister} />} /> {/* Add the register route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
