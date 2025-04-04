import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-de-notificacion',
  templateUrl: './modal-de-notificacion.component.html',
  styleUrl: './modal-de-notificacion.component.css'
})
export class ModalDeNotificacionComponent implements OnInit{


  //Arreglo para obtener los datos enviados desde componente para la visualización de data del modal
  texto_confirmacion : any = {};
  proceso_confirmacion : boolean = false;


  // Emisores de eventos para confirmación modal y confirmación general
  @Output() confirmation = new EventEmitter<boolean>();

  // Entradas desde el componente padre
  @Input() message: string = "";
  @Input() type?: string | any = "success";


   ngOnInit(): void {
    this.message = this.texto_confirmacion;
  }

  
  // cierra el modal 
  onConfirm(confirm: boolean) {
    this.confirmation.emit(confirm);
  }
}

