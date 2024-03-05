import React from 'react';
import { Typography, Box, Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem,Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import Header from "./Header";
import axios from 'axios';

const CreateBook = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        axios.post('http://localhost:8000/admin/books', data).then(response => {
            console.log(response)
        }).catch(function (error) {
            console.log(error);
        })
        console.log(data);
    };

    return (
        <div className="create-book">
            <Header />
            <Container>
                <Box boxShadow={3} p={5} mt={5}>
                    <Typography variant='h6' mb={3} fontSize='30px' fontWeight='600' sx={{ color: '#211951' }}>Create a New Book</Typography>
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
                                <input {...register('pdf', { required: 'PDF URL is required' })} label='PDF File' type="file" error={errors.pdf_url} helperText={errors.pdf_url?.message} />
                                {/*<TextField {...register('pdf_url', { required: 'PDF URL is required' })} label='PDF URL' variant='outlined' fullWidth error={errors.pdf_url} helperText={errors.pdf_url?.message} />*/}
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
                                <input {...register('image')} type='file' accept='image/*' encType='multipart/form-data' />
                                {/*<TextField {...register('img')} label='image' variant='outlined' fullWidth />*/}
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' variant='contained' color='primary' fullWidth sx={{ backgroundColor: '#15F5BA' }}>Submit</Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Container>
        </div>
    );
}
export default CreateBook;
