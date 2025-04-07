import { Component, OnInit, PipeTransform } from '@angular/core';
import { TableDinamicoService } from '../../componentes/table-dinamico/table-dinamico.service';
import { ApiMateriaProfesorService } from '../../services/ApiMateriaProfesor.service';
import { CrudMaestroProfesor } from '../../swagger/ApiMateriasProfesor/parametros/CrudMaestroProfesor';
import { RespuestaApi } from '../../swagger/ApiMateriasProfesor/models/RespuestaApi';
import { HttpStatusCode } from '@angular/common/http';
import { lista_IndicePaginador } from '../../../environments/environment';
import { ModalMateriaEstudiantesComponent } from '../../componentes/modal-materia-estudiantes/modal-materia-estudiantes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInformativoErrorComponent } from '../../componentes/modal-informativo-error/modal-informativo-error.component';
import { ModalDeNotificacionComponent } from '../../componentes/modal-de-notificacion/modal-de-notificacion.component';

@Component({
  selector: 'app-materia-profesor',
  templateUrl: './materia-profesor.component.html',
  styleUrl: './materia-profesor.component.css'
})
export class MateriaProfesorComponent implements OnInit, PipeTransform {



  constructor(
    private tablaDinamic: TableDinamicoService,
    private apiServiceMateriaProfesor: ApiMateriaProfesorService,
    private modalService: NgbModal,
  ) { }

  transform(datos: any): number {
    let Id = sessionStorage.getItem("Id_Usuario");
    let IdUsuario: number = Id !== null ? Number(Id) : 0;
    let conteo = datos?.filter((item: { idProfesor: number; }) => item.idProfesor === IdUsuario).length || 0;
    return conteo;
  }

  // Propiedades para la paginación y filtros
  totalRegistro?: null | number = 0;
  itemsPerPage: number = 0;
  currentPage: number = 1;
  tableSizes: any = lista_IndicePaginador;
  MateriasAsignadas: number = 0;
  accion: string = '';

  // Variable con el contenido original
  listadetalleTmp: any = {};

  // Variables para la visualización de datos en la tabla dinámica
  datos_dinamicos_table: any = { aplica_check: false, header: [], body: [] };


  ngOnInit(): void {
    let crud: CrudMaestroProfesor = {
      estado: true,
      idMateria: 0,
      idProfesor: 0,
      opcion: 2,
    }
    this.ListadoMaterias(crud)
  }

  ListadoMaterias(crud: CrudMaestroProfesor) {

    this.apiServiceMateriaProfesor.IUMateriaProfesor(crud)
      .then((respuestaApi: RespuestaApi | undefined) => {
        if (respuestaApi) {
          if (respuestaApi.codigoEstado == HttpStatusCode.Ok) {

            let datos: any = respuestaApi.valores;
           // console.log(datos);
            this.MateriasAsignadas = this.transform(datos)
            this.totalRegistro = datos.lenght;
            this.listadetalleTmp = datos;
            // Llama los métodos de consumo y asignación de datos apra la grilla
            this.PintarTabla(this.listadetalleTmp);
          }
          else {
            const modalRefRegister = this.ModalConfirmation("info", respuestaApi.mensaje);
            modalRefRegister.componentInstance.confirmation.subscribe((result: boolean) => {
              modalRefRegister.close();
            });

          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener la información de la guía:", error);
      })

  }

  PintarTabla(_arreglo: any) {

    const _body: any[] = [];

    _arreglo.forEach((element: any) => {
      _body.push({
        Materia: element.materia,
        estado: element.estado,
        nombreDocente: element.nombreDocente,
        id: element.idMateria
      });
    });

    this.datos_dinamicos_table = {
      aplica_check: false,
      cuenta_acciones: true,
      aplica_historico: true,
      elimina_registro: true,
      aplica_edicion: true,
      header: [
        { Titulo: "Materia" },
        { Titulo: "Estado" },
        { Titulo: "Docente" },
      ],
      body: _body,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,

    }

    this.tablaDinamic.setDatos(this.datos_dinamicos_table);

  }


  VisualizarIdMateria(datos: { _id: number; }) {
    const activeModal = this.modalService.open(ModalMateriaEstudiantesComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });

    activeModal.componentInstance._datosdetalle = {
      idMateria: datos._id,
    };

    activeModal.componentInstance.confirmation.subscribe((data: { confirmacion: boolean }) => {
      activeModal.close();
    });
  }

  AsignacionMateria(datos: { _id: number; }) {
    let Id = sessionStorage.getItem("Id_Usuario");
    let IdUsuario: number = Id !== null ? Number(Id) : 0;
    let IdMateria = datos._id
    let crud: CrudMaestroProfesor = {
      estado: true,
      idMateria: IdMateria,
      idProfesor: IdUsuario,
      opcion: 1,
    }
    if (this.MateriasAsignadas < 2) {
      this.ListadoMaterias(crud)
    }
    else {
      let mensaje_personalizado : string ='';
      mensaje_personalizado = `<div class="alineacion-texto"><span class="texto-title-msj"><p>Error: no puede seleccionar mas clases de las permitidas, `+
      `debe desasignar una de las clases ya tomadas.</p></span><br><br>`+
                               `</div>`;
       const modalRefRegister = this.ModalConfirmation("html", mensaje_personalizado);
       modalRefRegister.componentInstance.confirmation.subscribe((result: boolean) => {
         modalRefRegister.close();
       });
    }

  }

  EliminarMateria(datos: { _id: number; }) {
    let Id = sessionStorage.getItem("Id_Usuario");
    let IdUsuario: number = Id !== null ? Number(Id) : 0;
    let IdMateria = datos._id
    let crud: CrudMaestroProfesor = {
      estado: false,
      idMateria: IdMateria,
      idProfesor: IdUsuario,
      opcion: 1,
    }
    this.ListadoMaterias(crud)
  }


  // Método para invocar el modal informativo de mensajes
  ModalConfirmation(type: string, message?: string | null) {
    const modalRef = this.modalService.open(ModalDeNotificacionComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.type = type;
    modalRef.componentInstance.texto_confirmacion = message;

    return modalRef;
  }
}
