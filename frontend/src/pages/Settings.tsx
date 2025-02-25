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
  Switch,
  FormControlLabel,
  Grid,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Paper,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  Payments as PaymentsIcon,
  Backup as BackupIcon,
  AccountCircle as AccountCircleIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('notifications');
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    competitorUpdates: true,
    marketTrends: false,
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginNotifications: true,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSecurityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecuritySettings({
      ...securitySettings,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSaveSettings = () => {
    // In a real app, you would save settings to the backend here
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'notifications':
        return (
          <Card>
            <CardHeader title="Notification Preferences" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.emailAlerts}
                        onChange={handleNotificationChange}
                        name="emailAlerts"
                        color="primary"
                      />
                    }
                    label="Email Alerts"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Receive important alerts and updates via email
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onChange={handleNotificationChange}
                        name="pushNotifications"
                        color="primary"
                      />
                    }
                    label="Push Notifications"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Receive notifications in your browser
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onChange={handleNotificationChange}
                        name="weeklyReports"
                        color="primary"
                      />
                    }
                    label="Weekly Reports"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Receive a weekly summary of your market research data
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.competitorUpdates}
                        onChange={handleNotificationChange}
                        name="competitorUpdates"
                        color="primary"
                      />
                    }
                    label="Competitor Updates"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Get notified when there are significant changes with your competitors
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.marketTrends}
                        onChange={handleNotificationChange}
                        name="marketTrends"
                        color="primary"
                      />
                    }
                    label="Market Trends"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Receive alerts about emerging market trends in your industry
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      case 'security':
        return (
          <Card>
            <CardHeader title="Security Settings" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onChange={handleSecurityChange}
                        name="twoFactorAuth"
                        color="primary"
                      />
                    }
                    label="Two-Factor Authentication"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Add an extra layer of security to your account
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Session Timeout (minutes)"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    type="number"
                    fullWidth
                    margin="normal"
                    helperText="Time before you're automatically logged out due to inactivity"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.loginNotifications}
                        onChange={handleSecurityChange}
                        name="loginNotifications"
                        color="primary"
                      />
                    }
                    label="Login Notifications"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Receive email notifications when your account is accessed from a new device
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card>
            <CardContent>
              <Typography variant="body1">
                This section is under development. Please check back soon!
              </Typography>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2}>
            <List component="nav" aria-label="settings navigation">
              <ListItemButton
                selected={activeSection === 'notifications'}
                onClick={() => setActiveSection('notifications')}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItemButton>
              <ListItemButton
                selected={activeSection === 'security'}
                onClick={() => setActiveSection('security')}
              >
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItemButton>
              <ListItemButton
                selected={activeSection === 'appearance'}
                onClick={() => setActiveSection('appearance')}
              >
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText primary="Appearance" />
              </ListItemButton>
              <ListItemButton
                selected={activeSection === 'language'}
                onClick={() => setActiveSection('language')}
              >
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Language & Region" />
              </ListItemButton>
              <ListItemButton
                selected={activeSection === 'data'}
                onClick={() => setActiveSection('data')}
              >
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary="Data Management" />
              </ListItemButton>
              <ListItemButton
                selected={activeSection === 'billing'}
                onClick={() => setActiveSection('billing')}
              >
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary="Billing & Subscription" />
              </ListItemButton>
              <ListItemButton
                selected={activeSection === 'backup'}
                onClick={() => setActiveSection('backup')}
              >
                <ListItemIcon>
                  <BackupIcon />
                </ListItemIcon>
                <ListItemText primary="Backup & Restore" />
              </ListItemButton>
              <ListItemButton
                selected={activeSection === 'account'}
                onClick={() => setActiveSection('account')}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          {renderSettingsContent()}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </Box>
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

export default Settings; 