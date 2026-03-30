import React from 'react';
import { useNavigate } from 'react-router-dom';

// MUI Components
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent
} from '@mui/material';

// MUI Icons
import {
  People,
  CheckCircle,
  Payment,
  Assignment,
  Assessment,
  School,
  Logout
} from '@mui/icons-material';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cards = [
    { title: 'Students', icon: <People />, path: '/students', roles: ['admin', 'superadmin'] },
    { title: 'Attendance', icon: <CheckCircle />, path: '/attendance', roles: ['admin', 'superadmin'] },
    { title: 'Fees', icon: <Payment />, path: '/fees', roles: ['admin', 'superadmin'] },
    { title: 'Homework', icon: <Assignment />, path: '/homework', roles: ['admin', 'superadmin'] },
    { title: 'Marks', icon: <Assessment />, path: '/marks', roles: ['admin', 'superadmin'] },
    { title: 'Schools', icon: <School />, path: '/schools', roles: ['superadmin'] },
  ].filter(card => card.roles.includes(user.role));

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            School Management Dashboard
          </Typography>

          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user.name || user.email}
          </Typography>

          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 }
                }}
                onClick={() => navigate(card.path)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                    {card.icon}
                  </div>

                  <Typography variant="h5">
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}