import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import type { BlogPost } from '../types/types';

interface Post {
    id?: number;
    title: string;
    author: string;
    status: 'Draft' | 'Published';
    date?: string;
}

interface PostDialogProps {
    open: boolean;
    onClose: () => void;
    post: BlogPost | null;
    onSave: (postData: Omit<Post, 'id' | 'date'>) => void;
}

export const PostDialog: React.FC<PostDialogProps> = ({ open, onClose, post, onSave }) => {

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                author: post.author,
                status: post.status
            });
        } else {
            setFormData({
                title: '',
                author: '',
                status: 'Draft'
            });
        }
    }, [post]);

    const [formData, setFormData] = React.useState({
        title: post?.title || '',
        author: post?.author || '',
        status: post?.status || 'Draft'
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{post ? 'Edit Post' : 'Add Post'}</DialogTitle>
            <DialogContent>
                <TextField
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="author"
                    label="Author"
                    value={formData.author}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    select
                    required
                >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Published">Published</MenuItem>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => onSave(formData)}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};