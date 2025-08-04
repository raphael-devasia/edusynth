import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Link,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { login, clearError } from '../../features/auth/authSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isLoading, error, isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);

  // Debug logging
  console.log('LoginPage - Auth State:', { isLoading, error, isAuthenticated, user, token });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    console.log('LoginPage - useEffect triggered, isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      console.log('LoginPage - Navigating to:', from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('LoginPage - Submitting login with:', { username: data.email });
      const result = await dispatch(login({
        username: data.email, // API expects username field
        password: data.password,
      }) as any).unwrap();
      console.log('LoginPage - Login successful, result:', result);
    } catch (error) {
      // Error is handled by the slice
      console.error('LoginPage - Login error:', error);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return <LoadingSpinner loading={true} message="Signing you in..." />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
        Welcome Back
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Sign in to your account to continue
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => dispatch(clearError())}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email Address"
              type="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Remember me"
              />
            )}
          />
          <Link href="#" variant="body2" color="primary">
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{ mb: 2, py: 1.5 }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <Typography variant="body2" color="text.secondary" align="center">
          Don't have an account?{' '}
          <Link href="#" color="primary">
            Contact Administrator
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
