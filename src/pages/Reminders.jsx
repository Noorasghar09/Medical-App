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
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Notifications,
  Schedule,
  Email,
  Sms,
  Phone,
  CheckCircle,
  Warning,
  Error,
  Search,
  FilterList,
  VolumeUp,
  VolumeOff
} from '@mui/icons-material';

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    reminderType: '',
    message: '',
    scheduledDate: '',
    scheduledTime: '',
    notificationMethod: [],
    status: 'pending'
  });

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      // Simulate API call
      const mockReminders = [
        {
          id: 1,
          patientName: 'John Doe',
          patientPhone: '+1234567890',
          reminderType: 'appointment',
          message: 'Reminder: You have an appointment with Dr. Smith tomorrow at 10:00 AM',
          scheduledDate: '2024-01-16',
          scheduledTime: '09:00',
          notificationMethod: ['sms', 'email'],
          status: 'pending'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          patientPhone: '+1234567891',
          reminderType: 'medication',
          message: 'Reminder: Take your medication - Blood pressure pills',
          scheduledDate: '2024-01-15',
          scheduledTime: '08:00',
          notificationMethod: ['sms'],
          status: 'sent'
        },
        {
          id: 3,
          patientName: 'Bob Wilson',
          patientPhone: '+1234567892',
          reminderType: 'followup',
          message: 'Reminder: Follow-up appointment with Dr. Johnson next week',
          scheduledDate: '2024-01-20',
          scheduledTime: '14:00',
          notificationMethod: ['email', 'phone'],
          status: 'pending'
        }
      ];
      setReminders(mockReminders);
    } catch (error) {
      console.error('Failed to load reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (reminder = null) => {
    if (reminder) {
      setEditingReminder(reminder);
      setFormData({
        patientName: reminder.patientName,
        patientPhone: reminder.patientPhone,
        reminderType: reminder.reminderType,
        message: reminder.message,
        scheduledDate: reminder.scheduledDate,
        scheduledTime: reminder.scheduledTime,
        notificationMethod: reminder.notificationMethod,
        status: reminder.status
      });
    } else {
      setEditingReminder(null);
      setFormData({
        patientName: '',
        patientPhone: '',
        reminderType: '',
        message: '',
        scheduledDate: '',
        scheduledTime: '',
        notificationMethod: [],
        status: 'pending'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingReminder(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingReminder) {
        // Update reminder
        const updatedReminders = reminders.map(reminder =>
          reminder.id === editingReminder.id
            ? { ...reminder, ...formData }
            : reminder
        );
        setReminders(updatedReminders);
      } else {
        // Create new reminder
        const newReminder = {
          id: Date.now(),
          ...formData
        };
        setReminders([...reminders, newReminder]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save reminder:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setReminders(reminders.filter(reminder => reminder.id !== id));
    } catch (error) {
      console.error('Failed to delete reminder:', error);
    }
  };

  const handleNotificationMethodChange = (method) => {
    const updatedMethods = formData.notificationMethod.includes(method)
      ? formData.notificationMethod.filter(m => m !== method)
      : [...formData.notificationMethod, method];
    
    setFormData({ ...formData, notificationMethod: updatedMethods });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'appointment':
        return 'primary';
      case 'medication':
        return 'warning';
      case 'followup':
        return 'info';
      default:
        return 'default';
    }
  };

  const getNotificationIcon = (method) => {
    switch (method) {
      case 'sms':
        return <Sms />;
      case 'email':
        return <Email />;
      case 'phone':
        return <Phone />;
      default:
        return <Notifications />;
    }
  };

  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = 
      reminder.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || reminder.reminderType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const pendingCount = reminders.filter(r => r.status === 'pending').length;
  const sentCount = reminders.filter(r => r.status === 'sent').length;
  const failedCount = reminders.filter(r => r.status === 'failed').length;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Reminders Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage automated reminders and notifications for patients
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
                    Total Reminders
                  </Typography>
                  <Typography variant="h4" component="div">
                    {reminders.length}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <Notifications />
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
                    Pending
                  </Typography>
                  <Typography variant="h4" component="div" color="warning.main">
                    {pendingCount}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Schedule />
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
                    Sent
                  </Typography>
                  <Typography variant="h4" component="div" color="success.main">
                    {sentCount}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <CheckCircle />
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
                    Failed
                  </Typography>
                  <Typography variant="h4" component="div" color="error.main">
                    {failedCount}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <Error />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search reminders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search />
          }}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filterType}
            label="Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="appointment">Appointment</MenuItem>
            <MenuItem value="medication">Medication</MenuItem>
            <MenuItem value="followup">Follow-up</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          New Reminder
        </Button>
      </Box>

      {/* Reminders Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Scheduled</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReminders.map((reminder) => (
                  <TableRow key={reminder.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {reminder.patientName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reminder.patientPhone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={reminder.reminderType}
                        color={getTypeColor(reminder.reminderType)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300 }}>
                        {reminder.message}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {new Date(reminder.scheduledDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reminder.scheduledTime}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {reminder.notificationMethod.map((method) => (
                          <Avatar key={method} sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                            {getNotificationIcon(method)}
                          </Avatar>
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={reminder.status}
                        color={getStatusColor(reminder.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(reminder)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(reminder.id)}
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

      {/* Reminder Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingReminder ? 'Edit Reminder' : 'New Reminder'}
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
                label="Patient Phone"
                value={formData.patientPhone}
                onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Reminder Type</InputLabel>
                <Select
                  value={formData.reminderType}
                  label="Reminder Type"
                  onChange={(e) => setFormData({ ...formData, reminderType: e.target.value })}
                >
                  <MenuItem value="appointment">Appointment</MenuItem>
                  <MenuItem value="medication">Medication</MenuItem>
                  <MenuItem value="followup">Follow-up</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Scheduled Date"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Scheduled Time"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Notification Methods
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notificationMethod.includes('sms')}
                      onChange={() => handleNotificationMethodChange('sms')}
                    />
                  }
                  label="SMS"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notificationMethod.includes('email')}
                      onChange={() => handleNotificationMethodChange('email')}
                    />
                  }
                  label="Email"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.notificationMethod.includes('phone')}
                      onChange={() => handleNotificationMethodChange('phone')}
                    />
                  }
                  label="Phone Call"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Enter the reminder message..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingReminder ? 'Update' : 'Create'}
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

export default Reminders; 