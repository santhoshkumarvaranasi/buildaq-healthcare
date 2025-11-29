import { Component } from '@angular/core';

@Component({
  selector: 'hc-dashboard',
  standalone: false,
  template: `
    <div class="hc-shell">
      <div class="hc-header">
        <div>
          <div class="hc-label">Tenant</div>
          <div class="hc-title">BuildAQ Healthcare</div>
          <div class="hc-meta">Signed in as Demo User</div>
        </div>
        <div class="hc-pill">Healthcare Remote</div>
      </div>

      <div class="hc-grid">
        <div class="hc-card">
          <div class="hc-label">Active Patients</div>
          <div class="hc-value">1,248</div>
          <div class="hc-meta">Live census across all wards</div>
        </div>
        <div class="hc-card">
          <div class="hc-label">Bed Utilization</div>
          <div class="hc-value">78.3%</div>
          <div class="hc-meta">Capacity signal updated in real-time</div>
        </div>
        <div class="hc-card">
          <div class="hc-label">Appointments Today</div>
          <div class="hc-value">142</div>
          <div class="hc-meta">Outpatient + telehealth</div>
        </div>
      </div>

      <div class="hc-card" style="margin-top: 18px;">
        <div class="hc-label">Operational Alerts</div>
        <div class="hc-list">
          <div class="hc-list-item">
            <div class="hc-list-title">ICU capacity at 82%</div>
            <div class="hc-list-meta">Wing B · Monitoring closely</div>
          </div>
          <div class="hc-list-item">
            <div class="hc-list-title">MRI downtime scheduled</div>
            <div class="hc-list-meta">2:00 PM - 3:30 PM · Radiology</div>
          </div>
          <div class="hc-list-item">
            <div class="hc-list-title">Staffing check</div>
            <div class="hc-list-meta">ER night shift coverage confirmed</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HcDashboardComponent {}
