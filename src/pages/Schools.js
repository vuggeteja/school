import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await api.get('/schools');
      setSchools(res.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Schools Management</h1>

      {loading ? (
        <p>Loading schools...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th>Name</th>
              <th>School ID</th>
              <th>Address</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {schools.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No schools found</td>
              </tr>
            ) : (
              schools.map((school) => (
                <tr key={school._id}>
                  <td>{school.name}</td>
                  <td>{school.schoolId}</td>
                  <td>{school.address}</td>
                  <td>{school.adminId?.name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}