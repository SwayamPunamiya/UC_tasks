// src/components/OrderHistory.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, Typography, Paper, List, ListItem } from '@mui/material';

const OrderHistory = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/orders', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography variant="h5">Order History</Typography>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id}>
              <Typography>{order.details}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default OrderHistory;
