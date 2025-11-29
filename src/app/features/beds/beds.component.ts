import { Component } from '@angular/core';

@Component({
  selector: 'hc-beds',
  standalone: false,
  template: `
    <div class="hc-card">
      <div class="hc-label">Bed Management</div>
      <div class="hc-value">78.3% utilized</div>
      <div class="hc-meta">Track capacity, discharges, and holds in real time.</div>
    </div>
    <div class="hc-card" style="margin-top:12px;">
      <div class="hc-label">Highlights</div>
      <div class="hc-list">
        <div class="hc-list-item"><div class="hc-list-title">Occupancy</div><div class="hc-list-meta">By unit and specialty</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Discharges & holds</div><div class="hc-list-meta">Flow and turn status</div></div>
        <div class="hc-list-item"><div class="hc-list-title">Isolation & ICU</div><div class="hc-list-meta">Critical flags by bed</div></div>
      </div>
    </div>
  `
})
export class HcBedsComponent {}
