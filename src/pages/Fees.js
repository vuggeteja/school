import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/fees');
      setFees(res.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Fees Management</h1>

      {loading ? (
        <p>Loading fees...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th>Student</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {fees.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No fees found</td>
              </tr>
            ) : (
              fees.map((fee) => (
                <tr key={fee._id}>
                  <td>{fee.studentId?.name}</td>
                  <td>{fee.amount}</td>
                  <td>{fee.description}</td>
                  <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}