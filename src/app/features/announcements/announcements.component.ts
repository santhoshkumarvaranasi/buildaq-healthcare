import { Component } from '@angular/core';

@Component({
  selector: 'hc-announcements',
  standalone: false,
  template: `
    <div class="hc-card">
      <div class="hc-label">Announcements</div>
      <div class="hc-meta">Broadcast updates to clinicians and staff.</div>
      <div class="hc-list" style="margin-top:12px;">
        <div class="hc-list-item"><div class="hc-list-title">System Notice</div><div class="hc-list-meta">Downtime scheduled tonight 11pm-1am</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Policy Update</div><div class="hc-list-meta">New triage checklist effective Monday</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Urgent</div><div class="hc-list-meta">Severe weather routing in effect</div></div>
      </div>
    </div>
  `
})
export class HcAnnouncementsComponent {}
