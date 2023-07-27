// Post.js
import React from 'react';

const Post = ({ post }) => {
    return (
        <div className="post">
            <div className="post-header">
                <h3>{post.title}</h3>
                <p>{post.date}</p>
            </div>
            <div className="post-content">{post.content}</div>
            <div className="post-actions">
                <button>Like</button>
                <button>Share</button>
            </div>
        </div>
    );
};

export default Post;
