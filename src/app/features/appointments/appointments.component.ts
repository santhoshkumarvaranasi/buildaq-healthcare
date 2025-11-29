import { Component } from '@angular/core';

@Component({
  selector: 'hc-appointments',
  standalone: false,
  template: `
    <div class="hc-card">
      <div class="hc-label">Appointments</div>
      <div class="hc-value">142 today</div>
      <div class="hc-meta">Schedule, confirm, and follow up across clinics and telehealth.</div>
    </div>
    <div class="hc-card" style="margin-top:12px;">
      <div class="hc-label">Highlights</div>
      <div class="hc-list">
        <div class="hc-list-item"><div class="hc-list-title">Daily/weekly views</div><div class="hc-list-meta">Slots, providers, locations</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Telehealth ready</div><div class="hc-list-meta">Auto links & reminders</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Follow-ups</div><div class="hc-list-meta">Reminder cadence & routing</div></div>
      </div>
    </div>
  `
})
export class HcAppointmentsComponent {}
