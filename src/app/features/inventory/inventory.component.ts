import { Component } from '@angular/core';

@Component({
  selector: 'hc-inventory',
  standalone: false,
  template: `
    <section class="hc-card">
      <header class="hc-header-row">
        <div>
          <p class="hc-label">Inventory</p>
          <p class="hc-title">Top items by location</p>
        </div>
        <span class="hc-pill">Mock data</span>
      </header>

      <div class="hc-grid" style="margin-top:12px;">
        <div class="hc-card soft" *ngFor="let item of items">
          <div class="hc-label">{{ item.location }}</div>
          <div class="hc-value">{{ item.name }}</div>
          <div class="hc-meta">On hand: {{ item.onHand }} · Par: {{ item.par }}</div>
          <div class="hc-meta">Vendor: {{ item.vendor }}</div>
          <div class="hc-meta" [class.warn]="item.onHand < item.par">Status: {{ item.status }}</div>
        </div>
      </div>
    </section>
  `
})
export class HcInventoryComponent {
  items = [
    { location: 'OR Core', name: 'Steri-strips', onHand: 12, par: 30, vendor: '3M', status: 'Reorder' },
    { location: 'ED Supply', name: 'IV Start Kits', onHand: 45, par: 40, vendor: 'Medline', status: 'OK' },
    { location: 'ICU Med Room', name: 'Heparin 5000u', onHand: 18, par: 25, vendor: 'Pfizer', status: 'Low' }
  ];
}
