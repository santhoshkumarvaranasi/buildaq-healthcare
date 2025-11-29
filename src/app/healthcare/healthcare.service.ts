import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface PatientSummary {
  name: string;
  status: string;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class HealthcareService {
  getPatients() {
    // Stubbed data for now; replace with API when available
    return of<PatientSummary[]>([
      { name: 'A. Patel', status: 'Inpatient', unit: 'ICU' },
      { name: 'J. Smith', status: 'Observation', unit: 'ED' },
      { name: 'L. Chen', status: 'Outpatient', unit: 'Cardiology' }
    ]);
  }
}
