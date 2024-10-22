import React, { useState, useRef } from 'react';
import './storie.css';

const storiesData = [

  // Ajoute plus de stories ici
];

const Stories = () => {
  const [expland, setExpland] = useState(true);
  const storiesContainerRef = useRef(null);

  const scrollLeft = () => {
    storiesContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    storiesContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <>
        <div className='actions-bar'>
            <button onClick={() => setExpland(!expland)}>
                <b>{expland ? 'Collapse Stories' : 'Expand Stories'}</b>
                <img src={expland ? './icons/collapse.png' : './icons/expland.png'}/>
            </button>
        </div>

        <div className="stories-wrapper">
            {expland === false &&
                <button className="scroll-button left" onClick={scrollLeft}>
                    <img src="./icons/left-row.png" />
                </button>
            }

            <div className={`stories-container ${expland ? 'expland' : ''}`} ref={storiesContainerRef}>
            <div className="story">
                <div className="story-avatar">
                <img src="https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/avatar/8d25ad2d-33e4-4928-b3b9-387c09833def.png" alt="Your Story" />
                </div>
                <p className="story-username">Your Story</p>
            </div>

            {storiesData.map((story, index) => (
                <div key={index} className="story">
                <div className="story-avatar others">
                    <img src={story.imgSrc} alt={story.username} />
                </div>
                <p className="story-username">{story.username}</p>
                </div>
            ))}
            </div>
            {expland === false &&
                <button className="scroll-button right" onClick={scrollRight}>
                    <img src="./icons/right-row.png" />
                </button>
            }
        </div>
    </>
  );
};

export default Stories;
