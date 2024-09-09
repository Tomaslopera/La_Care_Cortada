// src/pages/AdminDashboard.jsx
import React from 'react';
import styles from '../styles/AdminDashboard.module.css';

function AdminDashboard() {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.dashboard}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage Models</h2>
          {/* Add admin functionality here */}
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage Products</h2>
          {/* Add admin functionality here */}
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage Events</h2>
          {/* Add admin functionality here */}
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage Photos</h2>
          {/* Add admin functionality here */}
        </div>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Manage Memberships</h2>
          {/* Add admin functionality here */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
