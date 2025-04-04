import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDinamicoService {

  constructor() { }
  
  private datosSubject = new Subject<any>();

  setDatos(datos: any) {
    this.datosSubject.next(datos);
  }

  getDatosObservable(): Observable<any> {
    return this.datosSubject.asObservable();
  }
}
