import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, Grid, Paper, Divider, List, ListItem, ListItemText, Avatar, ListItemAvatar} from '@mui/material';
import { Book, Group, AttachMoney, Star } from '@mui/icons-material';
import Header from './Header';
import axios from 'axios';

const Main = () => {
    const [bookCount,setBookCount] = useState(0);
    const [rentCount,setRentCount] = useState(0);
    const [purchaseCount,setPurchaseCount] = useState(0);
    const [userCount,setUserCount] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/books`).then((response) => {
            setBookCount(response.data.res.length);
        })

        axios.get(`http://localhost:8000/transactions`).then((response) => {
            const transactions = response.data.res;
            const rentedBooks = transactions.filter(transaction => transaction.purchase_type === 'rented')
            setRentCount(rentedBooks.length);

            const purchasedBooks = transactions.filter(transaction => transaction.purchase_type === 'purchase')
            setPurchaseCount(purchasedBooks.length);
        })
        
        axios.get(`http://localhost:8000/admin/users`).then((response) => {
            setUserCount(response.data.res.length)
        })

    },[bookCount,rentCount,purchaseCount])

    return (
        <div>
            <Header/>
            <Container>
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#211951', color: '#fff' }}>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <Book fontSize='large' />
                                <Typography variant="h6" fontFamily="Poppins">Total Books</Typography>
                                <Typography variant="h4" fontFamily="Poppins">{bookCount}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#836FFF', color: '#fff' }}>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <Group fontSize='large' />
                                <Typography variant="h6" fontFamily="Poppins">Total Users</Typography>
                                <Typography variant="h4" fontFamily="Poppins">{userCount}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Paper sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#15F5BA', color: '#000' }}>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <AttachMoney fontSize='large' />
                                <Typography variant="h6" fontFamily="Poppins">Books Bought</Typography>
                                <Typography variant="h4" fontFamily="Poppins">{purchaseCount}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} md={3} >
                        <Paper sx={{ textAlign: 'center', padding: '20px', backgroundColor: '#F0F3FF', color: '#000' }}>
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                <Star fontSize='large' />
                                <Typography variant="h6" fontFamily="Poppins">Books Rented</Typography>
                                <Typography variant="h4" fontFamily="Poppins">{rentCount}</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ padding: '20px', backgroundColor: '#FFF', color: '#211951', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" fontFamily="Poppins" gutterBottom fontWeight='600'>Popular Books Purchased</Typography>
                            <List sx={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Book />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Book Name"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    fontFamily="Poppins"
                                                    color="text.primary"
                                                >
                                                    No. of Users
                                                </Typography>
                                                {' — 10'}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Book />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Book Name"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    fontFamily="Poppins"
                                                    color="text.primary"
                                                >
                                                    No. of Users
                                                </Typography>
                                                {' — 8'}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: '20px', backgroundColor: '#FFF', color: '#211951', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="h5" fontFamily="Poppins" fontWeight='600' gutterBottom>Popular Rentals</Typography>
                            <List sx={{ boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Book />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Book Name"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    fontFamily="Poppins"
                                                    color="text.primary"
                                                >
                                                    No. of Users
                                                </Typography>
                                                {' — 5'}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Book />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Book Name"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    fontFamily="Poppins"
                                                    color="text.primary"
                                                >
                                                    No. of Users
                                                </Typography>
                                                {' — 4'}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Main;
