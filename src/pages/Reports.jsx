import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  TrendingDown,
  People,
  Event,
  Receipt,
  Download,
  Print,
  Email,
  FilterList,
  CalendarToday,
  AttachMoney,
  LocalHospital,
  Schedule
} from '@mui/icons-material';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState('appointments');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [reportData, setReportData] = useState({
    appointments: {
      total: 156,
      confirmed: 134,
      pending: 22,
      cancelled: 8,
      revenue: 23450.00
    },
    patients: {
      total: 89,
      new: 23,
      returning: 66,
      active: 78
    },
    billing: {
      total: 45600.00,
      paid: 38900.00,
      pending: 6700.00,
      overdue: 1200.00
    },
    departments: [
      { name: 'Cardiology', appointments: 45, revenue: 8900.00 },
      { name: 'Dermatology', appointments: 32, revenue: 6400.00 },
      { name: 'Orthopedics', appointments: 28, revenue: 5600.00 },
      { name: 'Neurology', appointments: 25, revenue: 5000.00 },
      { name: 'General', appointments: 26, revenue: 5200.00 }
    ]
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      // Simulate API call
      const mockReports = [
        {
          id: 1,
          type: 'appointments',
          title: 'Monthly Appointment Report',
          description: 'Comprehensive analysis of appointment trends',
          generatedDate: '2024-01-15',
          status: 'completed'
        },
        {
          id: 2,
          type: 'billing',
          title: 'Revenue Analysis Report',
          description: 'Financial performance and billing insights',
          generatedDate: '2024-01-14',
          status: 'completed'
        },
        {
          id: 3,
          type: 'patients',
          title: 'Patient Demographics Report',
          description: 'Patient statistics and demographics',
          generatedDate: '2024-01-13',
          status: 'completed'
        }
      ];
      setReports(mockReports);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleExport = (format) => {
    // Simulate export functionality
    console.log(`Exporting ${selectedReport} report in ${format} format`);
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'appointments':
        return <Event />;
      case 'billing':
        return <Receipt />;
      case 'patients':
        return <People />;
      default:
        return <Assessment />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generate and view comprehensive reports and analytics
        </Typography>
      </Box>

      {/* Report Controls */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={selectedReport}
                  label="Report Type"
                  onChange={(e) => setSelectedReport(e.target.value)}
                >
                  <MenuItem value="appointments">Appointments Report</MenuItem>
                  <MenuItem value="billing">Billing Report</MenuItem>
                  <MenuItem value="patients">Patient Report</MenuItem>
                  <MenuItem value="departments">Department Report</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="week">Last Week</MenuItem>
                  <MenuItem value="month">Last Month</MenuItem>
                  <MenuItem value="quarter">Last Quarter</MenuItem>
                  <MenuItem value="year">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Assessment />}
                  onClick={handleGenerateReport}
                  fullWidth
                >
                  Generate Report
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Statistics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Appointments
                  </Typography>
                  <Typography variant="h4" component="div">
                    {reportData.appointments.total}
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    +12% from last month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Event />
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
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" component="div">
                    ${reportData.billing.total.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    +8% from last month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <AttachMoney />
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
                    Active Patients
                  </Typography>
                  <Typography variant="h4" component="div">
                    {reportData.patients.active}
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    +5% from last month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <People />
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
                    Pending Payments
                  </Typography>
                  <Typography variant="h4" component="div" color="warning.main">
                    ${reportData.billing.pending.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="error.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />
                    +3% from last month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Receipt />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Department Performance */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Department Performance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>Appointments</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.departments.map((dept) => (
                  <TableRow key={dept.name}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          <LocalHospital />
                        </Avatar>
                        <Typography variant="body2" fontWeight="500">
                          {dept.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {dept.appointments}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        ${dept.revenue.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={(dept.revenue / Math.max(...reportData.departments.map(d => d.revenue))) * 100}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Recent Reports
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => handleExport('pdf')}>
                    <Download />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleExport('excel')}>
                    <Print />
                  </IconButton>
                </Box>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Report</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Generated</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="500">
                              {report.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {report.description}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getReportIcon(report.type)}
                            <Typography variant="body2">
                              {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(report.generatedDate).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={report.status}
                            color={getStatusColor(report.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton size="small">
                              <Download />
                            </IconButton>
                            <IconButton size="small">
                              <Email />
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
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <List>
                <ListItem button onClick={() => setSelectedReport('appointments')}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <Event />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Appointments Report"
                    secondary="View appointment analytics"
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem button onClick={() => setSelectedReport('billing')}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <Receipt />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Billing Report"
                    secondary="Financial performance analysis"
                  />
                </ListItem>
                
                <Divider />
                
                <ListItem button onClick={() => setSelectedReport('patients')}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.main' }}>
                      <People />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Patient Report"
                    secondary="Patient demographics and trends"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Generate Report Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          Generate New Report
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={selectedReport}
                  label="Report Type"
                  onChange={(e) => setSelectedReport(e.target.value)}
                >
                  <MenuItem value="appointments">Appointments Report</MenuItem>
                  <MenuItem value="billing">Billing Report</MenuItem>
                  <MenuItem value="patients">Patient Report</MenuItem>
                  <MenuItem value="departments">Department Report</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="week">Last Week</MenuItem>
                  <MenuItem value="month">Last Month</MenuItem>
                  <MenuItem value="quarter">Last Quarter</MenuItem>
                  <MenuItem value="year">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCloseDialog} variant="contained">
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports; 