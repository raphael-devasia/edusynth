import { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { CustomField } from '../../types';

export function useStaffCustomFields() {
  const [fields, setFields] = useState<CustomField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiService.getStaffCustomFields()
      .then((data: any) => {
        if (mounted) setFields(data.data || data || []);
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Failed to load custom fields');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  return { fields, loading, error };
}
