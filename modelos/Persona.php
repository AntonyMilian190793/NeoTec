<?php
//Incluímos inicialmente la conexión a la base de datos
require "../config/Conexion.php";

class Persona
{
    //Implementamos nuestro constructor
    public function __construct(){
    }

    //Implementamos un método para insertar persona
    public function insertar($tipo_persona, $nombre, $tipo_documento, $num_documento, $direccion, $telefono, $email){
        $sql="INSERT INTO persona (tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email)
		VALUES ('$tipo_persona', '$nombre', '$tipo_documento', '$num_documento', '$direccion', '$telefono', '$email')";
        return ejecutarConsulta($sql);
    }

    //Implementamos un método para editar persona
    public function editar($idpersona, $tipo_persona, $nombre, $tipo_documento, $num_documento, $direccion, $telefono, $email){
        $sql="UPDATE persona SET tipo_persona='$tipo_persona', nombre='$nombre', tipo_documento='$tipo_documento', num_documento='$num_documento',
		direccion='$direccion', telefono='$telefono', email='$email' WHERE idpersona='$idpersona'";
        return ejecutarConsulta($sql);
    }

    //Implementamos un método para eliminar personas
    public function eliminar($idpersona){
        $sql="DELETE FROM persona WHERE idpersona='$idpersona'";
        return ejecutarConsulta($sql);
    }

    //Implementar un método para mostrar los datos de las persona
    public function mostrar($idpersona){
        $sql="SELECT * FROM persona WHERE idpersona='$idpersona'";
        return ejecutarConsultaSimpleFila($sql);
    }

    //Implementar un método para listar proveedores  de las parsonas
    public function listarp(){
        $sql="SELECT * FROM persona WHERE tipo_persona='Proveedor'";
        return ejecutarConsulta($sql);
    }

    //Implementar un método para listar clientes de las personas
    public function listarc(){
        $sql="SELECT * FROM persona WHERE tipo_persona='Cliente'";
        return ejecutarConsulta($sql);
    }
}
?>
