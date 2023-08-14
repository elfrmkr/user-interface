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
    Collapse
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
    const [comments, setComments] = useState([...post.comments]);
    const [newComment, setNewComment] = useState('');
    const [likeClicked, setLikeClicked] = useState(false);
    const [showComments, setShowComments] = useState(false);
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
            const comment = {
                text: newComment,
                date: new Date().toLocaleDateString(),
                author: currentUser,
            };
            setComments([...comments, comment]);
            setNewComment('');
            setShowComments(true)
        }
    };

    const handleDeleteComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
    };

    const handleCommentLike = (index) => {
        const updatedComments = [...comments];
        console.log(updatedComments);
        const comment = updatedComments[index];

        if (!comment.likeClicked) {
            comment.likeClicked = true;
            comment.dislikeClicked = false;
        } else {
            comment.likeClicked = false;
        }

        setComments(updatedComments);
    };

    const handleCommentDislike = (index) => {
        const updatedComments = [...comments];
        const comment = updatedComments[index];

        if (!comment.dislikeClicked) {
            comment.dislikeClicked = true;
            comment.likeClicked = false;
        } else {
            comment.dislikeClicked = false;
        }

        setComments(updatedComments);
    };



    return (
        <Card sx={{
            maxWidth: 900,
            margin: '16px auto',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px', // Add rounded corners

        }}>
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
                <IconButton aria-label="comment"
                    onClick={() => setShowComments(!showComments)}>
                    <CommentIcon />
                    {comments.length > 0 && (
                        <span
                            style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '12px',
                            }}
                        >
                            {comments.length}
                        </span>
                    )}
                </IconButton>
            </CardActions>
            <Divider />

            <div style={{ padding: '16px', display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button sx={{ marginLeft: 3 }} variant="contained" color="primary" onClick={handleAddComment} >
                    Comment
                </Button>
            </div>
            <Collapse in={showComments}>

                <List style={{ padding: 16, maxHeight: '300px', overflowY: 'auto' }} >
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
            </Collapse>
        </Card >
    );
};

export default Post;
