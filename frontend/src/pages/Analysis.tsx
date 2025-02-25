import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  BubbleChart as BubbleChartIcon,
  Insights as InsightsIcon,
  Lightbulb as LightbulbIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
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
      id={`analysis-tabpanel-${index}`}
      aria-labelledby={`analysis-tab-${index}`}
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

// Analysis page component
const Analysis: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);
  
  // State for sentiment analysis form
  const [sentimentText, setSentimentText] = useState('');
  const [sentimentLoading, setSentimentLoading] = useState(false);
  const [sentimentError, setSentimentError] = useState<string | null>(null);
  const [sentimentResult, setSentimentResult] = useState<any>(null);
  
  // State for batch sentiment analysis form
  const [batchDataSource, setBatchDataSource] = useState('twitter');
  const [batchQuery, setBatchQuery] = useState('');
  const [batchDateFrom, setBatchDateFrom] = useState('');
  const [batchDateTo, setBatchDateTo] = useState('');
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [batchResult, setBatchResult] = useState<any>(null);
  
  // State for trend analysis form
  const [trendDataSource, setTrendDataSource] = useState('twitter');
  const [trendTimeframe, setTrendTimeframe] = useState('week');
  const [trendTopic, setTrendTopic] = useState('');
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendError, setTrendError] = useState<string | null>(null);
  const [trendResult, setTrendResult] = useState<any>(null);
  
  // State for entity extraction form
  const [entityDataSource, setEntityDataSource] = useState('news');
  const [entityTypes, setEntityTypes] = useState<string[]>(['PERSON', 'ORG', 'PRODUCT']);
  const [entityLimit, setEntityLimit] = useState(20);
  const [entityLoading, setEntityLoading] = useState(false);
  const [entityError, setEntityError] = useState<string | null>(null);
  const [entityResult, setEntityResult] = useState<any>(null);
  
  // Available entity types
  const availableEntityTypes = [
    { value: 'PERSON', label: 'Person', icon: <PersonIcon /> },
    { value: 'ORG', label: 'Organization', icon: <BusinessIcon /> },
    { value: 'PRODUCT', label: 'Product', icon: <CategoryIcon /> },
    { value: 'LOC', label: 'Location', icon: null },
    { value: 'EVENT', label: 'Event', icon: null },
    { value: 'DATE', label: 'Date', icon: null },
  ];
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  // Handle sentiment analysis form submission
  const handleSentimentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!sentimentText) {
      setSentimentError('Please enter text to analyze');
      return;
    }
    
    try {
      setSentimentLoading(true);
      setSentimentError(null);
      
      // Call API to analyze sentiment
      const response = await axios.post('/api/v1/analysis/sentiment', null, {
        params: { text: sentimentText }
      });
      
      setSentimentResult(response.data);
    } catch (err: any) {
      setSentimentError(err.response?.data?.message || 'Failed to analyze sentiment');
    } finally {
      setSentimentLoading(false);
    }
  };
  
  // Handle batch sentiment analysis form submission
  const handleBatchSentimentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setBatchLoading(true);
      setBatchError(null);
      
      // Call API to analyze batch sentiment
      const response = await axios.post('/api/v1/analysis/batch-sentiment', null, {
        params: {
          data_source: batchDataSource,
          query: batchQuery || undefined,
          date_from: batchDateFrom || undefined,
          date_to: batchDateTo || undefined,
        }
      });
      
      setBatchResult(response.data);
    } catch (err: any) {
      setBatchError(err.response?.data?.message || 'Failed to analyze batch sentiment');
    } finally {
      setBatchLoading(false);
    }
  };
  
  // Handle trend analysis form submission
  const handleTrendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setTrendLoading(true);
      setTrendError(null);
      
      // Call API to detect trends
      const response = await axios.get('/api/v1/analysis/trends', {
        params: {
          data_source: trendDataSource,
          timeframe: trendTimeframe,
          topic: trendTopic || undefined,
        }
      });
      
      setTrendResult(response.data);
    } catch (err: any) {
      setTrendError(err.response?.data?.message || 'Failed to detect trends');
    } finally {
      setTrendLoading(false);
    }
  };
  
  // Handle entity extraction form submission
  const handleEntitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setEntityLoading(true);
      setEntityError(null);
      
      // Call API to extract entities
      const response = await axios.get('/api/v1/analysis/entities', {
        params: {
          data_source: entityDataSource,
          entity_types: entityTypes,
          limit: entityLimit,
        }
      });
      
      setEntityResult(response.data);
    } catch (err: any) {
      setEntityError(err.response?.data?.message || 'Failed to extract entities');
    } finally {
      setEntityLoading(false);
    }
  };
  
  // Render sentiment score with appropriate color
  const renderSentimentScore = (score: number) => {
    let color = 'primary';
    let icon = <TrendingFlatIcon />;
    
    if (score > 0.2) {
      color = 'success';
      icon = <TrendingUpIcon />;
    } else if (score < -0.2) {
      color = 'error';
      icon = <TrendingDownIcon />;
    }
    
    return (
      <Chip
        icon={icon}
        label={`Score: ${score.toFixed(2)}`}
        color={color as any}
        variant="outlined"
      />
    );
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Analysis
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Analyze collected data to extract insights, detect trends, and understand sentiment.
      </Typography>
      
      <Paper sx={{ mt: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<InsightsIcon />} label="Sentiment Analysis" />
          <Tab icon={<TimelineIcon />} label="Trend Detection" />
          <Tab icon={<BubbleChartIcon />} label="Entity Extraction" />
        </Tabs>
        
        {/* Sentiment Analysis Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Single Text Analysis" />
                <Divider />
                <CardContent>
                  <form onSubmit={handleSentimentSubmit}>
                    {sentimentError && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {sentimentError}
                      </Alert>
                    )}
                    
                    <TextField
                      fullWidth
                      label="Text to Analyze"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={sentimentText}
                      onChange={(e) => setSentimentText(e.target.value)}
                      placeholder="Enter text to analyze sentiment..."
                      required
                      sx={{ mb: 2 }}
                    />
                    
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={sentimentLoading ? <CircularProgress size={24} color="inherit" /> : <InsightsIcon />}
                      disabled={sentimentLoading}
                    >
                      {sentimentLoading ? 'Analyzing...' : 'Analyze Sentiment'}
                    </Button>
                    
                    {sentimentResult && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Results
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body1" sx={{ mr: 2 }}>
                            Sentiment:
                          </Typography>
                          {renderSentimentScore(sentimentResult.sentiment_score)}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {sentimentResult.sentiment_score > 0.2 ? 'Positive sentiment detected' : 
                           sentimentResult.sentiment_score < -0.2 ? 'Negative sentiment detected' : 
                           'Neutral sentiment detected'}
                        </Typography>
                      </Box>
                    )}
                  </form>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Batch Analysis" />
                <Divider />
                <CardContent>
                  <form onSubmit={handleBatchSentimentSubmit}>
                    {batchError && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {batchError}
                      </Alert>
                    )}
                    
                    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                      <InputLabel>Data Source</InputLabel>
                      <Select
                        value={batchDataSource}
                        onChange={(e) => setBatchDataSource(e.target.value)}
                        label="Data Source"
                      >
                        <MenuItem value="twitter">Twitter</MenuItem>
                        <MenuItem value="news">News Articles</MenuItem>
                        <MenuItem value="web">Web Content</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <TextField
                      fullWidth
                      label="Filter Query (Optional)"
                      variant="outlined"
                      value={batchQuery}
                      onChange={(e) => setBatchQuery(e.target.value)}
                      placeholder="Filter by keywords..."
                      sx={{ mb: 2 }}
                    />
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="From Date"
                          variant="outlined"
                          type="date"
                          value={batchDateFrom}
                          onChange={(e) => setBatchDateFrom(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="To Date"
                          variant="outlined"
                          type="date"
                          value={batchDateTo}
                          onChange={(e) => setBatchDateTo(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                    
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={batchLoading ? <CircularProgress size={24} color="inherit" /> : <BarChartIcon />}
                      disabled={batchLoading}
                    >
                      {batchLoading ? 'Analyzing...' : 'Run Batch Analysis'}
                    </Button>
                    
                    {batchResult && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Batch Results
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Items Analyzed:</strong> {batchResult.total_items}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Chip label={`Positive: ${batchResult.positive_count}`} color="success" size="small" />
                          <Chip label={`Neutral: ${batchResult.neutral_count}`} color="primary" size="small" />
                          <Chip label={`Negative: ${batchResult.negative_count}`} color="error" size="small" />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Average Sentiment Score: {batchResult.average_score.toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Trend Detection Tab */}
        <TabPanel value={activeTab} index={1}>
          <Card>
            <CardHeader title="Trend Detection" />
            <Divider />
            <CardContent>
              <form onSubmit={handleTrendSubmit}>
                {trendError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {trendError}
                  </Alert>
                )}
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Data Source</InputLabel>
                      <Select
                        value={trendDataSource}
                        onChange={(e) => setTrendDataSource(e.target.value)}
                        label="Data Source"
                      >
                        <MenuItem value="twitter">Twitter</MenuItem>
                        <MenuItem value="news">News Articles</MenuItem>
                        <MenuItem value="web">Web Content</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Timeframe</InputLabel>
                      <Select
                        value={trendTimeframe}
                        onChange={(e) => setTrendTimeframe(e.target.value)}
                        label="Timeframe"
                      >
                        <MenuItem value="day">Last 24 Hours</MenuItem>
                        <MenuItem value="week">Last Week</MenuItem>
                        <MenuItem value="month">Last Month</MenuItem>
                        <MenuItem value="quarter">Last Quarter</MenuItem>
                        <MenuItem value="year">Last Year</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Topic (Optional)"
                      variant="outlined"
                      value={trendTopic}
                      onChange={(e) => setTrendTopic(e.target.value)}
                      placeholder="Specific topic to analyze..."
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={trendLoading ? <CircularProgress size={24} color="inherit" /> : <TimelineIcon />}
                      disabled={trendLoading}
                    >
                      {trendLoading ? 'Detecting...' : 'Detect Trends'}
                    </Button>
                  </Grid>
                </Grid>
                
                {trendResult && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Detected Trends
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {trendResult.trends.map((trend: any, index: number) => (
                        <Grid item xs={12} md={4} key={index}>
                          <Card variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <LightbulbIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">
                                  {trend.topic}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {trend.description}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Chip 
                                  label={`Strength: ${trend.strength}`} 
                                  size="small" 
                                  color={trend.strength > 7 ? 'error' : trend.strength > 4 ? 'warning' : 'info'} 
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {trend.mentions} mentions
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </form>
            </CardContent>
          </Card>
        </TabPanel>
        
        {/* Entity Extraction Tab */}
        <TabPanel value={activeTab} index={2}>
          <Card>
            <CardHeader title="Entity Extraction" />
            <Divider />
            <CardContent>
              <form onSubmit={handleEntitySubmit}>
                {entityError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {entityError}
                  </Alert>
                )}
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Data Source</InputLabel>
                      <Select
                        value={entityDataSource}
                        onChange={(e) => setEntityDataSource(e.target.value)}
                        label="Data Source"
                      >
                        <MenuItem value="twitter">Twitter</MenuItem>
                        <MenuItem value="news">News Articles</MenuItem>
                        <MenuItem value="web">Web Content</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Entity Types</InputLabel>
                      <Select
                        multiple
                        value={entityTypes}
                        onChange={(e) => setEntityTypes(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                        label="Entity Types"
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {availableEntityTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.icon && <ListItemIcon>{type.icon}</ListItemIcon>}
                            <ListItemText primary={type.label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Limit"
                      variant="outlined"
                      type="number"
                      value={entityLimit}
                      onChange={(e) => setEntityLimit(parseInt(e.target.value))}
                      InputProps={{ inputProps: { min: 1, max: 100 } }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={entityLoading ? <CircularProgress size={24} color="inherit" /> : <BubbleChartIcon />}
                      disabled={entityLoading}
                    >
                      {entityLoading ? 'Extracting...' : 'Extract Entities'}
                    </Button>
                  </Grid>
                </Grid>
                
                {entityResult && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      Extracted Entities
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {Object.entries(entityResult.entities_by_type).map(([type, entities]: [string, any]) => (
                        <Grid item xs={12} md={4} key={type}>
                          <Card variant="outlined">
                            <CardHeader
                              title={type}
                              subheader={`${entities.length} entities found`}
                              titleTypographyProps={{ variant: 'h6' }}
                            />
                            <Divider />
                            <List dense>
                              {entities.slice(0, 10).map((entity: any, index: number) => (
                                <ListItem key={index}>
                                  <ListItemText
                                    primary={entity.text}
                                    secondary={`Mentions: ${entity.count}`}
                                  />
                                  <Chip 
                                    label={`${entity.relevance.toFixed(2)}`} 
                                    size="small" 
                                    color={entity.relevance > 0.7 ? 'primary' : 'default'} 
                                  />
                                </ListItem>
                              ))}
                              {entities.length > 10 && (
                                <ListItem>
                                  <ListItemText
                                    primary={`+${entities.length - 10} more...`}
                                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                  />
                                </ListItem>
                              )}
                            </List>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </form>
            </CardContent>
          </Card>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Analysis; 