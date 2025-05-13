import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { MdDashboard, MdPeople, MdAttachMoney, MdAssignment } from 'react-icons/md';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      color="inherit"
      onClick={() => navigate(-1)}
      sx={{ marginLeft: '10px' }}
    >
      Go Back
    </Button>
  );
};

const HumanResourceDashboard = () => {
  const cards = [
    {
      icon: <MdAttachMoney size={40} color="#2c3e50" />,
      title: 'Payroll Management',
      text: 'Manage employee salaries, deductions, and payroll compliance effortlessly.',
      link: '/Payroll',
    },

   
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar>
          <MdDashboard style={{ marginRight: '10px' }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Human Resources
          </Typography>
          <BackButton />
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ padding: '20px', flex: 1 }}>
        {cards.map((card, idx) => (
          <Grid item xs={12} sm={4} md={4} key={idx}>
            <Card
              sx={{
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '24px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#f0f2f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  {card.icon}
                </div>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: '600', color: '#2c3e50' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '16px' }}>
                  {card.text}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to={card.link}
                  sx={{ borderRadius: '30px', padding: '8px 20px', fontWeight: 'bold' }}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: 'black', color: 'white' }}>
        &copy; 2025 Freight Marks Logistics. All rights reserved.
      </footer>
    </div>
  );
};

export default HumanResourceDashboard;
