import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    IconButton,
    Button,
    TextField,
    Divider,
    List,

} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import styled from 'styled-components'; // Add this import

const CommentCard = styled(Card)`
    margin-top: 8px;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const CommentContent = styled(CardContent)`
    display: flex;
    align-items: center;
`;

const CommentAvatar = styled(Avatar)`
    margin-right: 10px;
`;

const CommentText = styled(Typography)`
    margin-top: 8px;
`;

const Post = ({ post, currentUser }) => {
    const [comments, setComments] = useState([
        {
            text: 'This is a comment.',
            date: '2023-07-27',
            author: {
                name: 'John Doe',
                avatar: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80'
            },
            postId: "1"
        },
        {
            text: 'This is a new random comment.',
            date: '2023-09-27',
            author: {
                name: 'jane Doe',
                avatar: 'https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'
            },
            postId: "2"
        },
    ]);
    const [newComment, setNewComment] = useState('');
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);

    const handleLike = () => {
        setLikeClicked(!likeClicked);
        setDislikeClicked(false);
        // Implement like functionality here
    };

    const handleDislike = () => {
        setDislikeClicked(!dislikeClicked);
        setLikeClicked(false);

        // Implement dislike functionality here
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
    };

    const handleCommentLike = (index) => {
        const updatedComments = [...comments];
        const comment = updatedComments[index];
        comment.likeClicked = !comment.likeClicked;
        comment.dislikeClicked = false;
        setComments(updatedComments);
    };

    const handleCommentDislike = (index) => {
        const updatedComments = [...comments];
        const comment = updatedComments[index];
        comment.dislikeClicked = !comment.dislikeClicked;
        comment.likeClicked = false;
        setComments(updatedComments);
    };

    return (
        <Card sx={{ maxWidth: 600, margin: '16px auto', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={post.author.name} src={post.author.avatar} />
                    <div style={{ marginLeft: '10px' }}>
                        <Typography variant="subtitle1">{post.author.name}</Typography>
                        <Typography variant="caption">{post.date}</Typography>
                    </div>
                    {currentUser && currentUser.id === post.author.id && (
                        <div style={{ marginLeft: 'auto' }}>
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    )}
                </div>
                <Typography variant="body1" style={{ marginTop: '16px' }}>
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton aria-label="like" onClick={handleLike} color={likeClicked ? 'primary' : 'default'}>
                    <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="dislike" onClick={handleDislike} color={dislikeClicked ? 'primary' : 'default'}>
                    <ThumbDownIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Divider />

            <div style={{ padding: '16px' }}>
                <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleAddComment} style={{ marginTop: '8px' }}>
                    Comment
                </Button>
            </div>
            <List style={{ padding: -4, maxHeight: '300px', overflowY: 'auto' }}>
                {comments.map((comment, index) => (
                    (comment && comment.postId === post.postId) || !comment.postId ? (
                        <CommentCard key={index} sx={{ background: '#eae7e9' }}>
                            <CommentContent>
                                <CommentAvatar alt={comment?.author?.name || ''} src={comment?.author?.avatar || ''} />
                                <div>
                                    <Typography variant="subtitle2">{comment?.author?.name || 'Anonymous'}</Typography>
                                    <Typography variant="caption">{comment?.date || new Date().toLocaleDateString()}</Typography>
                                </div>
                            </CommentContent>
                            <div style={{
                                display: 'flex', justifyContent: "space-between", alignItems: "center"
                            }}>
                                <CommentText variant="body2" marginLeft={'18px'}>{comment?.text || comment}</CommentText>
                                <CardActions>
                                    <IconButton
                                        fontSize="small"
                                        aria-label="like" onClick={() => handleCommentLike(index)}>
                                        <ThumbUpIcon color={comment?.likeClicked ? 'primary' : 'default'} />
                                    </IconButton>
                                    <IconButton
                                        fontSize="small"
                                        aria-label="dislike" onClick={() => handleCommentDislike(index)}>
                                        <ThumbDownIcon color={comment?.dislikeClicked ? 'primary' : 'default'} />
                                    </IconButton>
                                </CardActions>
                            </div>
                        </CommentCard>
                    ) : null
                ))}
            </List>

        </Card >
    );
};

export default Post;
