import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private route : Router){}

  ngOnInit(): void {
    let rol = sessionStorage.getItem("Rol"); 
    if (rol=="1")
    {
      this.route.navigate(['/MateriaProfesor']);
    }
    else{
      this.route.navigate(['/MateriaEstudiante']);
    }
  }

}
