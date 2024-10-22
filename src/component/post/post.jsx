import React, { useState } from 'react';
import './post.css'
import Modal from '../modal/send_post_modal';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../../supabase';

function Post({post_data, friends, uuid}) {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(post_data?.userLiked);
    const [likeCounter, setLikeCounter] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);




    const Like = async () => {
        if(liked === true && likeCounter < 10){
            setLiked(false)
            setLikeCounter(likeCounter + 1)

            const response = await supabase
            .from('like')
            .delete()
            .eq('user_id', uuid)
            .eq('post_id', post_data?.id)
          

        }

        if(liked === false && likeCounter < 10){
            setLiked(true)
            setLikeCounter(likeCounter + 1)

            const { error } = await supabase
            .from('like')
            .insert({ user_id: uuid, post_id: post_data?.id })
        }
    }
    return (
        <div className="post">
            <div className='post-nav' onClick={() => navigate('/profile/'+post_data.uuid)}>
                <img src={post_data?.user?.avatar}/>
                <b>{post_data?.user?.username}</b>
            </div>
            {post_data?.type === 'post' &&  
                <div className="content-post">
                    <img className='img-content' src={'https://bnplivusijobfbodvuxy.supabase.co/storage/v1/object/public/post/'+post_data?.src}/>
                </div>
            }

            {post_data?.type === 'note' &&
                <div className="caption">
                    <p>{post_data?.text}</p>
                </div>
            }
            <div className="items">
                <button onClick={() => Like()}>
                    {liked === true &&

                        <img src="/icons/heart2.png"/>

                    }
                    {liked === false &&

                        <img src="/icons/heart.png"/>

                    }
                </button>
                <button>
                    <img  src="/icons/comment.png"/>
                </button>
                <button>
                    <img  src="/icons/reply.png"/>
                </button>
                <button onClick={() => setIsModalOpen(true)}>
                    <img  src="/icons/share.png"/>
                </button>
            </div>
            {post_data?.likesCount > 0 &&
                <div className="caption">
                    <b>{post_data?.likesCount} like</b>
                </div>
            }
            {post_data?.type === 'post' &&
                <div className="caption">
                    <p><b>{post_data?.user?.username} </b>{post_data?.text}</p>
                </div>
            }
            {post_data?.randomComment !== null &&
                <div className='random_comment'>
                    <p><b>Comment</b> {post_data?.randomComment}</p>
                </div>
            }

            {isModalOpen && (
                <Modal 
                    onClose={() => setIsModalOpen(false)} 
                    friends={friends}
                />
            )}
            
        </div>
    );
}

export default Post;