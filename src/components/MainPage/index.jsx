// MainPage.js
import React from 'react';
import Post from '../Post';

const postsData = [
    {
        title: 'Post 1',
        date: '2023-07-27',
        content: 'This is the content of Post 1.',
    },
    {
        title: 'Post 2',
        date: '2023-07-28',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim turpis nec tellus luctus tincidunt. Sed facilisis, mauris id pharetra aliquet, risus ex cursus nisi, ac aliquam ipsum quam at odio. Donec quis elementum sem. Vivamus quis risus ut lorem euismod sodales. Proin varius eros vel facilisis volutpat. Nam vestibulum luctus tempor.',
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
