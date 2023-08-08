// MainPage.js
import React from 'react';
import Post from '../Post';

const postsData = [
    {
        title: 'Post 1',
        date: '2023-07-27',
        content: 'This is the content of Post 1.',
        author: {
            name: "Elif",
            avatar: "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
            id: "1"
        },
        postId: "1"
    },

    {
        title: 'Post 2',
        date: '2023-07-28',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim turpis nec tellus luctus tincidunt. Sed facilisis, mauris id pharetra aliquet, risus ex cursus nisi, ac aliquam ipsum quam at odio. Donec quis elementum sem. Vivamus quis risus ut lorem euismod sodales. Proin varius eros vel facilisis volutpat. Nam vestibulum luctus tempor.',
        author: {
            name: "Siyom",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            id: "2"
        },
        postId: "2"
    },
    // Add more posts here
];

const MainPage = () => {
    return (
        <div className="main-page">
            {postsData.map((post, index) => (
                <Post key={index} post={post} />
            ))}
        </div>
    );
};

export default MainPage;
