import React from 'react';
import { Box, Stack, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { CustomField } from '../../types';

interface Props {
  customFields: CustomField[];
  values: { field_id: string; value: any }[];
  onChange: (field_id: string, value: any) => void;
  loading: boolean;
  error: string | null;
}

export const StaffCustomFields: React.FC<Props> = ({ customFields, values, onChange, loading, error }) => {
  if (loading) return <Box><CircularProgress size={20} /> Loading custom fields...</Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!customFields.length) return null;
  return (
    <Box>
      <Typography variant="subtitle1" mt={2} mb={1}>Additional Information</Typography>
      <Stack spacing={2}>
        {customFields.map(field => {
          const cfVal = values.find(cf => cf.field_id === field._id)?.value ?? '';
          if (field.type === 'select') {
            return <TextField select key={field._id} label={field.label} name={`custom_field_${field._id}`} value={cfVal} onChange={e => onChange(field._id, e.target.value)} fullWidth required={field.required} SelectProps={{ native: true }}>
              <option value="">Select</option>
              {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </TextField>;
          } else if (field.type === 'textarea') {
            return <TextField key={field._id} label={field.label} name={`custom_field_${field._id}`} value={cfVal} onChange={e => onChange(field._id, e.target.value)} fullWidth required={field.required} multiline minRows={2} />;
          } else if (field.type === 'checkbox') {
            return <Stack direction="row" alignItems="center" key={field._id}><Typography>{field.label}</Typography><input type="checkbox" name={`custom_field_${field._id}`} checked={!!cfVal} onChange={e => onChange(field._id, e.target.checked)} /></Stack>;
          } else if (field.type === 'date') {
            return <TextField key={field._id} label={field.label} name={`custom_field_${field._id}`} type="date" value={cfVal} onChange={e => onChange(field._id, e.target.value)} fullWidth required={field.required} InputLabelProps={{ shrink: true }} />;
          } else if (field.type === 'file') {
            return <Stack direction="row" alignItems="center" key={field._id}><Typography>{field.label}</Typography><input type="file" name={`custom_field_${field._id}`} onChange={e => onChange(field._id, (e.target as HTMLInputElement).files?.[0])} /></Stack>;
          } else {
            return <TextField key={field._id} label={field.label} name={`custom_field_${field._id}`} value={cfVal} onChange={e => onChange(field._id, e.target.value)} fullWidth required={field.required} type={field.type} />;
          }
        })}
      </Stack>
    </Box>
  );
};
