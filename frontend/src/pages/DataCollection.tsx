import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormHelperText,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Language as WebIcon, 
  Twitter as TwitterIcon, 
  Newspaper as NewsIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';

// Interface for tab panel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Tab Panel component
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`data-collection-tabpanel-${index}`}
      aria-labelledby={`data-collection-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Data Collection page component
const DataCollection: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  
  // State for web scraping form
  const [webUrl, setWebUrl] = useState('');
  const [selectors, setSelectors] = useState<string[]>(['']);
  const [webLoading, setWebLoading] = useState(false);
  const [webError, setWebError] = useState<string | null>(null);
  const [webSuccess, setWebSuccess] = useState(false);
  
  // State for social media form
  const [socialPlatform, setSocialPlatform] = useState('twitter');
  const [socialQuery, setSocialQuery] = useState('');
  const [socialLimit, setSocialLimit] = useState(100);
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialError, setSocialError] = useState<string | null>(null);
  const [socialSuccess, setSocialSuccess] = useState(false);
  
  // State for news form
  const [newsQuery, setNewsQuery] = useState('');
  const [newsSources, setNewsSources] = useState<string[]>([]);
  const [newsDateFrom, setNewsDateFrom] = useState('');
  const [newsDateTo, setNewsDateTo] = useState('');
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [newsSuccess, setNewsSuccess] = useState(false);
  
  // Available news sources
  const availableNewsSources = [
    'The New York Times',
    'The Washington Post',
    'BBC News',
    'CNN',
    'Reuters',
    'Bloomberg',
    'TechCrunch',
    'Wired',
    'Forbes',
    'The Wall Street Journal',
  ];
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  // Handle adding a new selector field
  const handleAddSelector = () => {
    setSelectors([...selectors, '']);
  };
  
  // Handle removing a selector field
  const handleRemoveSelector = (index: number) => {
    const newSelectors = [...selectors];
    newSelectors.splice(index, 1);
    setSelectors(newSelectors);
  };
  
  // Handle selector change
  const handleSelectorChange = (index: number, value: string) => {
    const newSelectors = [...selectors];
    newSelectors[index] = value;
    setSelectors(newSelectors);
  };
  
  // Handle web scraping form submission
  const handleWebSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!webUrl) {
      setWebError('Please enter a URL');
      return;
    }
    
    // Filter out empty selectors
    const filteredSelectors = selectors.filter(selector => selector.trim() !== '');
    
    try {
      setWebLoading(true);
      setWebError(null);
      
      // Call API to initiate web scraping
      await axios.post('/api/v1/data/web-scrape', {
        url: webUrl,
        selectors: filteredSelectors.length > 0 ? filteredSelectors : undefined,
      });
      
      setWebSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setWebSuccess(false);
      }, 3000);
    } catch (err: any) {
      setWebError(err.response?.data?.message || 'Failed to initiate web scraping');
    } finally {
      setWebLoading(false);
    }
  };
  
  // Handle social media form submission
  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!socialQuery) {
      setSocialError('Please enter a search query');
      return;
    }
    
    try {
      setSocialLoading(true);
      setSocialError(null);
      
      // Call API to initiate social media data collection
      await axios.post('/api/v1/data/social-media', null, {
        params: {
          platform: socialPlatform,
          query: socialQuery,
          limit: socialLimit,
        },
      });
      
      setSocialSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSocialSuccess(false);
      }, 3000);
    } catch (err: any) {
      setSocialError(err.response?.data?.message || 'Failed to initiate social media data collection');
    } finally {
      setSocialLoading(false);
    }
  };
  
  // Handle news form submission
  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newsQuery) {
      setNewsError('Please enter a search query');
      return;
    }
    
    try {
      setNewsLoading(true);
      setNewsError(null);
      
      // Call API to initiate news data collection
      await axios.post('/api/v1/data/news', null, {
        params: {
          query: newsQuery,
          sources: newsSources.length > 0 ? newsSources : undefined,
          date_from: newsDateFrom || undefined,
          date_to: newsDateTo || undefined,
        },
      });
      
      setNewsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setNewsSuccess(false);
      }, 3000);
    } catch (err: any) {
      setNewsError(err.response?.data?.message || 'Failed to initiate news data collection');
    } finally {
      setNewsLoading(false);
    }
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Collection
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Collect data from various sources to analyze market trends, competitor activities, and customer sentiment.
      </Typography>
      
      <Paper sx={{ mt: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<WebIcon />} label="Web Scraping" />
          <Tab icon={<TwitterIcon />} label="Social Media" />
          <Tab icon={<NewsIcon />} label="News & Publications" />
        </Tabs>
        
        {/* Web Scraping Tab */}
        <TabPanel value={activeTab} index={0}>
          <form onSubmit={handleWebSubmit}>
            {webError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {webError}
              </Alert>
            )}
            
            {webSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Web scraping task initiated successfully!
              </Alert>
            )}
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website URL"
                  variant="outlined"
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  CSS Selectors (Optional)
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Specify CSS selectors to target specific elements on the page.
                </Typography>
                
                {selectors.map((selector, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      fullWidth
                      label={`Selector ${index + 1}`}
                      variant="outlined"
                      value={selector}
                      onChange={(e) => handleSelectorChange(index, e.target.value)}
                      placeholder=".article-content, #main-content, etc."
                    />
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveSelector(index)}
                      disabled={selectors.length === 1}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddSelector}
                  sx={{ mt: 1 }}
                >
                  Add Selector
                </Button>
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={webLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
                  disabled={webLoading}
                >
                  {webLoading ? 'Processing...' : 'Start Web Scraping'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        
        {/* Social Media Tab */}
        <TabPanel value={activeTab} index={1}>
          <form onSubmit={handleSocialSubmit}>
            {socialError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {socialError}
              </Alert>
            )}
            
            {socialSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Social media data collection task initiated successfully!
              </Alert>
            )}
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Platform</InputLabel>
                  <Select
                    value={socialPlatform}
                    onChange={(e) => setSocialPlatform(e.target.value)}
                    label="Platform"
                  >
                    <MenuItem value="twitter">Twitter</MenuItem>
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                    <MenuItem value="reddit">Reddit</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Limit"
                  variant="outlined"
                  type="number"
                  value={socialLimit}
                  onChange={(e) => setSocialLimit(parseInt(e.target.value))}
                  InputProps={{ inputProps: { min: 1, max: 1000 } }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Search Query or Hashtag"
                  variant="outlined"
                  value={socialQuery}
                  onChange={(e) => setSocialQuery(e.target.value)}
                  placeholder="product name, #hashtag, @username, etc."
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={socialLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
                  disabled={socialLoading}
                >
                  {socialLoading ? 'Processing...' : 'Collect Social Media Data'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        
        {/* News Tab */}
        <TabPanel value={activeTab} index={2}>
          <form onSubmit={handleNewsSubmit}>
            {newsError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {newsError}
              </Alert>
            )}
            
            {newsSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                News data collection task initiated successfully!
              </Alert>
            )}
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Search Query"
                  variant="outlined"
                  value={newsQuery}
                  onChange={(e) => setNewsQuery(e.target.value)}
                  placeholder="market trends, product launch, industry news, etc."
                  required
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>News Sources</InputLabel>
                  <Select
                    multiple
                    value={newsSources}
                    onChange={(e) => setNewsSources(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    input={<OutlinedInput label="News Sources" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {availableNewsSources.map((source) => (
                      <MenuItem key={source} value={source}>
                        <Checkbox checked={newsSources.indexOf(source) > -1} />
                        <ListItemText primary={source} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select specific news sources (optional)</FormHelperText>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="From Date"
                  variant="outlined"
                  type="date"
                  value={newsDateFrom}
                  onChange={(e) => setNewsDateFrom(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="To Date"
                  variant="outlined"
                  type="date"
                  value={newsDateTo}
                  onChange={(e) => setNewsDateTo(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={newsLoading ? <CircularProgress size={24} color="inherit" /> : <SearchIcon />}
                  disabled={newsLoading}
                >
                  {newsLoading ? 'Processing...' : 'Collect News Data'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
      </Paper>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Collection Jobs
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Web Scraping"
                subheader="Completed 2 hours ago"
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <strong>URL:</strong> https://example.com/products
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Selectors:</strong> .product-item, .price
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Results:</strong> 42 items collected
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Twitter Data"
                subheader="Completed 1 day ago"
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <strong>Query:</strong> #artificialintelligence
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Limit:</strong> 100 tweets
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Results:</strong> 100 tweets collected
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="News Articles"
                subheader="In Progress"
              />
              <Divider />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <strong>Query:</strong> market trends 2023
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Sources:</strong> The New York Times, TechCrunch
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Status:</strong> <Chip size="small" label="Running" color="primary" />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DataCollection; 