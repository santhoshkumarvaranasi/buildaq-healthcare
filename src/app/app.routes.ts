import { Routes } from '@angular/router';
import { HealthcareDashboardComponent } from './healthcare-dashboard/healthcare-dashboard';
import { HcPatientsComponent } from './features/patients/patients.component';
import { HcAppointmentsComponent } from './features/appointments/appointments.component';
import { HcBedsComponent } from './features/beds/beds.component';
import { HcBillingComponent } from './features/billing/billing.component';
import { HcAnnouncementsComponent } from './features/announcements/announcements.component';
import { HcClaimsComponent } from './features/claims/claims.component';
import { HcPaymentsComponent } from './features/payments/payments.component';
import { HcRemindersComponent } from './features/reminders/reminders.component';
import { HcClinicalNotesComponent } from './features/clinical-notes/clinical-notes.component';
import { HcInventoryComponent } from './features/inventory/inventory.component';
import { HcStaffingComponent } from './features/staffing/staffing.component';
import { HcNotificationsComponent } from './features/notifications/notifications.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HealthcareDashboardComponent },
  { path: 'patients', component: HcPatientsComponent },
  { path: 'appointments', component: HcAppointmentsComponent },
  { path: 'beds', component: HcBedsComponent },
  { path: 'billing', component: HcBillingComponent },
  { path: 'claims', component: HcClaimsComponent },
  { path: 'payments', component: HcPaymentsComponent },
  { path: 'reminders', component: HcRemindersComponent },
  { path: 'clinical-notes', component: HcClinicalNotesComponent },
  { path: 'inventory', component: HcInventoryComponent },
  { path: 'staffing', component: HcStaffingComponent },
  { path: 'notifications', component: HcNotificationsComponent },
  { path: 'announcements', component: HcAnnouncementsComponent },
  { path: '**', redirectTo: 'dashboard' }
];
