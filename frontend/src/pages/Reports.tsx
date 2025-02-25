import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Share as ShareIcon,
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as DocIcon,
  Slideshow as PptIcon,
  Code as HtmlIcon,
} from '@mui/icons-material';
import apiService from '../services/api';

// Interface for report types
interface Report {
  id: string;
  title: string;
  description: string;
  report_type: string;
  created_at: string;
  status: 'generating' | 'completed' | 'failed';
  format: string;
  download_url?: string;
}

// Reports page component
const Reports: React.FC = () => {
  // State for reports list
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for report generation dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);
  
  // State for report generation form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [reportType, setReportType] = useState('market_overview');
  const [timePeriod, setTimePeriod] = useState('last_month');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [entities, setEntities] = useState<string[]>([]);
  const [format, setFormat] = useState('pdf');
  
  // Available data sources
  const availableDataSources = [
    'Twitter',
    'LinkedIn',
    'News Articles',
    'Web Content',
    'Customer Reviews',
    'Industry Forums',
  ];
  
  // Available entities (competitors, products, etc.)
  const availableEntities = [
    'Competitor A',
    'Competitor B',
    'Competitor C',
    'Product X',
    'Product Y',
    'Industry Trend 1',
    'Industry Trend 2',
  ];
  
  // Fetch reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);
  
  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call API to get reports
      const response = await apiService.get('/v1/reports', {
        params: {
          limit: 100, // Get all reports for now
          skip: 0,
        }
      });
      
      setReports(response.data.reports || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle dialog open
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form
    setTitle('');
    setDescription('');
    setDataSources([]);
    setReportType('market_overview');
    setTimePeriod('last_month');
    setCustomStartDate('');
    setCustomEndDate('');
    setEntities([]);
    setFormat('pdf');
    setDialogError(null);
  };
  
  // Handle report generation form submission
  const handleGenerateReport = async () => {
    // Validate form
    if (!title) {
      setDialogError('Please enter a report title');
      return;
    }
    
    if (dataSources.length === 0) {
      setDialogError('Please select at least one data source');
      return;
    }
    
    if (timePeriod === 'custom' && (!customStartDate || !customEndDate)) {
      setDialogError('Please enter both start and end dates for custom time period');
      return;
    }
    
    try {
      setDialogLoading(true);
      setDialogError(null);
      
      // Call API to generate report
      const response = await apiService.post('/v1/reports/generate', {
        title,
        description,
        data_sources: dataSources,
        report_type: reportType,
        time_period: timePeriod,
        custom_start_date: timePeriod === 'custom' ? customStartDate : undefined,
        custom_end_date: timePeriod === 'custom' ? customEndDate : undefined,
        entities: entities.length > 0 ? entities : undefined,
        format,
      });
      
      // Close dialog and refresh reports
      handleCloseDialog();
      fetchReports();
    } catch (err: any) {
      setDialogError(err.response?.data?.message || 'Failed to generate report');
    } finally {
      setDialogLoading(false);
    }
  };
  
  // Handle report download
  const handleDownloadReport = async (reportId: string) => {
    try {
      // Call API to download report
      const response = await apiService.get(`/v1/reports/${reportId}/download`, {
        responseType: 'blob',
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Get report details
      const report = reports.find(r => r.id === reportId);
      
      // Set filename
      link.setAttribute('download', `${report?.title || 'report'}.${report?.format || 'pdf'}`);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Failed to download report:', err);
      alert('Failed to download report. Please try again.');
    }
  };
  
  // Handle report deletion
  const handleDeleteReport = async (reportId: string) => {
    if (!window.confirm('Are you sure you want to delete this report?')) {
      return;
    }
    
    try {
      // Call API to delete report
      await apiService.delete(`/v1/reports/${reportId}`);
      
      // Refresh reports
      fetchReports();
    } catch (err: any) {
      console.error('Failed to delete report:', err);
      alert('Failed to delete report. Please try again.');
    }
  };
  
  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Get format icon based on format
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf':
        return <PdfIcon />;
      case 'docx':
        return <DocIcon />;
      case 'pptx':
        return <PptIcon />;
      case 'html':
        return <HtmlIcon />;
      default:
        return <DescriptionIcon />;
    }
  };
  
  // Get status chip based on status
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'generating':
        return <Chip icon={<CircularProgress size={16} />} label="Generating" color="warning" size="small" />;
      case 'completed':
        return <Chip label="Completed" color="success" size="small" />;
      case 'failed':
        return <Chip label="Failed" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };
  
  // Get report type display name
  const getReportTypeDisplay = (type: string) => {
    if (!type) {
      return 'Unknown Type';
    }
    
    switch (type) {
      case 'market_overview':
        return 'Market Overview';
      case 'competitor_analysis':
        return 'Competitor Analysis';
      case 'sentiment_analysis':
        return 'Sentiment Analysis';
      case 'trend_report':
        return 'Trend Report';
      default:
        return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };
  
  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Reports
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Generate New Report
        </Button>
      </Box>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Generate and manage reports based on collected data and analysis.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="reports table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Format</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Loading reports...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1">
                      No reports found.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Generate a new report to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reports
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((report) => (
                    <TableRow hover key={report.id}>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {report.title}
                        </Typography>
                        {report.description && (
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {report.description.length > 50 
                              ? `${report.description.substring(0, 50)}...` 
                              : report.description}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{getReportTypeDisplay(report.report_type)}</TableCell>
                      <TableCell>{formatDate(report.created_at)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getFormatIcon(report.format)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {report.format.toUpperCase()}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{getStatusChip(report.status)}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Tooltip title="View Report">
                            <IconButton size="small" color="primary">
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          
                          {report.status === 'completed' && (
                            <>
                              <Tooltip title="Download">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={() => handleDownloadReport(report.id)}
                                >
                                  <DownloadIcon />
                                </IconButton>
                              </Tooltip>
                              
                              <Tooltip title="Share">
                                <IconButton size="small" color="primary">
                                  <ShareIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                          
                          <Tooltip title="Delete">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Recent Reports Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Reports
        </Typography>
        
        <Grid container spacing={3}>
          {reports.slice(0, 3).map((report) => (
            <Grid item xs={12} md={4} key={report.id}>
              <Card>
                <CardHeader
                  title={report.title}
                  subheader={formatDate(report.created_at)}
                  action={getFormatIcon(report.format)}
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {report.description || 'No description provided.'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={getReportTypeDisplay(report.report_type)} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    {getStatusChip(report.status)}
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="small" startIcon={<ViewIcon />}>
                    View
                  </Button>
                  
                  {report.status === 'completed' && (
                    <>
                      <Button 
                        size="small" 
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        Download
                      </Button>
                      
                      <Button size="small" startIcon={<ShareIcon />}>
                        Share
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
          
          {reports.length === 0 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1">
                  No recent reports available.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  sx={{ mt: 2 }}
                >
                  Generate New Report
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
      
      {/* Report Generation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Generate New Report</DialogTitle>
        <DialogContent dividers>
          {dialogError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {dialogError}
            </Alert>
          )}
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Report Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={2}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  label="Report Type"
                >
                  <MenuItem value="market_overview">Market Overview</MenuItem>
                  <MenuItem value="competitor_analysis">Competitor Analysis</MenuItem>
                  <MenuItem value="sentiment_analysis">Sentiment Analysis</MenuItem>
                  <MenuItem value="trend_report">Trend Report</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Time Period</InputLabel>
                <Select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  label="Time Period"
                >
                  <MenuItem value="last_day">Last 24 Hours</MenuItem>
                  <MenuItem value="last_week">Last Week</MenuItem>
                  <MenuItem value="last_month">Last Month</MenuItem>
                  <MenuItem value="last_quarter">Last Quarter</MenuItem>
                  <MenuItem value="last_year">Last Year</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {timePeriod === 'custom' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    variant="outlined"
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    variant="outlined"
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </>
            )}
            
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableDataSources}
                value={dataSources}
                onChange={(event, newValue) => setDataSources(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Data Sources"
                    variant="outlined"
                    placeholder="Select data sources"
                    required
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      size="small"
                    />
                  ))
                }
              />
            </Grid>
            
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableEntities}
                value={entities}
                onChange={(event, newValue) => setEntities(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Entities (Optional)"
                    variant="outlined"
                    placeholder="Select entities to include"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      size="small"
                    />
                  ))
                }
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Report Format</InputLabel>
                <Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  label="Report Format"
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="docx">Word (DOCX)</MenuItem>
                  <MenuItem value="pptx">PowerPoint (PPTX)</MenuItem>
                  <MenuItem value="html">HTML</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateReport}
            disabled={dialogLoading}
            startIcon={dialogLoading ? <CircularProgress size={24} /> : null}
          >
            {dialogLoading ? 'Generating...' : 'Generate Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports; 