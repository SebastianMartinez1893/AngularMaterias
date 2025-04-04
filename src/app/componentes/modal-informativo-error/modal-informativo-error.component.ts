import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-informativo-error',
  templateUrl: './modal-informativo-error.component.html',
  styleUrl: './modal-informativo-error.component.css'
})
export class ModalInformativoErrorComponent {

  // Evento de salida para confirmación
  @Output() confirmation = new EventEmitter<{ confirm: boolean, tipo: string }>();

  // Método para cerrar el modal y emitir confirmación
  CloseModal(confirm: boolean) {
    this.confirmation.emit({ confirm: confirm, tipo: "" });
  }
}
