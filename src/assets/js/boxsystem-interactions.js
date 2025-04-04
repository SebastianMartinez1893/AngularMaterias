// Inicio funciones mostrar/ocultar menú lateral en móviles
function sidebarMobile() {
    document.getElementsByClassName('sidebar-container')[0].classList.toggle("show-mobile");
    document.getElementsByClassName('background-sidebar-mobile')[0].classList.toggle("hide");
}
function sidebarBackgroundMobile() {
    document.getElementsByClassName('sidebar-container')[0].classList.toggle("show-mobile");
    document.getElementsByClassName('background-sidebar-mobile')[0].classList.toggle("hide");
}
// Fin funciones mostrar/ocultar menú lateral en móviles

// Inicio funciones mostrar/ocultar menú lateral de ejemplo en móviles
function sidebarMobileExample() {
    document.getElementsByClassName('component-example')[0].classList.toggle("show-mobile");
}
// Fin funciones mostrar/ocultar menú lateral de ejemplo en móviles

// Inicio colapsar menú lateral
function collapseSideBar() {
    document.getElementsByClassName('sidebar-container')[0].classList.toggle("collapsed-sidebar");
    document.getElementsByClassName('box-system-content')[0].classList.toggle("full-width");
}
// Fin colapsar menú lateral

// Inicio colapsar menú lateral de ejemplo
function collapseSideBarExample() {
    document.getElementsByClassName('component-example')[0].classList.toggle("collapsed-sidebar");
}
// Fin colapsar menú lateral

// Inicio descolapsar menú lateral con los iconos
function uncollapseSideBar() {
    document.getElementsByClassName('sidebar-container')[0].classList.remove("collapsed-sidebar");
}
// Fin descolapsar menú lateral con los iconos

// Inicio Selección múltiple
$(document).ready(function() {
    $('#example-getting-started').multiselect({
        enableHTML: true
    });
});
$(document).ready(function () {
    $(".multiselect").click(function(){
      $('.multiselect-container').toggleClass('show');
    });
});
$(document).click(function(e){
    if(!$(e.target).closest('.multiselect-native-select').length){
        $('.multiselect-container').removeClass('show');
    }
})