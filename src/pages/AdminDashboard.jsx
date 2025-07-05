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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  LinearProgress
} from '@mui/material';
import {
  AdminPanelSettings,
  People,
  Settings,
  Analytics,
  Security,
  Notifications,
  Edit,
  Delete,
  Block,
  CheckCircle,
  Warning,
  Error,
  TrendingUp,
  TrendingDown,
  Storage,
  Api,
  Key,
  Refresh
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    userType: 'patient',
    status: 'active'
  });

  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    systemHealth: 'healthy',
    apiCalls: 0,
    errors: 0
  });

  useEffect(() => {
    loadUsers();
    loadSystemStats();
  }, []);

  const loadUsers = async () => {
    try {
      // Simulate API call
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          phoneNumber: '+1234567890',
          email: 'john@example.com',
          userType: 'patient',
          status: 'active',
          lastLogin: '2024-01-15T10:30:00Z',
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: 2,
          name: 'Jane Smith',
          phoneNumber: '+1234567891',
          email: 'jane@example.com',
          userType: 'admin',
          status: 'active',
          lastLogin: '2024-01-15T09:15:00Z',
          createdAt: '2024-01-02T00:00:00Z'
        },
        {
          id: 3,
          name: 'Bob Wilson',
          phoneNumber: '+1234567892',
          email: 'bob@example.com',
          userType: 'patient',
          status: 'inactive',
          lastLogin: '2024-01-10T14:20:00Z',
          createdAt: '2024-01-03T00:00:00Z'
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSystemStats = async () => {
    try {
      // Simulate API call
      setSystemStats({
        totalUsers: 89,
        activeUsers: 78,
        totalAppointments: 156,
        totalRevenue: 45600.00,
        systemHealth: 'healthy',
        apiCalls: 1247,
        errors: 3
      });
    } catch (error) {
      console.error('Failed to load system stats:', error);
    }
  };

  const handleOpenUserDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        userType: user.userType,
        status: user.status
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        userType: 'patient',
        status: 'active'
      });
    }
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setEditingUser(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        // Update user
        const updatedUsers = users.map(user =>
          user.id === editingUser.id
            ? { ...user, ...formData }
            : user
        );
        setUsers(updatedUsers);
      } else {
        // Create new user
        const newUser = {
          id: Date.now(),
          ...formData,
          lastLogin: null,
          createdAt: new Date().toISOString()
        };
        setUsers([...users, newUser]);
      }
      handleCloseUserDialog();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleToggleUserStatus = async (id) => {
    try {
      const updatedUsers = users.map(user =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'admin':
        return 'error';
      case 'patient':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getSystemHealthColor = (health) => {
    switch (health) {
      case 'healthy':
        return 'success';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNumber.includes(searchTerm)
  );

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ paddingTop: 20 }}>
      {value === index && children}
    </div>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users, system settings, and monitor performance
        </Typography>
      </Box>

      {/* System Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Users
                  </Typography>
                  <Typography variant="h4" component="div">
                    {systemStats.totalUsers}
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    +5% this month
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
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
                    Active Users
                  </Typography>
                  <Typography variant="h4" component="div" color="success.main">
                    {systemStats.activeUsers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {((systemStats.activeUsers / systemStats.totalUsers) * 100).toFixed(1)}% active rate
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
                    System Health
                  </Typography>
                  <Typography variant="h4" component="div" color={`${getSystemHealthColor(systemStats.systemHealth)}.main`}>
                    {systemStats.systemHealth}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {systemStats.errors} errors today
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: `${getSystemHealthColor(systemStats.systemHealth)}.main` }}>
                  <Warning />
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
                    API Calls
                  </Typography>
                  <Typography variant="h4" component="div">
                    {systemStats.apiCalls}
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    +12% today
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Api />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="User Management" icon={<People />} />
            <Tab label="System Settings" icon={<Settings />} />
            <Tab label="Analytics" icon={<Analytics />} />
          </Tabs>

          {/* User Management Tab */}
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                <TextField
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  startIcon={<People />}
                  onClick={() => handleOpenUserDialog()}
                >
                  Add User
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Login</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar>{user.name.charAt(0)}</Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="500">
                                {user.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.userType}
                            color={getUserTypeColor(user.userType)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            color={getStatusColor(user.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenUserDialog(user)}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              color={user.status === 'active' ? 'warning' : 'success'}
                              onClick={() => handleToggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? <Block /> : <CheckCircle />}
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteUser(user.id)}
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
            </Box>
          </TabPanel>

          {/* System Settings Tab */}
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        API Configuration
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              <Key />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="OpenAI API Key"
                            secondary="Configure OpenAI integration"
                          />
                          <Button variant="outlined" size="small">
                            Configure
                          </Button>
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'success.main' }}>
                              <Api />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Groq API Key"
                            secondary="Configure Groq LLM integration"
                          />
                          <Button variant="outlined" size="small">
                            Configure
                          </Button>
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'warning.main' }}>
                              <Storage />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="LiveKit Configuration"
                            secondary="Voice communication settings"
                          />
                          <Button variant="outlined" size="small">
                            Configure
                          </Button>
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        System Preferences
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText
                            primary="Enable Voice Agent"
                            secondary="Allow voice interactions"
                          />
                          <Switch defaultChecked />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Auto-generate Reports"
                            secondary="Automatically generate daily reports"
                          />
                          <Switch defaultChecked />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Email Notifications"
                            secondary="Send email notifications to admins"
                          />
                          <Switch />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Debug Mode"
                            secondary="Enable detailed logging"
                          />
                          <Switch />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          {/* Analytics Tab */}
          <TabPanel value={activeTab} index={2}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        System Performance
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          CPU Usage
                        </Typography>
                        <LinearProgress variant="determinate" value={65} sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                          65% - Normal
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Memory Usage
                        </Typography>
                        <LinearProgress variant="determinate" value={45} sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                          45% - Good
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" gutterBottom>
                          Storage Usage
                        </Typography>
                        <LinearProgress variant="determinate" value={78} sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary">
                          78% - Warning
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Recent Activity
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'success.main' }}>
                              <CheckCircle />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="System backup completed"
                            secondary="2 hours ago"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'info.main' }}>
                              <People />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="New user registered"
                            secondary="3 hours ago"
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'warning.main' }}>
                              <Warning />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="High API usage detected"
                            secondary="5 hours ago"
                          />
                        </ListItem>
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>

      {/* User Dialog */}
      <Dialog open={openUserDialog} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>User Type</InputLabel>
                <Select
                  value={formData.userType}
                  label="User Type"
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                >
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard; 