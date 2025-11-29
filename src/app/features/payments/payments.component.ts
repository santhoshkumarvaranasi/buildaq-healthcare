import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface PaymentRow {
  source: string;
  amount: number;
  status: 'Posted' | 'Pending' | 'Denied';
  method: 'ACH' | 'Card' | 'Check';
  posted: string;
  note?: string;
}

@Component({
  selector: 'hc-payments',
  standalone: false,
  template: `
    <div class="patients-page">
      <div class="hero mat-elevation-z2">
        <div class="hero-text">
          <div class="hero-icon">
            <svg viewBox="0 0 24 24" class="icon"><path d="M12 21c4.97 0 9-3.58 9-8s-4.03-8-9-8-9 3.58-9 8 4.03 8 9 8Zm0-2c-3.86 0-7-2.68-7-6s3.14-6 7-6 7 2.68 7 6-3.14 6-7 6Zm0-3c1.66 0 3-1.12 3-2.5S13.66 11 12 11s-3 1.12-3 2.5S10.34 16 12 16Zm0-7c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Z" fill="currentColor"/></svg>
          </div>
          <div>
            <p class="eyebrow">Healthcare Management</p>
            <h1>Payments</h1>
            <p class="subtitle">Posted, pending, and denials with quick edits.</p>
          </div>
        </div>
        <button mat-flat-button color="accent" class="record-btn" (click)="startAdd()">
          <span class="btn-icon">
            <svg viewBox="0 0 24 24"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor"/></svg>
          </span>
          Add Payment
        </button>
      </div>

      <div class="summary-grid">
        <mat-card class="metric-card mat-elevation-z2" *ngFor="let m of metricCards">
          <div class="metric-icon">
            <svg viewBox="0 0 24 24" class="icon"><path d="M12 3v18m0 0-4-4m4 4 4-4M5 7h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
            <input matInput [(ngModel)]="search" (input)="applyFilters()" placeholder="payer, method, note" />
            <button *ngIf="search" matSuffix mat-icon-button aria-label="Clear search" (click)="clearSearch()">
              <svg class="icon" viewBox="0 0 24 24"><path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L12 13.41l-4.89 4.9-1.41-1.42L10.59 12 4.29 5.71 5.7 4.29 12 10.59l6.29-6.3z" fill="currentColor"/></svg>
            </button>
          </mat-form-field>

          <div class="chip-group">
            <div class="chip-label">Status</div>
            <mat-chip-listbox class="status-chips"
              [value]="statusFilter"
              [multiple]="false"
              (selectionChange)="onStatusValueChange($event)">
              <mat-chip-option value="all">All</mat-chip-option>
              <mat-chip-option value="Posted">Posted</mat-chip-option>
              <mat-chip-option value="Pending">Pending</mat-chip-option>
              <mat-chip-option value="Denied">Denied</mat-chip-option>
            </mat-chip-listbox>
          </div>

          <mat-form-field appearance="fill">
            <mat-label>Method</mat-label>
            <mat-select [(ngModel)]="methodFilter" (selectionChange)="applyFilters()">
              <mat-option value="">All</mat-option>
              <mat-option value="ACH">ACH</mat-option>
              <mat-option value="Card">Card</mat-option>
              <mat-option value="Check">Check</mat-option>
            </mat-select>
          </mat-form-field>

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
            <mat-card-title>Payments</mat-card-title>
            <mat-card-subtitle>Filtered by status and method</mat-card-subtitle>
          </div>
          <div class="last-updated">Updated just now</div>
        </div>

        <div class="table-wrap desktop-only">
          <table mat-table [dataSource]="dataSource" matSort class="hc-table">
            <ng-container matColumnDef="source">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Source</th>
              <td mat-cell *matCellDef="let row">
                <div class="cell-title">{{ row.source }}</div>
                <div class="cell-meta">{{ row.note }}</div>
              </td>
            </ng-container>
            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Amount</th>
              <td mat-cell *matCellDef="let row">{{ row.amount | currency:'USD':'symbol' }}</td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
              <td mat-cell *matCellDef="let row">
                <mat-chip class="status-chip" color="primary" selected>{{ row.status }}</mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="method">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Method</th>
              <td mat-cell *matCellDef="let row">{{ row.method }}</td>
            </ng-container>
            <ng-container matColumnDef="posted">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Posted</th>
              <td mat-cell *matCellDef="let row">{{ row.posted }}</td>
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
                <div class="fee-empty">No payments match your filters.</div>
              </td>
            </tr>
          </table>
          <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]"></mat-paginator>
        </div>
      </mat-card>

      <mat-card class="form-card mat-elevation-z2">
        <mat-card-title>{{ editIndex === null ? 'Add Payment' : 'Edit Payment' }}</mat-card-title>
        <div class="form-grid">
          <mat-form-field appearance="fill">
            <mat-label>Source</mat-label>
            <input matInput [(ngModel)]="form.source" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Amount</mat-label>
            <input matInput type="number" [(ngModel)]="form.amount" />
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Status</mat-label>
            <mat-select [(ngModel)]="form.status">
              <mat-option value="Posted">Posted</mat-option>
              <mat-option value="Pending">Pending</mat-option>
              <mat-option value="Denied">Denied</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Method</mat-label>
            <mat-select [(ngModel)]="form.method">
              <mat-option value="ACH">ACH</mat-option>
              <mat-option value="Card">Card</mat-option>
              <mat-option value="Check">Check</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Posted</mat-label>
            <input matInput [(ngModel)]="form.posted" placeholder="MM/DD" />
          </mat-form-field>
          <mat-form-field appearance="fill" class="full-width">
            <mat-label>Note</mat-label>
            <textarea matInput rows="2" [(ngModel)]="form.note"></textarea>
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
    :host { display: block; }
    .patients-page { display: grid; gap: 16px; padding: 12px; }
    .hero { display:flex; align-items:center; justify-content:space-between; padding:18px; border-radius:14px; background:linear-gradient(120deg,#2563eb,#60a5fa); color:#fff; }
    .hero-text { display:flex; align-items:center; gap:12px; }
    .hero-icon { width:54px; height:54px; border-radius:50%; background:rgba(255,255,255,0.15); display:grid; place-items:center; }
    .hero-icon .icon { width:28px; height:28px; }
    .eyebrow { text-transform: uppercase; letter-spacing:.08em; font-size:12px; margin:0; }
    h1 { margin:2px 0 4px; font-size:24px; }
    .subtitle { margin:0; opacity:0.9; }
    .record-btn { text-transform:none; display:inline-flex; align-items:center; gap:6px; }
    .btn-icon { display:inline-flex; width:18px; height:18px; }
    .btn-icon svg { width:18px; height:18px; }
    .summary-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); gap:10px; }
    .metric-card { display:flex; align-items:center; gap:10px; }
    .metric-icon { width:44px; height:44px; border-radius:10px; display:grid; place-items:center; background:linear-gradient(135deg,#1d4ed8,#3b82f6); color:#fff; }
    .metric-body .metric-label { text-transform:uppercase; font-size:11px; color:#64748b; letter-spacing:.06em; margin:0; }
    .metric-body .metric-value { margin:0; font-size:22px; font-weight:700; }
    .metric-body .metric-hint { margin:0; color:#94a3b8; }
    .filters-card { padding:12px; }
    .filter-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap:12px; align-items:center; }
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
    .form-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
    .form-actions { display:flex; gap:10px; margin-top:10px; }
    .action-row { display:flex; gap:6px; justify-content:flex-end; }
  `]
})
export class HcPaymentsComponent implements AfterViewInit {
  rows: PaymentRow[] = [
    { source: 'Blue Cross ERA', amount: 220000, status: 'Posted', method: 'ACH', posted: '11/28', note: 'Remit 8341' },
    { source: 'Patient pay', amount: 18000, status: 'Pending', method: 'Card', posted: '11/29', note: 'Front desk batch' },
    { source: 'Medicare EFT', amount: 145000, status: 'Posted', method: 'ACH', posted: '11/27', note: 'Batch 552' },
    { source: 'Workers comp', amount: 24000, status: 'Denied', method: 'Check', posted: '11/25', note: 'Appeal in review' }
  ];

  dataSource = new MatTableDataSource<PaymentRow>(this.rows);
  displayedColumns = ['source','amount','status','method','posted','actions'];
  metricCards = [
    { label: 'Total', value: '$0', meta: 'All payments' },
    { label: 'Posted', value: '$0', meta: 'Cleared' },
    { label: 'Pending/Denied', value: '$0', meta: 'Follow ups' }
  ];

  search = '';
  statusFilter: string = 'all';
  methodFilter: string = '';
  editIndex: number | null = null;
  form: PaymentRow = { source: '', amount: 0, status: 'Posted', method: 'ACH', posted: '', note: '' };

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
      const matchesTerm = !term || r.source.toLowerCase().includes(term) || (r.note || '').toLowerCase().includes(term);
      const matchesStatus = this.statusFilter === 'all' || r.status === this.statusFilter;
      const matchesMethod = !this.methodFilter || r.method === this.methodFilter;
      return matchesTerm && matchesStatus && matchesMethod;
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
    this.statusFilter = 'all';
    this.methodFilter = '';
    this.applyFilters();
  }

  onStatusValueChange(evt: any) {
    const val = evt?.value ?? evt?.source?.value ?? 'all';
    this.statusFilter = (val || 'all') as string;
    this.applyFilters();
  }

  refreshMetrics(): void {
    const data = this.dataSource.data;
    const total = data.reduce((sum, r) => sum + r.amount, 0);
    const posted = data.filter(r => r.status === 'Posted').reduce((s, r) => s + r.amount, 0);
    const pending = data.filter(r => r.status !== 'Posted').reduce((s, r) => s + r.amount, 0);
    this.metricCards = [
      { label: 'Total', value: this.formatCurrency(total), meta: 'All payments' },
      { label: 'Posted', value: this.formatCurrency(posted), meta: 'Cleared' },
      { label: 'Pending/Denied', value: this.formatCurrency(pending), meta: 'Follow ups' }
    ];
  }

  startAdd(): void {
    this.editIndex = null;
    this.form = { source: '', amount: 0, status: 'Posted', method: 'ACH', posted: '', note: '' };
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
      const globalIndex = this.rows.findIndex(r => r.source === target.source && r.posted === target.posted && r.amount === target.amount);
      if (globalIndex >= 0) {
        const updated = [...this.rows];
        updated[globalIndex] = { ...this.form };
        this.rows = updated;
      }
    }
    this.dataSource.data = [...this.rows];
    this.applyFilters();
    this.startAdd();
  }

  delete(index: number): void {
    const target = this.dataSource.data[index];
    this.rows = this.rows.filter(r => !(r.source === target.source && r.posted === target.posted && r.amount === target.amount));
    this.dataSource.data = [...this.rows];
    this.applyFilters();
  }

  private formatCurrency(val: number): string {
    return val.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  }
}
