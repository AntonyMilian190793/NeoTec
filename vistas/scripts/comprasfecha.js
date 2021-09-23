var tabla;

//funcion que se ejecuta al inicia
function init() {
  listar();
  $("#fecha_inicio").change(listar);
  $("#fecha_fin").change(listar);
}

//funcion listar
function listar() {
  var fecha_inicio=$("#fecha_inicio").val();
  var fecha_fin=$("#fecha_fin").val();

  tabla = $('#tbllistado').dataTable({
    "lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
    "aProcessing": true, //activamos el procesamiento de databbles
    "aServerSide": true, //paginacion y filtrado realizadosp por el servidor
    dom: '<Bl<f>rtip>', //definimos los elementos del control de la tabla
    buttons: [
      'copyHtml5',
      'excelHtml5',
      'csvHtml5',
      'pdf'
    ],
    "ajax": {
      url: '../ajax/consultas.php?op=comprasfecha',
      data:{fecha_inicio: fecha_inicio, fecha_fin: fecha_fin},
      type: "get",
      dataType: "json",
      error: function(e) {
        console.log(e.responseText);
      }
    },
    "language":{
      "lengthMenu": "Mostrar : _MENU_ registros",
      "buttons":{
      "copyTitle": "Tabla Copiada",
      "copySuccess":{
              _: '% líneas copiadas',
              1: '1 línea copiada'
        }
      }
    },
    "bDestroy": true,
    "iDisplayLength": 5, //paginacion
    "order": [
      [0, "desc"]
    ] //ordenar (columna,orden)
  }).DataTable();
}

init();
