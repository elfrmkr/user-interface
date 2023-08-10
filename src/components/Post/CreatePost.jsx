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

        if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            return <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }} />;
        } else if (['pdf'].includes(fileExtension)) {
            return <embed src={URL.createObjectURL(file)} type="application/pdf" width="100%" height="800px" />;
        } else if (['mp4', 'webm'].includes(fileExtension)) {
            return (
                <video controls width="100%" height="auto" style={{ maxHeight: '400px' }}>
                    <source src={URL.createObjectURL(file)} type={`video/${fileExtension}`} />
                    Your browser does not support the video tag.
                </video>
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
                maxWidth: 900,
                margin: '16px auto',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
            }}
        >
            <CardContent>
                <Typography variant="h6">Create a New Post</Typography>
                <TextField
                    multiline
                    rows={6}
                    fullWidth
                    label="Post Content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    sx={{ marginTop: 16 }}
                />
                <input
                    type="file"
                    id="file-input"
                    accept="image/*, video/*, application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                />
                <label htmlFor="file-input">
                    <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        startIcon={<AttachFile />}
                        sx={{ marginTop: 16 }}
                    >
                        Upload Media (Image, Video, PDF)
                    </Button>
                </label>
                {uploadedFile && (
                    <Slide direction="right" in={uploadedFile !== null} mountOnEnter unmountOnExit>
                        <List sx={{ marginTop: 4 }}>
                            <ListItem>
                                <ListItemText primary={uploadedFile.name} />
                                <IconButton edge="end" aria-label="delete" onClick={handleDeleteFile}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <div style={{ width: "100%" }}>{renderMediaPreview(uploadedFile)}</div>
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
