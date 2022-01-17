import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { PasswordRenewalComponent } from './components/password-renewal/password-renewal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageGaleryComponent } from './components/image-galery/image-galery.component';
import { PieChartComponent } from './components/piechart/piechart.component';
import { AuthenticationService } from './services/authentication.service';
import { RulesComponent } from './components/rules/rules.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    MainMenuComponent,
    SideMenuComponent,
    PasswordRenewalComponent,
    PieChartComponent,
    FooterComponent,
    ImageGaleryComponent,
    RulesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthenticationComponent,
    FooterComponent,
    ImageGaleryComponent,
    MainMenuComponent,
    PieChartComponent,
    SideMenuComponent
  ]
})
export class CommonsModule { }
