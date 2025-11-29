import { Component } from '@angular/core';

@Component({
  selector: 'hc-claims',
  standalone: false,
  template: `
    <section class="hc-card">
      <header class="hc-header-row">
        <div>
          <p class="hc-label">Claims</p>
          <p class="hc-title">Pipeline by payer</p>
        </div>
        <span class="hc-pill">Mock data</span>
      </header>

      <div class="hc-grid" style="margin-top:12px;">
        <div class="hc-card soft" *ngFor="let claim of claims">
          <div class="hc-label">{{ claim.payer }}</div>
          <div class="hc-value">{{ claim.amount | currency }}</div>
          <div class="hc-meta">Status: {{ claim.status }} · Aging: {{ claim.aging }} days</div>
          <div class="hc-meta">Denials: {{ claim.denials }}</div>
        </div>
      </div>
    </section>
  `
})
export class HcClaimsComponent {
  claims = [
    { payer: 'Blue Cross', amount: 525000, status: 'Submitted', aging: 12, denials: 2 },
    { payer: 'Medicare', amount: 310000, status: 'Pending', aging: 7, denials: 0 },
    { payer: 'Aetna', amount: 165000, status: 'Denied', aging: 21, denials: 5 }
  ];
}
