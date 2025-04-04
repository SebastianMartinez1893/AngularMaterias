$.datepicker.regional['es'] = {
  closeText: 'Cerrar',
  prevText: '< Ant',
  nextText: 'Sig >',
  currentText: 'Hoy',
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
  dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
  weekHeader: 'Sm',
  dateFormat: ' dd/mm/yy',
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['es']);
$(function () {         
    $("#datepicker").datepicker({              
      dateFormat: 'dd-mm-yy',
    //selectOtherMonths: true
    //showButtonPanel: true,
      showOn: 'both',
      buttonImage: "img/icon/calendar.svg",
      buttonImageOnly: true,
      changeYear: true,
      numberOfMonths: 1,
      onSelect: function(textoFecha, objDatepicker){
        $("#mensaje").html("<p>Has seleccionado: " + textoFecha + "</p>");
      }
    }).val()         

});
