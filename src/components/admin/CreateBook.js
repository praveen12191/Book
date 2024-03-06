import React, { useState } from 'react';
import { Typography, Box, Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import Header from "./Header";
import axios from 'axios';

const CreateBook = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('book_name', data.book_name);
        formData.append('author_name', data.author_name);
        formData.append('pdf', pdf);
        formData.append('genre', data.genre);
        formData.append('book_desc', data.book_desc);
        formData.append('rent_amount', data.rent_amount);
        formData.append('purchase_amount', data.purchase_amount);
        formData.append('pages', data.pages);
        formData.append('ratings', data.ratings);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost:8000/admin/books', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setSuccessMessage(true); 
            setTimeout(() => {
                setSuccessMessage(false); 
                reset();
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="create-book">
            <Header />
            <Container>
                <Box boxShadow={3} p={5} mt={5}>
                    <Typography variant='h6' mb={3} fontSize='30px' fontWeight='600' sx={{ color: '#211951' }}>Create a New Book</Typography>
                    {successMessage && (
                        <Typography variant="subtitle1" color="textPrimary" md= "3">
                            Book added successfully
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField {...register('book_name', { required: 'Book Name is required' })} label='Book Name' variant='outlined' fullWidth error={errors.book_name} helperText={errors.book_name?.message} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register('author_name', { required: 'Author Name is required' })} label='Author Name' variant='outlined' fullWidth error={errors.author_name} helperText={errors.author_name?.message} />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color='grey'>PDF File</Typography>
                                <input
                                    filename={pdf}
                                    onChange={e => setPdf(e.target.files[0])}
                                    type="file"
                                ></input>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={errors.genre}>
                                    <InputLabel>Genre</InputLabel>
                                    <Select {...register('genre', { required: 'Genre is required' })} defaultValue='' variant='standard'>
                                        <MenuItem value=''>Select Genre</MenuItem>
                                        <MenuItem value='Fiction'>Fiction</MenuItem>
                                        <MenuItem value='Non-Fiction'>Non-Fiction</MenuItem>
                                    </Select>
                                    {errors.genre && <Typography variant='caption' color='error'>{errors.genre.message}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register('book_desc', { required: 'Book Description is required' })} label='Book Description' variant='outlined' fullWidth error={errors.book_desc} helperText={errors.book_desc?.message} multiline />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register('rent_amount', { required: 'Rent Amount is required', pattern: { value: /^[0-9]+$/, message: 'Rent Amount must be a number' } })} label='Rent Amount' variant='outlined' fullWidth error={errors.rent_amount} helperText={errors.rent_amount?.message} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register('purchase_amount', { required: 'Purchase Amount is required', pattern: { value: /^[0-9]+$/, message: 'Purchase Amount must be a number' } })} label='Purchase Amount' variant='outlined' fullWidth error={errors.purchase_amount} helperText={errors.purchase_amount?.message} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField {...register('pages', { required: 'Total Number of Pages is required', pattern: { value: /^[0-9]+$/, message: 'Total Number of Pages must be a number' } })} label='Total Number of Pages' variant='outlined' fullWidth error={errors.pages} helperText={errors.pages?.message} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth error={errors.ratings}>
                                    <InputLabel>Ratings</InputLabel>
                                    <Select {...register('ratings', { required: 'Ratings is required' })} defaultValue='' variant='standard'>
                                        <MenuItem value=''>Select Rating</MenuItem>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <MenuItem key={rating} value={rating}>{rating}</MenuItem>
                                        ))}
                                    </Select>
                                    {errors.ratings && <Typography variant='caption' color='error'>{errors.ratings.message}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography color='grey'>Book Cover image</Typography>
                                <input
                                    filename={image}
                                    onChange={e => setImage(e.target.files[0])}
                                    type="file"
                                    accept="image/*"
                                ></input>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' variant='contained' color='primary' fullWidth sx={{ backgroundColor: '#15F5BA', mt: 2 }}>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </div>
    );
}

export default CreateBook;
