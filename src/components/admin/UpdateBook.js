import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, TextField, InputAdornment, Box } from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import Header from './Header';
import UpdateBookModal from './UpdateBookModal';
import axios from 'axios';


const UpdateBook = () => {
    const [bookdata, getBookData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState(null); // Define selectedBook state

    const handleOpen = (book_id) => {
        setSelectedBookId(book_id);
        setOpen(true);
        const selectedBook = bookdata.find(book => book.book_id === book_id);
        setSelectedBook(selectedBook);
    };

    const handleDelete = (book_id) => {
        axios.delete(`http://localhost:8000/admin/books/${book_id}`).then((response) => {
            console.log(response.data.res)
        })
    }

    const handleClose = () => {
        setOpen(false);
    };



    useEffect(() => {
        axios.get('http://localhost:8000/books').then(response => {
            getBookData(response.data.res)
        }).catch(function (error) {
            console.log(error);
        })
    }, [bookdata])

    const filteredBooks = bookdata.filter(book =>
        book.book_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{overflowX:'hidden'}}>
            <Header />
            <TextField
                value={searchQuery}
                placeholder='Search book...'
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
                sx={{ mb: '1rem', ml: 2, mt: 2, width: '30%', backgroundColor: '#fff' }}
            />
            <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column' }}>
                <UpdateBookModal open={open} handleClose={handleClose} selectedBook={selectedBook} />
                {filteredBooks.map((book, index) => (
                    <Grid key={index}>
                        <Card sx={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)', width: '100vw' }}>

                            <CardContent sx={{ display: 'flex', justifyContent: 'space-evenly', ':hover': { backgroundColor: '#F0F3FF' } }}>
                                <Grid md={3}>
                                    <Box sx={{ width: '50px',ml:11, height: '50px', overflow: 'hidden', borderRadius: '5px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)', backgroundImage: `url(${book.img})`, backgroundSize: 'cover' }}>
                                    </Box>
                                </Grid>
                                <Grid md={3}>

                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body2" color="textSecondary" fontFamily='Poppins' component="div">
                                            Book Name
                                        </Typography>
                                        <Typography variant="" component="div" mt={1}>
                                            {book.book_name}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid md={3}>

                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body2" color="textSecondary" fontFamily='Poppins' component="div">
                                            Author Name
                                        </Typography>
                                        <Typography variant="" component="div" mt={1}>
                                            {book.author_name}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid md={3}>
                                    <Button variant="contained" color="secondary" startIcon={<Edit />} onClick={() => handleOpen(book.book_id)}>
                                        Update
                                    </Button>
                                </Grid>
                                <Grid md={3}>
                                    <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDelete(book.book_id)}>
                                        Delete
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
export default UpdateBook;
