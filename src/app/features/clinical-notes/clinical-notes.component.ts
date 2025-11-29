import { Component } from '@angular/core';

@Component({
  selector: 'hc-clinical-notes',
  standalone: false,
  template: `
    <section class="hc-card">
      <header class="hc-header-row">
        <div>
          <p class="hc-label">Clinical Notes</p>
          <p class="hc-title">Daily note feed by encounter</p>
        </div>
        <span class="hc-pill">Mock data</span>
      </header>

      <div class="hc-grid" style="margin-top:12px;">
        <div class="hc-card soft" *ngFor="let note of notes">
          <div class="hc-label">{{ note.encounter }}</div>
          <div class="hc-value">{{ note.provider }}</div>
          <div class="hc-meta">{{ note.summary }}</div>
          <ul class="hc-list" style="margin-top:8px;">
            <li class="hc-list-item" *ngFor="let item of note.highlights">
              <div class="hc-list-title">{{ item.title }}</div>
              <div class="hc-list-meta">{{ item.meta }}</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `
})
export class HcClinicalNotesComponent {
  notes = [
    {
      encounter: 'ED Encounter · 11/29',
      provider: 'Dr. Patel',
      summary: 'Chest discomfort, ruled out STEMI, admitted for observation.',
      highlights: [
        { title: 'Plan', meta: 'Serial troponins, telemetry, cardiology consult' },
        { title: 'Orders', meta: 'CBC, CMP, troponin q3h, EKG x2' }
      ]
    },
    {
      encounter: 'Inpatient · 5N · 11/28',
      provider: 'NP Rivera',
      summary: 'Post-op day 2, ambulating with assistance, pain well controlled.',
      highlights: [
        { title: 'Plan', meta: 'Advance diet, PT/OT, DC planning for 11/30' },
        { title: 'Vitals', meta: 'Afebrile, HR 78, BP 122/76, SpO2 98%' }
      ]
    }
  ];
}
