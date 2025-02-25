import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  Divider,
  useTheme
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Storage as StorageIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title
);

// Summary card component
interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, icon, trend, trendValue }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" sx={{ my: 1, fontWeight: 'bold' }}>
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box 
              sx={{ 
                p: 1.5, 
                borderRadius: '50%', 
                backgroundColor: 'primary.light', 
                color: 'primary.main',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {icon}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5 }} fontSize="small" />
          ) : trend === 'down' ? (
            <TrendingDownIcon sx={{ color: theme.palette.error.main, mr: 0.5 }} fontSize="small" />
          ) : null}
          <Typography 
            variant="body2" 
            sx={{ 
              color: trend === 'up' 
                ? theme.palette.success.main 
                : trend === 'down' 
                  ? theme.palette.error.main 
                  : 'text.secondary'
            }}
          >
            {trendValue}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  
  // Pie chart data
  const pieData = {
    labels: ['Social Media', 'Website', 'News', 'Forums', 'Reviews'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Line chart data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sentiment Score',
        data: [65, 59, 80, 81, 56, 75],
        fill: false,
        borderColor: theme.palette.primary.main,
        tension: 0.1,
      },
    ],
  };
  
  // Bar chart data
  const barData = {
    labels: ['Competitor A', 'Competitor B', 'Competitor C', 'Your Company', 'Competitor D'],
    datasets: [
      {
        label: 'Market Share (%)',
        data: [25, 20, 18, 15, 12],
        backgroundColor: [
          theme.palette.info.main,
          theme.palette.info.main,
          theme.palette.info.main,
          theme.palette.primary.main,
          theme.palette.info.main,
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Data Points"
            value="12,543"
            subtitle="Total data collected"
            icon={<StorageIcon />}
            trend="up"
            trendValue="12% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Sentiment Score"
            value="7.8"
            subtitle="Average sentiment"
            icon={<AssessmentIcon />}
            trend="up"
            trendValue="2.3% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Competitors"
            value="12"
            subtitle="Being tracked"
            icon={<PeopleIcon />}
            trend="neutral"
            trendValue="Same as last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            title="Market Share"
            value="15%"
            subtitle="Your position: 4th"
            icon={<TrendingUpIcon />}
            trend="up"
            trendValue="1.2% from last month"
          />
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Data Sources</Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Sentiment Trend</Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: 300 }}>
              <Line 
                data={lineData} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Competitive Landscape</Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ height: 300 }}>
              <Bar 
                data={barData} 
                options={{ 
                  maintainAspectRatio: false,
                  indexAxis: 'y' as const,
                  scales: {
                    x: {
                      beginAtZero: true,
                      max: 30
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 