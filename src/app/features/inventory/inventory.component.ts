import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface InventoryRow {
  name: string;
  location: string;
  onHand: number;
  par: number;
  vendor: string;
  status: string;
}

@Component({
  selector: 'hc-inventory',
  standalone: false,
  template: `
    <div class="patients-page">
      <div class="hero mat-elevation-z2">
        <div class="hero-text">
          <div class="hero-icon">
            <svg viewBox="0 0 24 24" class="icon"><path d="M4 5h16v2H4V5Zm0 4h16v10H4V9Zm2 2v6h12v-6H6Z" fill="currentColor"/></svg>
          </div>
          <div>
            <p class="eyebrow">Healthcare Management</p>
            <h1>Inventory</h1>
            <p class="subtitle">Supplies, par levels, and vendor details.</p>
          </div>
        </div>
        <button mat-flat-button color="accent" class="record-btn" (click)="startAdd()">
          <span class="btn-icon">
            <svg viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor"/></svg>
          </span>
          Add Item
        </button>
      </div>

      <div class="summary-grid">
        <mat-card class="metric-card mat-elevation-z2" *ngFor="let m of metricCards">
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" class="icon"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-7 9v-1a6 6 0 0 1 12 0v1H5Z" fill="currentColor"/></svg>
          </div>
          <div class="metric-body">
            <div class="metric-label">{{ m.label }}</div>
            <div class="metric-value">{{ m.value }}</div>
            <div class="metric-hint">{{ m.meta }}</div>
          </div>
        </mat-card>
      </div>

      <mat-card class="filters-card mat-elevation-z2">
        <div class="filter-grid compact">
          <mat-form-field appearance="fill" class="full-width search-field">
            <mat-label>Search</mat-label>
            <span matPrefix class="icon-wrap">
              <svg class="icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28h.79l5 4.99L20.49 19l-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/></svg>
            </span>
            <input matInput [(ngModel)]="search" (input)="applyFilters()" placeholder="name, vendor, location" />
            <button *ngIf="search" matSuffix mat-icon-button aria-label="Clear search" (click)="clearSearch()">
              <svg class="icon" viewBox="0 0 24 24"><path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L12 13.41l-4.89 4.9-1.41-1.42L10.59 12 4.29 5.71 5.7 4.29 12 10.59l6.29-6.3z" fill="currentColor"/></svg>
            </button>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Location</mat-label>
            <mat-select [(ngModel)]="locationFilter" (selectionChange)="applyFilters()">
              <mat-option value="">All</mat-option>
              <mat-option *ngFor="let l of locations" [value]="l">{{ l }}</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="chip-group">
            <div class="chip-label">Status</div>
            <mat-chip-listbox class="status-chips" [value]="statusFilter" [multiple]="false" (valueChange)="onStatusChange($event)">
              <mat-chip-option value="all">All</mat-chip-option>
              <mat-chip-option value="OK">OK</mat-chip-option>
              <mat-chip-option value="Low">Low</mat-chip-option>
              <mat-chip-option value="Reorder">Reorder</mat-chip-option>
            </mat-chip-listbox>
          </div>

          <div class="export-wrap">
            <button mat-stroked-button color="primary" class="ghost-button" (click)="resetFilters()">
              <span class="btn-icon">
                <svg viewBox="0 0 24 24"><path d="M12 6V3L8 7l4 4V8c2.21 0 4 1.79 4 4 0 .34-.04.67-.12.98l1.53 1.53C17.8 13.67 18 12.86 18 12c0-3.31-2.69-6-6-6zm-5.88.02C6.2 8.33 6 9.14 6 10c0 3.31 2.69 6 6 6v3l4-4-4-4v3c-2.21 0-4-1.79-4-4 0-.34.04-.67.12-.98L6.59 6.48 6.12 6.02z" fill="currentColor"/></svg>
              </span>
              Reset Filters
            </button>
            <button mat-flat-button color="accent" class="ghost-button">
              <span class="btn-icon">
                <svg viewBox="0 0 24 24"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 19h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              Export CSV
            </button>
          </div>
        </div>
      </mat-card>

      <mat-card class="table-card mat-elevation-z2">
        <div class="table-head">
          <div>
            <mat-card-title>Inventory list</mat-card-title>
            <mat-card-subtitle>Par levels and locations</mat-card-subtitle>
          </div>
          <div class="last-updated">Updated just now</div>
        </div>

        <div class="table-wrap desktop-only">
          <table mat-table [dataSource]="dataSource" matSort class="hc-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Item</th>
              <td mat-cell *matCellDef="let row">{{ row.name }}</td>
            </ng-container>
            <ng-container matColumnDef="location">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Location</th>
              <td mat-cell *matCellDef="let row">{{ row.location }}</td>
            </ng-container>
            <ng-container matColumnDef="onHand">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>On hand</th>
              <td mat-cell *matCellDef="let row">{{ row.onHand }}</td>
            </ng-container>
            <ng-container matColumnDef="par">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Par</th>
              <td mat-cell *matCellDef="let row">{{ row.par }}</td>
            </ng-container>
            <ng-container matColumnDef="vendor">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Vendor</th>
              <td mat-cell *matCellDef="let row">{{ row.vendor }}</td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let row">
                <mat-chip class="status-chip" color="primary" selected>{{ row.status }}</mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef></th>
              <td mat-cell *matCellDef="let row; let i = index">
                <div class="action-row">
                  <button mat-icon-button color="accent" matTooltip="Edit" (click)="startEdit(i)">
                    <span class="btn-icon">
                      <svg viewBox="0 0 24 24"><path d="M5 19h14M7 14l7.5-7.5a1.06 1.06 0 0 1 1.5 0l1 1a1.06 1.06 0 0 1 0 1.5L9.5 16.5 7 17z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                  </button>
                  <button mat-icon-button color="warn" matTooltip="Delete" (click)="delete(i)">
                    <span class="btn-icon">
                      <svg viewBox="0 0 24 24"><path d="M6 7h12m-9 0v10m6-10v10M9 7l.6-2h4.8l.6 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </span>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            <tr class="empty-state" *matNoDataRow>
              <td [attr.colspan]="displayedColumns.length">
                <div class="fee-empty">No items match your filters.</div>
              </td>
            </tr>
          </table>
          <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]"></mat-paginator>
        </div>
      </mat-card>

      <mat-card class="form-card mat-elevation-z2">
        <mat-card-title>{{ editIndex === null ? 'Add Item' : 'Edit Item' }}</mat-card-title>
        <div class="form-grid">
          <mat-form-field appearance="fill">
            <mat-label>Name</mat-label>
            <input matInput [(ngModel)]="form.name" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Location</mat-label>
            <mat-select [(ngModel)]="form.location">
              <mat-option *ngFor="let l of locations" [value]="l">{{ l }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>On hand</mat-label>
            <input matInput type="number" [(ngModel)]="form.onHand" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Par</mat-label>
            <input matInput type="number" [(ngModel)]="form.par" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Vendor</mat-label>
            <input matInput [(ngModel)]="form.vendor" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="form.status">
              <mat-option value="OK">OK</mat-option>
              <mat-option value="Low">Low</mat-option>
              <mat-option value="Reorder">Reorder</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="form-actions">
          <button mat-stroked-button color="primary" (click)="save()">Save</button>
          <button mat-button (click)="startAdd()">Cancel</button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .patients-page { display:grid; gap:16px; padding:12px; }
    .hero { display:flex; align-items:center; justify-content:space-between; padding:18px; border-radius:14px; background:linear-gradient(120deg,#1d4ed8,#60a5fa); color:#fff; }
    .hero-text { display:flex; align-items:center; gap:12px; }
    .hero-icon { width:54px; height:54px; border-radius:50%; background:rgba(255,255,255,0.15); display:grid; place-items:center; }
    .hero-icon .icon { width:28px; height:28px; }
    .eyebrow { text-transform:uppercase; letter-spacing:.08em; font-size:12px; margin:0; }
    h1 { margin:2px 0 4px; font-size:24px; }
    .subtitle { margin:0; opacity:0.9; }
    .record-btn { text-transform:none; display:inline-flex; align-items:center; gap:6px; }
    .btn-icon { display:inline-flex; width:18px; height:18px; }
    .btn-icon svg { width:18px; height:18px; }
    .summary-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:10px; }
    .metric-card { display:flex; align-items:center; gap:10px; }
    .metric-icon { width:44px; height:44px; border-radius:10px; display:grid; place-items:center; background:linear-gradient(135deg,#1d4ed8,#3b82f6); color:#fff; }
    .metric-body .metric-label { text-transform:uppercase; font-size:11px; color:#64748b; letter-spacing:.06em; margin:0; }
    .metric-body .metric-value { margin:0; font-size:22px; font-weight:700; }
    .metric-body .metric-hint { margin:0; color:#94a3b8; }
    .filters-card { padding:12px; }
    .filter-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; align-items:center; }
    .chip-group { display:grid; gap:6px; }
    .chip-label { font-size:12px; text-transform:uppercase; letter-spacing:.04em; color:#475569; }
    .status-chips { width:100%; }
    .export-wrap { display:flex; gap:8px; align-items:center; justify-content:flex-end; flex-wrap:wrap; }
    .ghost-button { text-transform:none; }
    .table-card { padding:12px; }
    .table-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
    .last-updated { color:#94a3b8; font-size:12px; }
    .table-wrap { background:#fff; border-radius:12px; border:1px solid #e2e8f0; overflow:hidden; }
    table { width:100%; }
    .cell-title { font-weight:600; }
    .cell-meta { color:#94a3b8; font-size:12px; }
    .status-chip { font-weight:600; }
    .form-card { padding:12px; }
    .form-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
    .form-actions { display:flex; gap:10px; margin-top:10px; }
    .action-row { display:flex; gap:6px; justify-content:flex-end; }
  `]
})
export class HcInventoryComponent implements AfterViewInit {
  rows: InventoryRow[] = [
    { name: 'Steri-strips', location: 'OR Core', onHand: 12, par: 30, vendor: '3M', status: 'Reorder' },
    { name: 'IV Start Kits', location: 'ED Supply', onHand: 45, par: 40, vendor: 'Medline', status: 'OK' },
    { name: 'Heparin 5000u', location: 'ICU Med Room', onHand: 18, par: 25, vendor: 'Pfizer', status: 'Low' }
  ];
  dataSource = new MatTableDataSource<InventoryRow>(this.rows);
  displayedColumns = ['name','location','onHand','par','vendor','status','actions'];
  metricCards = [
    { label: 'Total', value: 0, meta: 'All items' },
    { label: 'Low/Reorder', value: 0, meta: 'Needs attention' },
    { label: 'OK', value: 0, meta: 'Healthy' }
  ];

  locations = ['OR Core','ED Supply','ICU Med Room','Med/Surg Store'];
  search = '';
  locationFilter = '';
  statusFilter = 'all';

  editIndex: number | null = null;
  form: InventoryRow = { name: '', location: 'OR Core', onHand: 0, par: 0, vendor: '', status: 'OK' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.refreshMetrics();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilters(): void {
    const term = this.search.trim().toLowerCase();
    const filtered = this.rows.filter(r => {
      const matchesTerm = !term || r.name.toLowerCase().includes(term) || r.vendor.toLowerCase().includes(term) || r.location.toLowerCase().includes(term);
      const matchesLoc = !this.locationFilter || r.location === this.locationFilter;
      const matchesStatus = this.statusFilter === 'all' || r.status === this.statusFilter;
      return matchesTerm && matchesLoc && matchesStatus;
    });
    this.dataSource.data = filtered;
    this.refreshMetrics();
    if (this.paginator) this.paginator.firstPage();
  }

  clearSearch(): void {
    this.search = '';
    this.applyFilters();
  }

  resetFilters(): void {
    this.search = '';
    this.locationFilter = '';
    this.statusFilter = 'all';
    this.applyFilters();
  }

  onStatusChange(val: any): void {
    const v = (val && val.value !== undefined ? val.value : val) || 'all';
    this.statusFilter = v;
    this.applyFilters();
  }

  refreshMetrics(): void {
    const data = this.dataSource.data;
    const ok = data.filter(r => r.status === 'OK').length;
    const low = data.filter(r => r.status === 'Low' || r.status === 'Reorder').length;
    this.metricCards = [
      { label: 'Total', value: data.length, meta: 'All items' },
      { label: 'Low/Reorder', value: low, meta: 'Needs attention' },
      { label: 'OK', value: ok, meta: 'Healthy' }
    ];
  }

  startAdd(): void {
    this.editIndex = null;
    this.form = { name: '', location: 'OR Core', onHand: 0, par: 0, vendor: '', status: 'OK' };
  }

  startEdit(index: number): void {
    this.editIndex = index;
    this.form = { ...this.dataSource.data[index] };
  }

  save(): void {
    if (this.editIndex === null) {
      this.rows = [...this.rows, { ...this.form }];
    } else {
      const target = this.dataSource.data[this.editIndex];
      const idx = this.rows.findIndex(r => r.name === target.name && r.location === target.location);
      if (idx >= 0) this.rows[idx] = { ...this.form };
    }
    this.dataSource.data = [...this.rows];
    this.applyFilters();
    this.startAdd();
  }

  delete(index: number): void {
    const target = this.dataSource.data[index];
    this.rows = this.rows.filter(r => !(r.name === target.name && r.location === target.location));
    this.dataSource.data = [...this.rows];
    this.applyFilters();
  }
}
