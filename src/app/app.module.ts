import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalInformativoErrorComponent } from './componentes/modal-informativo-error/modal-informativo-error.component';
import { ModalDeNotificacionComponent } from './componentes/modal-de-notificacion/modal-de-notificacion.component';
import { HomeComponent } from './pages/home/home.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
// Importar módulos de Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MateriaProfesorComponent } from './pages/materia-profesor/materia-profesor.component';
import { MateriaEstudianteComponent } from './pages/materia-estudiante/materia-estudiante.component';
import { TableDinamicoComponent } from './componentes/table-dinamico/table-dinamico.component';
import { ModalMateriaEstudiantesComponent } from './componentes/modal-materia-estudiantes/modal-materia-estudiantes.component';
import { TableDinamicoModalComponent } from './componentes/table-dinamico-modal/table-dinamico-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ModalInformativoErrorComponent,
    ModalDeNotificacionComponent,
    HomeComponent,
    EncabezadoComponent,
    MateriaProfesorComponent,
    MateriaEstudianteComponent,
    TableDinamicoComponent,
    ModalMateriaEstudiantesComponent,
    TableDinamicoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,  // <-- Importa este módulo
    MatInputModule,       // <-- Importa este módulo si usas <input>
    MatButtonModule    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
