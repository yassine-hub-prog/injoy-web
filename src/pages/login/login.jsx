import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [randomComment, setRandomComment] = useState({});
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Array of comments and users
  const comments = [
    {
      text: "Honestly, I’m really excited about what @Injoy is doing! You don’t need to navigate a complex setup; just share your moments and connect with friends effortlessly. It’s all about enjoying social media without the hassle! 🎉💖 #Injoy #SocialMedia",
      user: "ayman",
      avatar: "https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/06d22488-e065-47ba-8d6f-f4164366603f.jpg"
    },
    {
      text: "Loving the simplicity of @Injoy! It’s amazing how easy it is to get started and just enjoy the platform without any distractions. Great job! 👏🔥 #Injoy #SocialMediaRevolution",
      user: "sarah",
      avatar: "https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/de08f13c-9a8d-4bfe-badc-b755caf97760.jpg"
    },
    {
      text: "Injoy is the future of social media! No more overcomplicating things—just pure, effortless fun and connection. Can't wait to see where this goes! 🚀✨ #Injoy #Innovation",
      user: "mohamed",
      avatar: "https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/e5814248-2347-48a4-8347-3717402b0994.jpg"
    },
    {
      text: "@Injoy is changing the game! The platform feels fresh, intuitive, and most importantly, super fun. It's all about enjoying the moment! 😊🎉 #Injoy",
      user: "amelie",
      avatar: "https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/6bd3fb1c-bf9f-4bde-a82c-504b0b9090ae.jpg"
    }
  ];

  // Randomly select a comment and user
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * comments.length);
    setRandomComment(comments[randomIndex]);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Login error:', error);
      if(error.code === 'invalid_credentials'){
        setMsg('Invalid email or password');
      }
    } else {
      // If login is successful, call onLogin and navigate to the home page
      onLogin();
      navigate('/'); // Redirect to home page
    }
  };

  return (
    <div className="login_overlayer">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2 className='title-2'>Welcome back</h2>
          <h4 className='title-4'>Sign in to your account</h4>
          <label htmlFor="">Email</label>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label htmlFor="">Password</label>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <p className='error'>{msg}</p>
          <button type="submit">Se connecter</button>
          <h4 className='title-4'>Don't have an account? <Link to='/register'><b>Sign Up Now</b></Link></h4>
        </form>
      </div>
      <div className="image-container">
        <div>
          <b className='g'>“</b>
          <p>{randomComment.text}</p>
          <div className="user">
            <img src={randomComment.avatar} alt="User avatar" />
            <b>{randomComment.user}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
