// src/features/TaskManagement/TaskManagementUI.jsx
import React from 'react';
import ManagementImage from '../../../../assets/images/managementimage.png';

export default function TaskManagementUI() {
  return (
    <img
      src={ManagementImage}
      alt="Task Management"
      style={{ width: '100%' }}
    />
  );
}
