import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  // Form state
  const [email, setEmail] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Call API to request password reset
      await axios.post('/api/auth/forgot-password', { email });
      
      // Show success message
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to process request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Reset Password
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success ? (
        <Box>
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset instructions have been sent to your email.
          </Alert>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please check your email for instructions to reset your password. If you don't receive an email within a few minutes, check your spam folder.
          </Typography>
          <Button
            component={RouterLink}
            to="/login"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Return to Login
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Enter your email address and we'll send you instructions to reset your password.
          </Typography>
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/login" variant="body2">
                Remember your password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account?
              </Link>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default ForgotPassword; 