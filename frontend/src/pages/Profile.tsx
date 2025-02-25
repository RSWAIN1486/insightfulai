import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Button,
  Avatar,
  Grid,
  Alert,
  Snackbar,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
  Lock as LockIcon,
  History as HistoryIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  
  // Sample user data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Inc.',
    position: 'Market Research Analyst',
    bio: 'Experienced market research professional with a passion for data-driven insights and strategic planning.',
    location: 'New York, NY',
    joinDate: 'January 15, 2023',
    lastLogin: 'May 20, 2023, 10:45 AM',
    timezone: 'Eastern Time (ET)',
    interests: ['Market Analysis', 'Competitive Intelligence', 'Consumer Behavior', 'Data Visualization'],
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to the backend here
    setEditMode(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                }}
              >
                {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
              </Avatar>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{ position: 'relative', top: -30, right: -40 }}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCameraIcon />
              </IconButton>
              <Typography variant="h5" gutterBottom>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {userData.position}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {userData.company}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {userData.location}
              </Typography>
              <Divider sx={{ width: '100%', my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Member since: {userData.joinDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last login: {userData.lastLogin}
              </Typography>
              <Box sx={{ mt: 2 }}>
                {userData.interests.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    size="small"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
                <Tab icon={<EditIcon />} iconPosition="start" label="Personal Info" />
                <Tab icon={<LockIcon />} iconPosition="start" label="Security" />
                <Tab icon={<HistoryIcon />} iconPosition="start" label="Activity" />
                <Tab icon={<NotificationsIcon />} iconPosition="start" label="Notifications" />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                {editMode ? (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleEditToggle}
                      sx={{ mr: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveProfile}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEditToggle}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company"
                    name="company"
                    value={userData.company}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Position"
                    name="position"
                    value={userData.position}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Timezone"
                    name="timezone"
                    value={userData.timezone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    disabled={!editMode}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <Typography paragraph>
                Manage your password and security settings here.
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Security settings are under development. Check back soon!
                  </Typography>
                </CardContent>
              </Card>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Activity History
              </Typography>
              <Typography paragraph>
                View your recent activity and login history.
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Activity history is under development. Check back soon!
                  </Typography>
                </CardContent>
              </Card>
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom>
                Notification Preferences
              </Typography>
              <Typography paragraph>
                Manage your notification settings here.
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Notification preferences are under development. Check back soon!
                  </Typography>
                </CardContent>
              </Card>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 