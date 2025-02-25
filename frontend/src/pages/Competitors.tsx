import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
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
  Tooltip,
  CircularProgress,
  Alert,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  CompareArrows as CompareArrowsIcon,
} from '@mui/icons-material';

// Sample data for competitors
const sampleCompetitors = [
  {
    id: 1,
    name: 'CompetitorX',
    website: 'https://www.competitorx.com',
    founded: 2015,
    employees: '100-500',
    revenue: '$10M-$50M',
    keyProducts: ['Market Analysis', 'Competitor Tracking', 'Trend Prediction'],
    strengths: ['Strong brand recognition', 'Innovative technology', 'Global presence'],
    weaknesses: ['High pricing', 'Limited customization', 'Poor customer support'],
    lastUpdated: '2023-05-10',
  },
  {
    id: 2,
    name: 'AnalyticsPro',
    website: 'https://www.analyticspro.io',
    founded: 2018,
    employees: '50-100',
    revenue: '$1M-$10M',
    keyProducts: ['Data Analytics', 'Market Intelligence', 'Business Insights'],
    strengths: ['User-friendly interface', 'Affordable pricing', 'Excellent support'],
    weaknesses: ['Limited features', 'New market entrant', 'Small customer base'],
    lastUpdated: '2023-05-12',
  },
  {
    id: 3,
    name: 'MarketMaster',
    website: 'https://www.marketmaster.com',
    founded: 2010,
    employees: '500-1000',
    revenue: '$50M-$100M',
    keyProducts: ['Market Research', 'Consumer Insights', 'Strategic Planning'],
    strengths: ['Comprehensive data', 'Industry expertise', 'Established reputation'],
    weaknesses: ['Outdated UI', 'Slow innovation', 'Complex workflows'],
    lastUpdated: '2023-05-08',
  },
];

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
      id={`competitor-tabpanel-${index}`}
      aria-labelledby={`competitor-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Competitors: React.FC = () => {
  const [competitors, setCompetitors] = useState(sampleCompetitors);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In a real app, you would fetch data from an API here
    }, 1500);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Competitor Tracking
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mr: 2 }}
          >
            Add Competitor
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={loading}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="competitor tabs">
            <Tab label="Competitor List" />
            <Tab label="Comparison" />
            <Tab label="Market Position" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="competitors table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Website</TableCell>
                    <TableCell>Founded</TableCell>
                    <TableCell>Employees</TableCell>
                    <TableCell>Key Products</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {competitors.map((competitor) => (
                    <TableRow key={competitor.id}>
                      <TableCell component="th" scope="row">
                        {competitor.name}
                      </TableCell>
                      <TableCell>{competitor.website}</TableCell>
                      <TableCell>{competitor.founded}</TableCell>
                      <TableCell>{competitor.employees}</TableCell>
                      <TableCell>
                        {competitor.keyProducts.map((product, index) => (
                          <Chip
                            key={index}
                            label={product}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>{competitor.lastUpdated}</TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Compare">
                          <IconButton size="small">
                            <CompareArrowsIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Competitor Comparison
          </Typography>
          <Typography paragraph>
            This section will allow you to compare multiple competitors side by side.
            Select competitors to compare their features, pricing, strengths, and weaknesses.
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Comparison feature is under development. Check back soon!
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Market Position Analysis
          </Typography>
          <Typography paragraph>
            Visualize where your company stands in relation to competitors across various dimensions.
            This analysis helps identify market gaps and strategic opportunities.
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Market position visualization is under development. Check back soon!
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Competitors; 