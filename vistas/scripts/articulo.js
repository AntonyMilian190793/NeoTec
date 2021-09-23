var tabla;

//funcion que se ejecuta al inicia
function init() {
  mostrarform(false);
  listar();

  $("#formulario").on("submit", function(e) {
    guardaryeditar(e);
  })

  //cargamos los items al select categoria
  $.post("../ajax/articulo.php?op=selectCategoria", function(r) {
    $("#idcategoria").html(r);
    $('#idcategoria').selectpicker('refresh');
  });
  $("#imagenmuestra").hide();
}

//funcion limpiar
function limpiar() {
  $("#codigo").val("");
  $("#nombre").val("");
  $("#descripcion").val("");
  $("#stock").val("");
  $("#imagenmuestra").attr("src", "");
  $("#imagenactual").val("");
  $("#print").hide();
  $("#idarticulo").val("");
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
      url: '../ajax/articulo.php?op=listar',
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
    url: "../ajax/articulo.php?op=guardaryeditar",
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

function mostrar(idarticulo) {
  $.post("../ajax/articulo.php?op=mostrar", {
    idarticulo: idarticulo
  }, function(data, status) {
    data = JSON.parse(data);
    mostrarform(true);

    $("#idcategoria").val(data.idcategoria);
    $('#idcategoria').selectpicker('refresh');
    $("#codigo").val(data.codigo);
    $("#nombre").val(data.nombre);
    $("#stock").val(data.stock);
    $("#descripcion").val(data.descripcion);
    $("#imagenmuestra").show();
    $("#imagenmuestra").attr("src", "../files/articulos/" + data.imagen);
    $("#imagenactual").val(data.imagen);
    $("#idarticulo").val(data.idarticulo);
    generarbarcode();

  })
}

//funcion para desactivar listado registros
function desactivar(idarticulo) {
  bootbox.confirm("¿Está seguro de desactivar el Artículo?", function(result) {
    if (result) {
      $.post("../ajax/articulo.php?op=desactivar", {
        idarticulo: idarticulo
      }, function(e) {
        bootbox.alert(e);
        tabla.ajax.reload();
      });
    }
  })
}

//funcion para activar listado registros
function activar(idarticulo) {
  bootbox.confirm("¿Está seguro de activar el Artículo?", function(result) {
    if (result) {
      $.post("../ajax/articulo.php?op=activar", {
        idarticulo: idarticulo
      }, function(e) {
        bootbox.alert(e);
        tabla.ajax.reload();
      });
    }
  })
}

//funcion para generar el codigo de barras
function generarbarcode() {
  codigo = $("#codigo").val();
  JsBarcode("#barcode", codigo);
  $("#print").show();
}

//funcion para imprimir el codigo de barras
function imprimir() {
  $("#print").printArea();
}


init();
