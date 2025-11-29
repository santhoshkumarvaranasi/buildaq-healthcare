import { Component } from '@angular/core';

@Component({
  selector: 'hc-payments',
  standalone: false,
  template: `
    <section class="hc-card">
      <header class="hc-header-row">
        <div>
          <p class="hc-label">Payments</p>
          <p class="hc-title">Posted and pending</p>
        </div>
        <span class="hc-pill">Mock data</span>
      </header>

      <div class="hc-grid" style="margin-top:12px;">
        <div class="hc-card soft" *ngFor="let pay of payments">
          <div class="hc-label">{{ pay.source }}</div>
          <div class="hc-value">{{ pay.amount | currency }}</div>
          <div class="hc-meta">Status: {{ pay.status }} · Method: {{ pay.method }}</div>
          <div class="hc-meta">Posted: {{ pay.posted }}</div>
        </div>
      </div>
    </section>
  `
})
export class HcPaymentsComponent {
  payments = [
    { source: 'Blue Cross ERA', amount: 220000, status: 'Posted', method: 'ACH', posted: '11/28' },
    { source: 'Patient pay', amount: 18000, status: 'Pending', method: 'Card', posted: '11/29' },
    { source: 'Medicare EFT', amount: 145000, status: 'Posted', method: 'ACH', posted: '11/27' }
  ];
}
