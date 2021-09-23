var tabla;

//funcion que se ejecuta al inicia
function init() {
  listar();
  $.post("../ajax/venta.php?op=selectCliente", function(r){
              $("#idcliente").html(r);
              $('#idcliente').selectpicker('refresh');
  });
}

//funcion listar
function listar() {
  var fecha_inicio=$("#fecha_inicio").val();
  var fecha_fin=$("#fecha_fin").val();
  var idcliente=$("#idcliente").val();

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
      url: '../ajax/consultas.php?op=ventasfechacliente',
      data:{fecha_inicio: fecha_inicio, fecha_fin: fecha_fin, idcliente: idcliente},
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
