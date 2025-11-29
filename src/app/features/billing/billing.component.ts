import { Component } from '@angular/core';

@Component({
  selector: 'hc-billing',
  standalone: false,
  template: `
    <div class="hc-card">
      <div class="hc-label">Billing</div>
      <div class="hc-value">$1.95M pipeline</div>
      <div class="hc-meta">Claims, payments, and reminders with status at a glance.</div>
    </div>
    <div class="hc-card" style="margin-top:12px;">
      <div class="hc-label">Highlights</div>
      <div class="hc-list">
        <div class="hc-list-item"><div class="hc-list-title">Claims queue</div><div class="hc-list-meta">By status and payer</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Payments</div><div class="hc-list-meta">Posted and pending</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Reminders</div><div class="hc-list-meta">Automated cadence</div></div>
      </div>
    </div>
  `
})
export class HcBillingComponent {}
