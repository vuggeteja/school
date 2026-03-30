import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await api.get('/attendance');
      setAttendance(res.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Attendance Management</h1>

      {loading ? (
        <p>Loading attendance records...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Student</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
                  No attendance records found
                </td>
              </tr>
            ) : (
              attendance.map((record) => (
                <tr key={record._id}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    {record.studentId?.name}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor:
                          record.status === 'present' ? '#4caf50' : '#f44336',
                        color: 'white'
                      }}
                    >
                      {record.status}
                    </span>
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