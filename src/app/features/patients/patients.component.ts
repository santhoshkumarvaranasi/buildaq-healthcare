import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface PatientRow {
  name: string;
  mrn: string;
  unit: string;
  status: string;
  acuity: string;
  provider: string;
  admitted: string;
  nextStep: string;
}

@Component({
  selector: 'hc-patients',
  standalone: false,
  templateUrl: './patients.html',
  styleUrls: ['./patients.scss']
})
export class HcPatientsComponent implements AfterViewInit {
  rows: PatientRow[] = [
    { name: 'Amira Patel', mrn: 'A12045', unit: 'ICU', status: 'Inpatient', acuity: 'High', provider: 'Dr. Singh', admitted: '11/27', nextStep: 'Wean vents' },
    { name: 'John Smith', mrn: 'B98433', unit: 'ED', status: 'ED', acuity: 'Med', provider: 'PA Liu', admitted: '11/29', nextStep: 'Observation' },
    { name: 'Lena Chen', mrn: 'C55311', unit: 'Med/Surg', status: 'Inpatient', acuity: 'Low', provider: 'Dr. Lopez', admitted: '11/26', nextStep: 'PT/OT eval' },
    { name: 'Diego Rivera', mrn: 'D77421', unit: 'Observation', status: 'Observation', acuity: 'Med', provider: 'NP Carter', admitted: '11/28', nextStep: 'Dispo planning' },
    { name: 'Sara Ali', mrn: 'E66290', unit: 'ICU', status: 'Inpatient', acuity: 'High', provider: 'Dr. Khan', admitted: '11/25', nextStep: 'Transfer to stepdown' }
  ];
  dataSource = new MatTableDataSource<PatientRow>(this.rows);
  displayedColumns = ['name', 'unit', 'status', 'acuity', 'provider', 'admitted', 'nextStep'];
  metrics = { total: 0, inpatient: 0, ed: 0 };
  metricCards = [
    { label: 'Total', value: 0, meta: 'All patients' },
    { label: 'Inpatient', value: 0, meta: 'Admitted' },
    { label: 'ED/Obs', value: 0, meta: 'ED + Observation' }
  ];
  units: string[] = [];
  statusChips = ['all', 'Inpatient', 'ED', 'Observation', 'Discharged'];
  acuityChips = ['all', 'High', 'Med', 'Low'];
  search = '';
  statusFilter = 'all';
  unitFilter = '';
  acuityFilter = 'all';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.units = Array.from(new Set(this.rows.map(r => r.unit)));
    this.refreshMetrics();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    const term = this.search.trim().toLowerCase();
    this.dataSource.data = this.rows.filter(r => {
      const matchesTerm = !term || r.name.toLowerCase().includes(term) || r.mrn.toLowerCase().includes(term);
      const matchesStatus = this.statusFilter === 'all' || r.status === this.statusFilter;
      const matchesUnit = !this.unitFilter || r.unit === this.unitFilter;
      const matchesAcuity = this.acuityFilter === 'all' || r.acuity === this.acuityFilter;
      return matchesTerm && matchesStatus && matchesUnit && matchesAcuity;
    });
    this.refreshMetrics();
    if (this.paginator) this.paginator.firstPage();
  }

  refreshMetrics(): void {
    const data = this.dataSource.data;
    this.metrics.total = data.length;
    this.metrics.inpatient = data.filter(r => r.status === 'Inpatient').length;
    this.metrics.ed = data.filter(r => r.status === 'ED' || r.status === 'Observation').length;
    this.metricCards = [
      { label: 'Total', value: this.metrics.total, meta: 'All patients' },
      { label: 'Inpatient', value: this.metrics.inpatient, meta: 'Admitted' },
      { label: 'ED/Obs', value: this.metrics.ed, meta: 'ED + Observation' }
    ];
  }

  clearSearch(): void {
    this.search = '';
    this.applyFilters();
  }

  onStatusChipChange(evt: any) {
    const val = evt?.value || evt?.source?.value || 'all';
    this.statusFilter = val || 'all';
    this.applyFilters();
  }

  onAcuityChipChange(evt: any) {
    const val = evt?.value || evt?.source?.value || 'all';
    this.acuityFilter = val || 'all';
    this.applyFilters();
  }
}
