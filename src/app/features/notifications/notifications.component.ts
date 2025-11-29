import { Component } from '@angular/core';

@Component({
  selector: 'hc-notifications',
  standalone: false,
  template: `
    <section class="hc-card">
      <header class="hc-header-row">
        <div>
          <p class="hc-label">Notifications</p>
          <p class="hc-title">Operational alerts</p>
        </div>
        <span class="hc-pill">Mock data</span>
      </header>

      <div class="hc-grid" style="margin-top:12px;">
        <div class="hc-card soft" *ngFor="let n of notifications">
          <div class="hc-label">{{ n.channel }}</div>
          <div class="hc-value">{{ n.title }}</div>
          <div class="hc-meta">{{ n.detail }}</div>
          <div class="hc-meta">Target: {{ n.target }}</div>
        </div>
      </div>
    </section>
  `
})
export class HcNotificationsComponent {
  notifications = [
    { channel: 'In-app', title: 'ICU bed at 82%', detail: 'Notify ICU charge nurse and hospitalist', target: 'ICU' },
    { channel: 'SMS', title: 'MRI downtime', detail: 'Divert cases between 2-3:30 PM', target: 'Radiology' },
    { channel: 'Email', title: 'Lab backlog', detail: 'CBC panels delayed ~25 minutes', target: 'ED, Med/Surg' }
  ];
}
