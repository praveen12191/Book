import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, TextField, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
    const [showOTPField, setShowOTPField] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Get OTP');
    const emailRef = useRef()
    const nameRef = useRef()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/otp/verify/', {email: data.email, otp: data.otp });
            console.log(response.data);
            navigate('/home')
        } catch (error) {
            console.error('Sign up failed:', error);
        }
        console.log(data);
    };

    const handleGetOTP = () => {
        // console.log(emailRef.current.value, nameRef.current.value);
        const username = nameRef.current.value;
        const email = emailRef.current.value;

        axios.post('http://localhost:8000/auth/signup', { user_name: username, email: email }).then(res=>console.log(res));
        setShowOTPField(true);
        setButtonLabel('Verify OTP');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                ml: 6,
                mt: 15,
                width: '80%',
                height: '40%',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    fontFamily: 'Poppins',
                    fontSize: '52px',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                }}
            >
                Sign Up
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

                <TextField
                    {...register('username', {
                        required: 'Username is required',
                    })}
                    variant="outlined"
                    fullWidth
                    inputRef={nameRef}
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                    sx={{ marginBottom: '20px' }}
                />

                <TextField
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                    variant="outlined"
                    fullWidth
                    inputRef={emailRef}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    sx={{ marginBottom: '20px' }}
                />

                {showOTPField && (
                    <TextField
                        {...register('otp', {
                            required: 'Please enter OTP',
                            pattern: {
                                value: /^\d{4}$/,
                                message: 'OTP should be 4 digits',
                            },
                        })}
                        variant="outlined"
                        fullWidth
                        label="Enter OTP"
                        error={!!errors.otp}
                        helperText={errors.otp ? errors.otp.message : ''}
                        sx={{ marginBottom: '20px' }}
                    />
                )}

                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '30px',
                        color: '#000000',
                        ml: 13
                    }}
                >
                    Already have an account?{' '}
                    <Link to="/" underline="none" sx={{ color: '#7C5DFA', fontWeight: 'bold', textAlign: 'center', }} style={{ textDecoration: 'none' }}>
                        Log in
                    </Link>

                </Typography>

                <Button
                    type="button"
                    variant="contained"
                    sx={{
                        ml: 14,
                        backgroundColor: '#15F5BA',
                        width: '60%',
                        height: '20%',
                        color: '#FFFFFF',
                        '&:hover': {
                            backgroundColor: '#0c9e87',
                        },
                    }}
                    onClick={showOTPField ? handleSubmit(onSubmit) : handleGetOTP}
                >
                    {buttonLabel}
                </Button>
            </form>
        </Box>
    );
};

export default SignUpForm;
