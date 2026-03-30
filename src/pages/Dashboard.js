import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  Card,
  CardContent,
  InputBase,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  useMediaQuery,
} from '@mui/material';

import {
  People,
  CheckCircle,
  Payment,
  Assignment,
  Assessment,
  Add,
  Home,
} from '@mui/icons-material';

export default function Dashboard() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)'); // Detect mobile

  const user = JSON.parse(localStorage.getItem("user")) || { name: "Surya Teja", role: "admin" };

  const quickAccessCards = [
    { title: 'Students', icon: <People fontSize="large" />, path: '/students', color: '#1976d2' },
    { title: 'Attendance', icon: <CheckCircle fontSize="large" />, path: '/attendance', color: '#43a047' },
    { title: 'Fees', icon: <Payment fontSize="large" />, path: '/fees', color: '#f57c00' },
    { title: 'Homework', icon: <Assignment fontSize="large" />, path: '/homework', color: '#8e24aa' },
    { title: 'Marks', icon: <Assessment fontSize="large" />, path: '/marks', color: '#e53935' },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#f8f9fc',
      // Mobile Frame Only
      maxWidth: isMobile ? 420 : '100%',
      margin: isMobile ? '0 auto' : 0,
      boxShadow: isMobile ? '0 0 20px rgba(0,0,0,0.15)' : 'none',
      overflow: isMobile ? 'hidden' : 'visible',
    }}>
      
      {/* Status Bar - Only for Mobile */}
      {isMobile && (
        <Box sx={{ 
          height: 44, bgcolor: '#000', color: '#fff', 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 2, fontSize: '12px'
        }}>
          <Typography>4:39</Typography>
          <Box sx={{ display: 'flex', gap: 1.5 }}>📶 WiFi 🔋</Box>
        </Box>
      )}

      {/* Top App Bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ bgcolor: '#1976d2' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Admin Dashboard
          </Typography>
          <IconButton color="inherit">
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth={isMobile ? false : "lg"} sx={{ pt: 3, pb: isMobile ? 10 : 5 }}>
        
        {/* Search Bar */}
        <Box sx={{
          bgcolor: 'white',
          borderRadius: 4,
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          mb: 4
        }}>
          <InputBase fullWidth placeholder="Search students, fees, homework..." />
        </Box>

        {/* User Profile Card - Bigger on Desktop */}
        <Card sx={{ 
          borderRadius: 4, 
          mb: 5, 
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        }}>
          <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Avatar sx={{ width: 90, height: 90, bgcolor: '#1976d2', fontSize: '48px' }}>
              S
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={600}>
                Surya Teja
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Admin • Parent
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, pl: 1 }}>
          Quick Access
        </Typography>

        {/* Responsive Grid */}
        {isMobile ? (
          // Mobile: 2 Column Grid
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {quickAccessCards.map((item, i) => (
              <Card
                key={i}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 3,
                  textAlign: 'center',
                  py: 4,
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 }
                }}
              >
                <Box sx={{ color: item.color, mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6">{item.title}</Typography>
              </Card>
            ))}
          </Box>
        ) : (
          // Desktop: Wider & More Cards per row
          <Grid container spacing={3}>
            {quickAccessCards.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Card
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: 3,
                    textAlign: 'center',
                    py: 5,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: 8 }
                  }}
                >
                  <Box sx={{ color: item.color, mb: 2, fontSize: '3.5rem' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600}>
                    {item.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Bottom Navigation - Only on Mobile */}
      {isMobile && (
        <BottomNavigation
          showLabels
          sx={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 420,
            borderTop: '1px solid #ddd',
            bgcolor: 'white',
            boxShadow: '0 -3px 10px rgba(0,0,0,0.1)',
          }}
        >
          {[
            { label: "Home", icon: <Home />, path: "/" },
            { label: "Students", icon: <People />, path: "/students" },
            { label: "Attendance", icon: <CheckCircle />, path: "/attendance" },
            { label: "Fees", icon: <Payment />, path: "/fees" },
          ].map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.path)}
            />
          ))}
        </BottomNavigation>
      )}
    </Box>
  );
}