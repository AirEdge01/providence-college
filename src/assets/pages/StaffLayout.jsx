import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { staffLogout, getCurrentStaff } from '../utils/staffDB';
import Sidebar from '../components/Sidebar';

export default function StaffLayout() {
    const navigate = useNavigate();
    const staff = getCurrentStaff() || { firstName: 'Guest', surname: '', role: '' };

    const handleLogout = () => {
        staffLogout();
        navigate('/staff/login');
    };

    return (
        <div className="container py-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h3 style={{ margin: 0 }}>Staff Portal</h3>
                    <div style={{ color: '#6c757d' }}>{staff.fullName || `${staff.firstName} ${staff.surname}`} {staff.role && `• ${staff.role}`}</div>
                </div>
            </div>

            <div className="row">
                <aside className="col-md-3">
                    <Sidebar onLogout={handleLogout} />
                </aside>

                <main className="col-md-9">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
