<?php

//activamos el almacenamiento en el buffer
ob_start();
if(strlen(session_id())<1)
  session_start();

if (!isset($_SESSION["nombre"])) {
    echo 'Debe ingresar al sistema correctamente para visualizar el reporte.';
} else {

if($_SESSION['compras']==1){

//incluimos a la clase PDF_MC_Table
require('PDF_MC_Table.php');

//instanciamos la clase para generar el documento pdf
$pdf=new PDF_MC_Table();

//agregamos la primera pagina al documento pdf
$pdf->AddPage();

//seteamos el inicio del margen superior en 25 pixeles
$y_axis_initial=25;

//seteamos el tipo de letra y creamos el titulo de la pagina, no es un emcabezado
$pdf->SetFont('Arial', 'B', '12');

$pdf->Cell(40, 6, '', 0, 0, 'C');
$pdf->Cell(100, 6, 'LISTA DE PROVEEDORES', 1, 0, 'C');
$pdf->Ln(10);

//creamos las celadas para los titulos de cada columna y le asignamos un fondo gris y el tipo de letra
$pdf->SetFillColor(232, 232, 2323);
$pdf->SetFont('Arial', 'B' ,10);
$pdf->Cell(58, 6, 'Nombre', 1, 0, 'C', 1);
$pdf->Cell(30, 6, 'Documento', 1, 0, 'C', 1);
$pdf->Cell(25, 6, utf8_decode('Número'), 1, 0, 'C', 1);
$pdf->Cell(32, 6, utf8_decode('Teléfono'), 1, 0, 'C', 1);
$pdf->Cell(40, 6, 'Email', 1, 0, 'C', 1);
$pdf->Ln(10);

//creamos las filas de los registros sugun la consulta de mysql
require_once "../modelos/Persona.php";
$persona=new Persona();

$rspta= $persona->listarp();

//implementamos las celdas de la tab;a con los registros a mostrar
$pdf->SetWidths(array(58, 30, 25, 32, 40));

while($reg=$rspta->fetch_object()){
  $nombre=$reg->nombre;
  $tipo_documento=$reg->tipo_documento;
  $num_documento=$reg->num_documento;
  $telefono=$reg->telefono;
  $email=$reg->email;

  $pdf->SetFont('Arial', '' , 10);
  $pdf->Row(array(utf8_decode($nombre), $tipo_documento, $num_documento, utf8_decode($telefono), $email));
}

//mostramos el documento pdf
$pdf->Output();

?>
<?php

}else{
  echo 'No tiene persmiso para visualizar el reporte.';
}
}
ob_end_flush();
?>
