import React from 'react';
import { getCurrentStaff } from '../utils/staffDB';

export default function StaffPortalProfile() {
    const staff = getCurrentStaff();
    if (!staff) return <div className="p-4">No staff signed in.</div>;

    return (
        <div className="p-4">
            <div className="d-flex gap-3 align-items-center mb-3">
                {staff.photo ? <img src={staff.photo} alt={staff.fullName} style={{ width: 96, height: 96, borderRadius: 12 }} /> : <div style={{ width: 96, height: 96, background: '#ddd' }} />}
                <div>
                    <h4 className="mb-0">{staff.fullName || `${staff.firstName} ${staff.surname}`}</h4>
                    <div className="text-muted">{staff.role} — {staff.department}</div>
                </div>
            </div>

            <dl className="row">
                <dt className="col-sm-4">Staff ID</dt><dd className="col-sm-8">{staff.staffId || 'N/A'}</dd>
                <dt className="col-sm-4">Email</dt><dd className="col-sm-8">{staff.email || 'N/A'}</dd>
                <dt className="col-sm-4">Department</dt><dd className="col-sm-8">{staff.department || 'N/A'}</dd>
                <dt className="col-sm-4">Category</dt><dd className="col-sm-8">{staff.category || 'N/A'}</dd>
            </dl>
        </div>
    );
}
