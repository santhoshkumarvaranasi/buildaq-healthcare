import { Component } from '@angular/core';

@Component({
  selector: 'hc-staffing',
  standalone: false,
  template: `
    <section class="hc-card">
      <header class="hc-header-row">
        <div>
          <p class="hc-label">Staffing</p>
          <p class="hc-title">Coverage by unit and shift</p>
        </div>
        <span class="hc-pill">Mock data</span>
      </header>

      <div class="hc-grid" style="margin-top:12px;">
        <div class="hc-card soft" *ngFor="let slot of coverage">
          <div class="hc-label">{{ slot.unit }} · {{ slot.shift }}</div>
          <div class="hc-value">{{ slot.covered }}/{{ slot.required }} staffed</div>
          <div class="hc-meta" [class.warn]="slot.covered < slot.required">Gaps: {{ slot.required - slot.covered }}</div>
          <div class="hc-meta">Roles: {{ slot.roles }}</div>
        </div>
      </div>
    </section>
  `
})
export class HcStaffingComponent {
  coverage = [
    { unit: 'ICU', shift: 'Day', required: 6, covered: 5, roles: 'RN, RT, MD' },
    { unit: 'ED', shift: 'Eve', required: 10, covered: 10, roles: 'RN, Tech, MD' },
    { unit: 'Med/Surg', shift: 'Night', required: 8, covered: 6, roles: 'RN, LPN, Tech' }
  ];
}
