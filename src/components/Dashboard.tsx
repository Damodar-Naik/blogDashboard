import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import type { GridColDef, GridRowParams } from '@mui/x-data-grid';
import { Paper, Button, Container, TextField } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { PostDialog } from './PostDialog';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../types/types';

const initialPosts: BlogPost[] = [
    { id: 1, title: 'Programming', author: 'John Doe', date: '15-01-2023', status: 'Published' },
    { id: 2, title: 'Web Dev', author: 'Alice Kim', date: '22-03-2023', status: 'Published' },
    { id: 3, title: 'Data 101', author: 'Mark Lee', date: '05-05-2023', status: 'Draft' },
    { id: 4, title: 'React Basics', author: 'Emma Wilson', date: '18-06-2023', status: 'Published' },
    { id: 5, title: 'AI Trends', author: 'David Park', date: '30-07-2023', status: 'Draft' },
    { id: 6, title: 'App Design', author: 'Lisa Brown', date: '12-09-2023', status: 'Published' },
    { id: 7, title: 'Code Tips', author: 'Shakespeare', date: '24-12-2024', status: 'Draft' },
];

export default function Dashboard() {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [updatedPosts, setUpdatedPosts] = useState<BlogPost[]>(initialPosts);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

    // let localPosts = localStorage.getItem('blogPosts');
    // let formattedblogData: BlogPost | null = null;
    // if (localPosts) {
    //     formattedblogData = JSON.parse(localPosts);
    // }
    // else {
    //     formattedblogData = null
    // }
    // console.log(localPosts);
    // debugger


    // useEffect(() => {
    //     return () => {
    //         debugger
    //         localStorage.setItem('blogPosts', JSON.stringify(initialPosts))
    //     }
    // }, [])

    const handleSave = (postData: Omit<BlogPost, 'id' | 'date'>) => {
        if (currentPost) {
            const updated = posts.map(p => p.id === currentPost.id ? { ...p, ...postData } : p)
            setPosts(updated);
            setUpdatedPosts(updated);

        } else {
            const newId = Math.max(0, ...posts.map(p => p.id)) + 1;
            const newDate = new Date().toISOString().split('T')[0];
            const updated = [...posts, { ...postData, id: newId, date: newDate }];
            setPosts(updated);
            setUpdatedPosts(updated);
        }
        setOpenDialog(false);
    };

    const handleSearch = (value: string) => {
        const searchText = value.toLocaleLowerCase();
        if (!searchText) {
            setPosts(updatedPosts);
        }
        setSearchValue(value)
        const tempPosts = updatedPosts.filter((item) => {
            return item.title.toLowerCase().includes(searchText);
        })

        setPosts(tempPosts);
    }

    const handleDelete = (data: any) => {
        const check = confirm('are u sure u want to delete this post');
        if (check === true) {
            const updated = posts.filter(p => p.id !== data.id)
            setPosts(updated);
            setUpdatedPosts(updated)
        }
    }

    const columns: GridColDef<BlogPost>[] = [
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'author', headerName: 'Author', width: 150 },
        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'status', headerName: 'Status', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            width: 120,
            getActions: (params: GridRowParams<BlogPost>) => [
                <GridActionsCellItem
                    key="edit"
                    icon={<Edit />}
                    label="Edit"
                    onClick={() => {
                        setCurrentPost(params.row);
                        setOpenDialog(true);
                    }}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<Delete />}
                    label="Delete"
                    onClick={() => handleDelete(params)}
                />,
            ],
        },
    ];

    return (
        <Container maxWidth="lg">
            <Paper sx={{ p: 2, mt: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        setCurrentPost(null);
                        setOpenDialog(true);
                    }}
                    sx={{ mb: 2 }}
                >
                    Add Post
                </Button>

                <TextField
                    name="searchBox"
                    label="searchBox"
                    value={searchValue}
                    onChange={(ev) => handleSearch(ev?.target?.value)}
                    fullWidth
                    margin="normal"
                />

                <DataGrid
                    rows={posts}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                />

                <PostDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    post={currentPost}
                    onSave={handleSave}
                />
            </Paper>
        </Container>
    );
}
