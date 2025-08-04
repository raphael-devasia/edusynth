import React from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormField } from '../../types';

interface CustomFormProps {
  title?: string;
  fields: FormField[];
  defaultValues?: any;
  validationSchema?: yup.ObjectSchema<any>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  error?: string | null;
  submitButtonText?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
  gridColumns?: number;
}

const CustomForm: React.FC<CustomFormProps> = ({
  title,
  fields,
  defaultValues = {},
  validationSchema,
  onSubmit,
  isLoading = false,
  error,
  submitButtonText = 'Submit',
  showCancelButton = false,
  onCancel,
  gridColumns = 2,
}) => {
  // Helper function to safely extract error messages
  const getErrorMessage = (error: any): string => {
    if (typeof error?.message === 'string') {
      return error.message;
    }
    return 'Invalid input';
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const handleReset = () => {
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, required, options } = field;

    switch (type) {
      case 'select':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field: controllerField }) => (
              <FormControl fullWidth error={!!errors[name]}>
                <InputLabel>{label}</InputLabel>
                <Select
                  {...controllerField}
                  label={label}
                  disabled={isLoading}
                >
                  {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors[name] && (
                  <Typography variant="caption" color="error">
                    {getErrorMessage(errors[name])}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                label={label}
                multiline
                rows={4}
                fullWidth
                error={!!errors[name]}
                helperText={errors[name] ? getErrorMessage(errors[name]) : undefined}
                disabled={isLoading}
              />
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={name}
            control={control}
            render={({ field: controllerField }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...controllerField}
                    checked={controllerField.value || false}
                    disabled={isLoading}
                  />
                }
                label={label}
              />
            )}
          />
        );

      case 'date':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                label={label}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors[name]}
                helperText={errors[name] ? getErrorMessage(errors[name]) : undefined}
                disabled={isLoading}
              />
            )}
          />
        );

      case 'file':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field: controllerField }) => (
              <Box>
                <Typography variant="body2" gutterBottom>
                  {label}
                </Typography>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    controllerField.onChange(file);
                  }}
                  disabled={isLoading}
                />
                {errors[name] && (
                  <Typography variant="caption" color="error">
                    {getErrorMessage(errors[name])}
                  </Typography>
                )}
              </Box>
            )}
          />
        );

      default:
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                label={label}
                type={type}
                fullWidth
                error={!!errors[name]}
                helperText={errors[name] ? getErrorMessage(errors[name]) : undefined}
                disabled={isLoading}
              />
            )}
          />
        );
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {title && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
          {fields.map((field) => (
            <Box
              key={field.name}
              sx={{
                gridColumn: field.type === 'textarea' ? `1 / -1` : 'span 1',
                '@media (max-width: 600px)': {
                  gridColumn: '1 / -1'
                }
              }}
            >
              {renderField(field)}
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          {showCancelButton && (
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
          >
            {isLoading ? 'Processing...' : submitButtonText}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CustomForm;
