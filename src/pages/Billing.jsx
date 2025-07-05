import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Fab,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Receipt,
  Payment,
  CreditCard,
  AccountBalance,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  Download,
  Print,
  Email,
  Search,
  FilterList
} from '@mui/icons-material';

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    serviceType: '',
    amount: '',
    insuranceProvider: '',
    insuranceNumber: '',
    dueDate: '',
    description: ''
  });

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      // Simulate API call
      const mockBills = [
        {
          id: 1,
          patientName: 'John Doe',
          patientId: 'P001',
          serviceType: 'Consultation',
          amount: 150.00,
          insuranceProvider: 'Blue Cross',
          insuranceNumber: 'BC123456',
          dueDate: '2024-01-20',
          status: 'paid',
          paidDate: '2024-01-15',
          description: 'Cardiology consultation'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          patientId: 'P002',
          serviceType: 'Laboratory Test',
          amount: 75.50,
          insuranceProvider: 'Aetna',
          insuranceNumber: 'AE789012',
          dueDate: '2024-01-25',
          status: 'pending',
          description: 'Blood work and analysis'
        },
        {
          id: 3,
          patientName: 'Bob Wilson',
          patientId: 'P003',
          serviceType: 'X-Ray',
          amount: 200.00,
          insuranceProvider: 'Cigna',
          insuranceNumber: 'CI345678',
          dueDate: '2024-01-18',
          status: 'overdue',
          description: 'Chest X-ray examination'
        }
      ];
      setBills(mockBills);
    } catch (error) {
      console.error('Failed to load bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (bill = null) => {
    if (bill) {
      setEditingBill(bill);
      setFormData({
        patientName: bill.patientName,
        patientId: bill.patientId,
        serviceType: bill.serviceType,
        amount: bill.amount.toString(),
        insuranceProvider: bill.insuranceProvider,
        insuranceNumber: bill.insuranceNumber,
        dueDate: bill.dueDate,
        description: bill.description
      });
    } else {
      setEditingBill(null);
      setFormData({
        patientName: '',
        patientId: '',
        serviceType: '',
        amount: '',
        insuranceProvider: '',
        insuranceNumber: '',
        dueDate: '',
        description: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBill(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingBill) {
        // Update bill
        const updatedBills = bills.map(bill =>
          bill.id === editingBill.id
            ? { ...bill, ...formData, amount: parseFloat(formData.amount) }
            : bill
        );
        setBills(updatedBills);
      } else {
        // Create new bill
        const newBill = {
          id: Date.now(),
          ...formData,
          amount: parseFloat(formData.amount),
          status: 'pending'
        };
        setBills([...bills, newBill]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save bill:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setBills(bills.filter(bill => bill.id !== id));
    } catch (error) {
      console.error('Failed to delete bill:', error);
    }
  };

  const handlePayment = async (id) => {
    try {
      const updatedBills = bills.map(bill =>
        bill.id === id
          ? { ...bill, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
          : bill
      );
      setBills(updatedBills);
    } catch (error) {
      console.error('Failed to process payment:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || bill.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = bills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = bills.filter(bill => bill.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0);
  const overdueAmount = bills.filter(bill => bill.status === 'overdue').reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Billing Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage patient billing, insurance, and payments
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Billing
                  </Typography>
                  <Typography variant="h4" component="div">
                    ${totalAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Receipt />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Paid Amount
                  </Typography>
                  <Typography variant="h4" component="div" color="success.main">
                    ${paidAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <Payment />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Pending Amount
                  </Typography>
                  <Typography variant="h4" component="div" color="warning.main">
                    ${pendingAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <TrendingUp />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Overdue Amount
                  </Typography>
                  <Typography variant="h4" component="div" color="error.main">
                    ${overdueAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <TrendingDown />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search bills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search />
          }}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="overdue">Overdue</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          New Bill
        </Button>
      </Box>

      {/* Bills Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Service</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Insurance</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {bill.patientName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {bill.patientId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {bill.serviceType}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {bill.description}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        ${bill.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {bill.insuranceProvider}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {bill.insuranceNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(bill.dueDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={bill.status}
                        color={getStatusColor(bill.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {bill.status !== 'paid' && (
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handlePayment(bill.id)}
                          >
                            <Payment />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(bill)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(bill.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Bill Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBill ? 'Edit Bill' : 'New Bill'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Patient Name"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Patient ID"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select
                  value={formData.serviceType}
                  label="Service Type"
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                >
                  <MenuItem value="Consultation">Consultation</MenuItem>
                  <MenuItem value="Laboratory Test">Laboratory Test</MenuItem>
                  <MenuItem value="X-Ray">X-Ray</MenuItem>
                  <MenuItem value="Surgery">Surgery</MenuItem>
                  <MenuItem value="Medication">Medication</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                InputProps={{
                  startAdornment: <AttachMoney />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Insurance Provider"
                value={formData.insuranceProvider}
                onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Insurance Number"
                value={formData.insuranceNumber}
                onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingBill ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => handleOpenDialog()}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default Billing; 