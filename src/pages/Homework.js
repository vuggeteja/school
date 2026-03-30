import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Homework() {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHomework();
  }, []);

  const fetchHomework = async () => {
    setLoading(true);
    try {
      const res = await api.get('/homework');
      setHomework(res.data);
    } catch (error) {
      console.error('Error fetching homework:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Homework Management</h1>

      {loading ? (
        <p>Loading homework...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Class</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Subject</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Description</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
            </tr>
          </thead>

          <tbody>
            {homework.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                  No homework found
                </td>
              </tr>
            ) : (
              homework.map((hw) => (
                <tr key={hw._id}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{hw.class}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{hw.subject}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{hw.description}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    {new Date(hw.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      )}
    </div>
  );
}