<?php

//activamos el almacenamiento en el buffer
ob_start();
if(strlen(session_id())<1)
  session_start();

if (!isset($_SESSION["nombre"])) {
    echo 'Debe ingresar al sistema correctamente para visualizar el reporte.';
} else {

if($_SESSION['almacen']==1){

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
$pdf->Cell(100, 6, 'LISTA DE CATEGORIAS', 1, 0, 'C');
$pdf->Ln(10);

//creamos las celadas para los titulos de cada columna y le asignamos un fondo gris y el tipo de letra
$pdf->SetFillColor(232, 232, 2323);
$pdf->SetFont('Arial', 'B' ,10);
$pdf->Cell(70, 6, 'Nombre', 1, 0, 'C', 1);
$pdf->Cell(115, 6, utf8_decode('Descripción'), 1, 0, 'C', 1);
$pdf->Ln(10);

//creamos las filas de los registros sugun la consulta de mysql
require_once "../modelos/Categoria.php";
$categoria=new Categoria();

$rspta= $categoria->listar();

//implementamos las celdas de la tab;a con los registros a mostrar
$pdf->SetWidths(array(70, 115));

while($reg=$rspta->fetch_object()){
  $nombre=$reg->nombre;
  $descripcion=$reg->descripcion;

  $pdf->SetFont('Arial', '' , 10);
  $pdf->Row(array(utf8_decode($nombre), utf8_decode($descripcion)));
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
