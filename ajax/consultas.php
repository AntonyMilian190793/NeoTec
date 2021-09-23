<?php
ob_start();
if (strlen(session_id()) < 1){
	session_start();//validamos si existe o no la sesión
}
if (!isset($_SESSION["nombre"])){
  header("Location: ../vistas/login.html");//validamos el acceso solo a los usuarios logueados al sistema
}else{
//validamos el acceso solo al usuario logueado y autorizado
if ($_SESSION['consultac']==1 || $_SESSION['consultav']==1){
  
require_once "../modelos/Consultas.php";

$consulta=new Consultas();


switch ($_GET["op"]) {

    case 'comprasfecha':

        $fecha_inicio=$_REQUEST["fecha_inicio"];
        $fecha_fin=$_REQUEST["fecha_fin"];

        $rspta=$consulta->comprasfecha($fecha_inicio, $fecha_fin);
        //declaramor un array
        $data= array();

        while ($reg=$rspta->fetch_object()) {
            $data[]=array(
                "0"=>$reg->fecha,
                "1"=>$reg->usuario,
                "2"=>$reg->proveedor,
                "3"=>$reg->tipo_comprobante,
                "4"=>$reg->serie_comprobante. ' ' .$reg->num_comprobante,
                "5"=>$reg->total_compra,
                "6"=>$reg->impuesto,
                "7"=>($reg->estado=='Aceptado')?'<span class="label bg-green">Aceptado</span>':
                                                 '<span class="label bg-red">Anuldado</span>'
                );
        }
        $results = array(
            "sEcho"=>1, //información para el datatables
            "iTotalRecords"=>count($data), //enviamos el total registros al datatable
            "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
            "aaData"=>$data);
        echo json_encode($results);

    break;

    case 'ventasfechacliente':

        $fecha_inicio=$_REQUEST["fecha_inicio"];
        $fecha_fin=$_REQUEST["fecha_fin"];
        $idcliente=$_REQUEST["idcliente"];

        $rspta=$consulta->ventasfechacliente($fecha_inicio, $fecha_fin, $idcliente);
        //declaramor un array
        $data= array();

        while ($reg=$rspta->fetch_object()) {
            $data[]=array(
                "0"=>$reg->fecha,
                "1"=>$reg->usuario,
                "2"=>$reg->cliente,
                "3"=>$reg->tipo_comprobante,
                "4"=>$reg->serie_comprobante. ' ' .$reg->num_comprobante,
                "5"=>$reg->total_venta,
                "6"=>$reg->impuesto,
                "7"=>($reg->estado=='Aceptado')?'<span class="label bg-green">Aceptado</span>':
                                                 '<span class="label bg-red">Anuldado</span>'
                );
        }
        $results = array(
            "sEcho"=>1, //información para el datatables
            "iTotalRecords"=>count($data), //enviamos el total registros al datatable
            "iTotalDisplayRecords"=>count($data), //enviamos el total registros a visualizar
            "aaData"=>$data);
        echo json_encode($results);

    break;
}
//fin de las validaciones de acceso
}else{
  require 'noacceso.php';
  }
}
ob_end_flush();

?>
