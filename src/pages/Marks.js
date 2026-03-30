import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Marks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/marks');
      setMarks(res.data);
    } catch (error) {
      console.error('Error fetching marks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Marks Management</h1>

      {loading ? (
        <p>Loading marks...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th>Student</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Max Marks</th>
              <th>Exam Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {marks.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No marks found</td>
              </tr>
            ) : (
              marks.map((mark) => (
                <tr key={mark._id}>
                  <td>{mark.studentId?.name}</td>
                  <td>{mark.subject}</td>
                  <td>{mark.marks}</td>
                  <td>{mark.maxMarks}</td>
                  <td>{mark.examType}</td>
                  <td>{new Date(mark.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}