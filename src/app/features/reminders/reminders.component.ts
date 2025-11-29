import { Component } from '@angular/core';

@Component({
  selector: 'hc-reminders',
  standalone: false,
  template: `
    <section class="hc-card">
      <header class="hc-header-row">
        <div>
          <p class="hc-label">Reminders</p>
          <p class="hc-title">Outbound cadence</p>
        </div>
        <span class="hc-pill">Mock data</span>
      </header>

      <div class="hc-grid" style="margin-top:12px;">
        <div class="hc-card soft" *ngFor="let r of reminders">
          <div class="hc-label">{{ r.campaign }}</div>
          <div class="hc-value">{{ r.channel }}</div>
          <div class="hc-meta">Scheduled: {{ r.when }}</div>
          <div class="hc-meta">Target: {{ r.target }}</div>
        </div>
      </div>
    </section>
  `
})
export class HcRemindersComponent {
  reminders = [
    { campaign: 'Appointment confirm', channel: 'SMS + Email', when: 'T-24h', target: 'Clinic visits' },
    { campaign: 'Billing follow-up', channel: 'Email', when: 'Every 3 days', target: 'Patient pay' },
    { campaign: 'Telehealth link', channel: 'SMS', when: 'T-2h', target: 'Tele visits' }
  ];
}
