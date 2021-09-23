var tabla;

//funcion que se ejecuta al inicia
function init() {
  mostrarform(false);
  listar();

  $("#formulario").on("submit", function(e) {
    guardaryeditar(e);
  })

  $("#imagenmuestra").hide();
  //mostramos los permisos
  $.post("../ajax/usuario.php?op=permisos&id=", function(r) {
    $("#permisos").html(r);
  });
}

//funcion limpiar
function limpiar() {
  $("#nombre").val("");
  $("#num_documento").val("");
  $("#direccion").val("");
  $("#telefono").attr("src", "");
  $("#email").val("");
  $("#cargo").val("");
  $("#login").val("");
  $("#clave").val("");
  $("#imagenmuestra").attr("src", "");
  $("#imagenactual").val("");
  $("#idusuario").val("");
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
      url: '../ajax/usuario.php?op=listar',
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
    url: "../ajax/usuario.php?op=guardaryeditar",
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

function mostrar(idusuario) {
  $.post("../ajax/usuario.php?op=mostrar", {
    idusuario: idusuario
  }, function(data, status) {
    data = JSON.parse(data);
    mostrarform(true);

    $("#nombre").val(data.nombre);
    $("#tipo_documento").val(data.tipo_documento);
    $("#tipo_documento").selectpicker('refresh');
    $("#num_documento").val(data.num_documento);
    $("#direccion").val(data.direccion);
    $("#telefono").val(data.telefono);
    $("#email").val(data.email);
    $("#cargo").val(data.cargo);
    $("#login").val(data.login);
    $("#clave").val(data.clave);
    $("#imagenmuestra").show();
    $("#imagenmuestra").attr("src", "../files/usuarios/" + data.imagen);
    $("#imagenactual").val(data.imagen);
    $("#idusuario").val(data.idusuario);

  });
  $.post("../ajax/usuario.php?op=permisos&id=" + idusuario, function(r) {
    $("#permisos").html(r);
  });
}

//funcion para desactivar listado registros
function desactivar(idusuario) {
  bootbox.confirm("¿Está seguro de desactivar el Usuario?", function(result) {
    if (result) {
      $.post("../ajax/usuario.php?op=desactivar", {
        idusuario: idusuario
      }, function(e) {
        bootbox.alert(e);
        tabla.ajax.reload();
      });
    }
  })
}

//funcion para activar listado registros
function activar(idusuario) {
  bootbox.confirm("¿Está seguro de activar el Usuario?", function(result) {
    if (result) {
      $.post("../ajax/usuario.php?op=activar", {
        idusuario: idusuario
      }, function(e) {
        bootbox.alert(e);
        tabla.ajax.reload();
      });
    }
  })
}
init();
