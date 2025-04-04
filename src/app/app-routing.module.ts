import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { MateriaProfesorComponent } from './pages/materia-profesor/materia-profesor.component';
import { MateriaEstudianteComponent } from './pages/materia-estudiante/materia-estudiante.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' }, // Redirige a Login
   { path: 'Login', component: LoginComponent }, // Carga el componente Login
   { path: 'Home', component: HomeComponent }, // Carga el componente Inicio
   { path: 'MateriaProfesor', component: MateriaProfesorComponent }, // Carga el componente Usuarios
   { path: 'MateriaEstudiante', component: MateriaEstudianteComponent }, // Carga el componente Evento
  { path: 'Registro', component: RegistroComponent }, // Carga el componente Registro
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
