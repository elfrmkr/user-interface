import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    Slide,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { AttachFile, Delete } from '@mui/icons-material';


const CreatePost = ({ onPost }) => {
    const [postContent, setPostContent] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setUploadedFile(selectedFile);
    };

    const handleDeleteFile = () => {
        setUploadedFile(null);
    };

    const renderMediaPreview = (file) => {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const containerStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px', // Set a fixed height for the container
        };

        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return (
                <div style={containerStyle}>
                    <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '100%' }} />
                </div>
            );
        } else if (['pdf'].includes(fileExtension)) {
            return (
                <div style={containerStyle}>
                    <embed src={URL.createObjectURL(file)} type="application/pdf" width="100%" height="100%" />
                </div>
            );
        } else if (['mp4', 'webm'].includes(fileExtension)) {
            return (
                <div style={containerStyle}>
                    <video controls width="100%" height="auto" style={{ maxHeight: '100%' }}>
                        <source src={URL.createObjectURL(file)} type={`video/${fileExtension}`} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }

        return null;
    };


    const handlePost = () => {
        if (!uploadedFile) {
            // Display an error message to the user that they must upload a file
            return;
        }

        const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();
        const reader = new FileReader();

        reader.onload = (event) => {
            const fileDataUrl = event.target.result;

            let fileType = 'other'; // Default type if not recognized

            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                fileType = 'image';
            } else if (['mp4', 'webm'].includes(fileExtension)) {
                fileType = 'video';
            } else if (['pdf'].includes(fileExtension)) {
                fileType = 'pdf';
            }

            const newPost = {
                content: postContent,
                media: {
                    type: fileType,
                    dataUrl: fileDataUrl,
                },
            };

            onPost(newPost);
            console.log(newPost);

            setPostContent('');
            setUploadedFile(null);
        };

        reader.readAsDataURL(uploadedFile);
    };

    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 900,
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                border: '1px solid #dbdbdb',
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Create a New Post</Typography>
                <TextField
                    multiline
                    rows={6}
                    fullWidth
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <InputLabel htmlFor="file-input" sx={{ marginBottom: 1 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        startIcon={<AttachFileIcon />}
                    >
                        Upload Media (Image, Video, PDF)
                    </Button>
                </InputLabel>
                <input
                    type="file"
                    id="file-input"
                    accept="image/*, video/*, application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                {uploadedFile && (
                    <Slide direction="right" in={uploadedFile !== null} mountOnEnter unmountOnExit>
                        <List sx={{ marginTop: 2 }}>
                            <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemText primary={uploadedFile.name} />
                                <IconButton edge="end" aria-label="delete" onClick={handleDeleteFile}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <div style={{ width: '100%' }}>{renderMediaPreview(uploadedFile)}</div>
                            </ListItem>
                        </List>
                    </Slide>
                )}
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={handlePost}>
                    Post
                </Button>
            </CardActions>
        </Card>
    );
};

export default CreatePost;
