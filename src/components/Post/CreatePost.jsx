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
    ListItemSecondaryAction,
    Avatar,
} from '@mui/material';
import { AttachFile, Delete } from '@mui/icons-material';

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [files, setFiles] = useState([]);

    const handleFileUpload = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles([...files, ...selectedFiles]);
    };

    const handleDeleteFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: '16px auto',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
            }}
        >
            <CardContent>
                <Typography variant="h6">Create a New Post</Typography>
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    label="Post Content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    sx={{ marginTop: 16 }}
                />
                <input
                    type="file"
                    id="file-input"
                    multiple
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
                        Upload Files
                    </Button>
                </label>
                <List sx={{ marginTop: 16 }}>
                    {files.map((file, index) => (
                        <ListItem key={index}>
                            <Avatar>
                                <AttachFile />
                            </Avatar>
                            <ListItemText primary={file.name} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteFile(index)}
                                >
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary">
                    Post
                </Button>
            </CardActions>
        </Card>
    );
};

export default CreatePost;
