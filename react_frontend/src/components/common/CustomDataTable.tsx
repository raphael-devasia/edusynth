import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Button,
  Typography,
  Toolbar,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { TableColumn } from '../../types';

interface CustomDataTableProps {
  title: string;
  columns: TableColumn[];
  data: any[];
  isLoading?: boolean;
  error?: string | null;
  totalCount?: number;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  onSearch?: (searchTerm: string) => void;
  onAdd?: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  showActions?: boolean;
  showAddButton?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  rowsPerPageOptions?: number[];
}

const CustomDataTable: React.FC<CustomDataTableProps> = ({
  title,
  columns,
  data,
  isLoading = false,
  error,
  totalCount = 0,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  onSearch,
  onAdd,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  showAddButton = true,
  showSearch = true,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data available',
  rowsPerPageOptions = [5, 10, 25, 50],
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    if (onSort) {
      onSort(field, newDirection);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRowsPerPage);
    }
  };

  const renderCellContent = (column: TableColumn, row: any) => {
    if (column.renderCell) {
      return column.renderCell({ row, value: row[column.field] });
    }

    const value = row[column.field];
    
    // Handle different data types
    if (value === null || value === undefined) {
      return '-';
    }
    
    if (typeof value === 'boolean') {
      return (
        <Chip
          label={value ? 'Yes' : 'No'}
          color={value ? 'success' : 'default'}
          size="small"
        />
      );
    }
    
    if (column.field.includes('date') || column.field.includes('Date')) {
      return new Date(value).toLocaleDateString();
    }
    
    return value;
  };

  return (
    <Paper elevation={3}>
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>

        {showSearch && (
          <TextField
            size="small"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2, minWidth: 200 }}
          />
        )}

        {showAddButton && onAdd && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            size="small"
          >
            Add New
          </Button>
        )}
      </Toolbar>

      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  style={{ width: column.width }}
                  sortDirection={sortField === column.field ? sortDirection : false}
                >
                  {column.sortable !== false ? (
                    <TableSortLabel
                      active={sortField === column.field}
                      direction={sortField === column.field ? sortDirection : 'asc'}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.headerName}
                    </TableSortLabel>
                  ) : (
                    column.headerName
                  )}
                </TableCell>
              ))}
              {showActions && (
                <TableCell align="center" style={{ width: 120 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (showActions ? 1 : 0)} align="center">
                  <Box sx={{ py: 4 }}>
                    <CircularProgress />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Loading...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (showActions ? 1 : 0)} align="center">
                  <Box sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      {emptyMessage}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={row._id || row.id || index} hover>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {renderCellContent(column, row)}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                        {onView && (
                          <Tooltip title="View">
                            <IconButton
                              size="small"
                              onClick={() => onView(row._id || row.id)}
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onEdit && (
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => onEdit(row._id || row.id)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => onDelete(row._id || row.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!isLoading && data.length > 0 && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </Paper>
  );
};

export default CustomDataTable;
