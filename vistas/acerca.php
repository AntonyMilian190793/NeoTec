<?php

//activamos el almacenamiento en el buffer
ob_start();
session_start();

if (!isset($_SESSION["nombre"])) {
    header("Location: login.html");
} else {
require 'header.php';

?>
<!--Contenido-->
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header with-border">
            <h1 class="box-title">Acerca de</h1>
            <div class="box-tools pull-right">
            </div>
          </div>

          <!-- /.box-header -->
          <!-- centro -->
          <div class="panel-body">
            <h4>Proyecto: </h4><p>NeoTec 3.0.1 - Sistema de ventas, compras y almacén</p>
            <h4>Empresa : </h4><p>Antony Milian S.A.C</p>
            <h4>Canal de Youtube</h4><a href="https://www.youtube.com/jorgeantonymilianmontalvo" target="_blank"><p>www.youtube.com/jorgeantonymilianmontalvo</p></a>
          </div>
          <!--Fin centro -->
        </div><!-- /.box -->
    </div><!-- /.col -->
</div><!-- /.row -->
</section><!-- /.content -->

</div><!-- /.content-wrapper -->
<!--Fin-Contenido-->

<?php
require 'footer.php';
?>
<?php
}
ob_end_flush();
?>
