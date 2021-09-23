var tabla;

//funcion que se ejecuta al inicia
function init() {
  mostrarform(false);
  listar();

  $("#formulario").on("submit", function(e) {
    guardaryeditar(e);
  })
}

//funcion limpiar
function limpiar() {
  $("#idcategoria").val("");
  $("#nombre").val("");
  $("#descripcion").val("");
}

//funcion mostrar formulario
function mostrarform(flag) {
  limpiar();
  if (flag) {
    $("#listadoregistros").hide();
    $("#formularioregistros").show();
    $("#btnGuardar").prop("disabled", false);
    $("#btnagregar").hide();
  } else {
    $("#listadoregistros").show();
    $("#formularioregistros").hide();
    $("#btnagregar").show();
  }
}

//funcion cancelarform
function cancelarform() {
  limpiar();
  mostrarform(false);
}

//funcion listar
function listar() {
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
      url: '../ajax/categoria.php?op=listar',
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

function guardaryeditar(e) {
  e.preventDefault(); //No se activará la acción predeterminada del evento
  $("#btnGuardar").prop("disabled", true);
  var formData = new FormData($("#formulario")[0]);

  $.ajax({
    url: "../ajax/categoria.php?op=guardaryeditar",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,

    success: function(datos) {
      bootbox.alert(datos);
      mostrarform(false);
      tabla.ajax.reload();
    }

  });
  limpiar();
}

function mostrar(idcategoria) {
  $.post("../ajax/categoria.php?op=mostrar", {
    idcategoria: idcategoria
  }, function(data, status) {
    data = JSON.parse(data);
    mostrarform(true);

    $("#nombre").val(data.nombre);
    $("#descripcion").val(data.descripcion);
    $("#idcategoria").val(data.idcategoria);

  })
}

//funcion para desactivar listado registros
function desactivar(idcategoria) {
  bootbox.confirm("¿Está seguro de desactivar la Categoría?", function(result) {
    if (result) {
      $.post("../ajax/categoria.php?op=desactivar", {
        idcategoria: idcategoria
      }, function(e) {
        bootbox.alert(e);
        tabla.ajax.reload();
      });
    }
  })
}

//funcion para activar listado registros
function activar(idcategoria) {
  bootbox.confirm("¿Está seguro de activar la Categoría?", function(result) {
    if (result) {
      $.post("../ajax/categoria.php?op=activar", {
        idcategoria: idcategoria
      }, function(e) {
        bootbox.alert(e);
        tabla.ajax.reload();
      });
    }
  })
}


init();
