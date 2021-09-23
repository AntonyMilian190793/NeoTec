<?php

//activamos el almacenamiento en el buffer
ob_start();
if(strlen(session_id())<1)
  session_start();

if (!isset($_SESSION["nombre"])) {
    echo 'Debe ingresar al sistema correctamente para visualizar el reporte.';
} else {

if($_SESSION['compras']==1){


//incluimos el archivo factura.php
require('Ingreso.php');

//establecemos los datos de la empresa
$logo="logo.png";
$ext_logo="png";
$empresa="Neo Tec Perú S.A.C";
$documento="2074633637773";
$direccion="Carlos gil 290, Chorrillos";
$telefono="993753004";
$email="antonymilian19@gmail.com";

//obtenemos los datos de la cabecera de la venta actual
require_once "../modelos/Ingreso.php";
$ingreso= new Ingreso();
$rsptav=$ingreso->ingresocabecera($_GET["id"]);

//recorremos todos los valores obtenidos
$regv = $rsptav->fetch_object();

//establecemos la configuracion de la factura
$pdf=new PDF_Invoice('P', 'mm', 'A4');
$pdf->AddPage();

//enviamos los datos de la empresa el metodo addSociete de la clase facvtura
$pdf->addSociete(utf8_decode($empresa),
                $documento."\n".
                utf8_decode("Dirección: ").$direccion."\n".
                utf8_decode("Teléfono: ").$telefono."\n".
                utf8_decode("Email: ").$email, $logo, $ext_logo);
$pdf->fact_dev( "$regv->tipo_comprobante ", "$regv->serie_comprobante-$regv->num_comprobante" );
$pdf->temporaire( "" );
$pdf->addDate($regv->fecha);


//enviamos los datpos del cliente al metodo addClienteadresse de la clase factura
$pdf->addClientadresse(utf8_decode($regv->cliente), "Domicilio: ".utf8_decode($regv->direccion), $regv->tipo_documento.": ".$regv->num_documento, "Email: ".$regv->email,
"Telefono: ".$regv->telefono);

//establecemos las columnas que va a tenrr la seccion donde mostramos los detalles de la venta
$cols=array( "CODIGO"=>24,
              "DESCRIPCION"=>77,
              "CANTIDAD"=>22,
              "P.U."=>25,
              "DSCTO"=>20,
              "SUBTOTAL"=>22);
$pdf->addCols($cols);

$cols=array("CODIGO"=>"L",
              "DESCRIPCION"=>"L",
              "CANTIDAD"=>"C",
              "P.U."=>"R",
              "DSCTO"=>"R",
              "SUBTOTAL"=>"C");
$pdf->addLineFormat($cols);
$pdf->addLineFormat($cols);

//actualizamos el valos de la coordenada "y" que sera la ubicacion desde donde empezaremos a mostrar los datos
$y=89;

//obtenemos todos los detalles de la venta actual
$rsptad=$ingreso->ingresodetalle($_GET["id"]);

while($regd=$rsptad->fetch_object()){
  $line=array("CODIGO"=> "$regd->codigo",
                "DESCRIPCION"=> utf8_decode("$regd->articulo"),
                "CANTIDAD"=>"$regd->cantidad",
                "P.U."=>"$regd->precio_venta",
                "DSCTO"=>"$regd->descuento",
                "SUBTOTAL"=>"$regd->subtotal");
                $size=$pdf->addLine($y, $line);
                $y +=$size+2;
}

//converitmos el total en letras
require_once "Letras.php";
$V=new EnLetras();
$con_letra=strtoupper($V->ValorEnLetras($regv->total_compra, "NUEVOS SOLES"));
$pdf->addCadreTVAs("--".$con_letra);

//mostramos el impuesto
$pdf->addTVAs($regv->impuesto, $regv->total_compra, "S/ ");
$pdf->addCadreEurosFrancs("IGV". "$regv->impuesto %" );
$pdf->Output('Reporte de Venta', 'I');

}else{
    echo 'No tiene persmiso para visualizar el reporte.';
}
}
  ob_end_flush();
?>
