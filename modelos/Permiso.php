<?php
//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";

class Permiso
{
    //Implementamos nuestro constructor
    public function __construct(){
    }

    //Implementar un método para listar los permisos
    public function listar(){
        $sql="SELECT * FROM permiso";
        return ejecutarConsulta($sql);
    }
}
?>
