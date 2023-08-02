import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatSnackBarModule, MatTooltipModule,
    MatButtonToggleModule,
    MatDialogModule, MatInputModule, MatIconModule, MatToolbarModule, MatSlideToggleModule, MatListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule, MatSnackBarModule, MatTooltipModule,
    MatButtonToggleModule,
    MatDialogModule, MatInputModule, MatIconModule, MatToolbarModule, MatSlideToggleModule, MatListModule],
})
export class AppMaterialModule {
}
