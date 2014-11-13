var url_base = "http://localhost:54325/v1/";
function borrarTabla() {
    $("tbody").find("tr").remove();

}

function escribirFila(dato) {

    var fila = "<tr><td>" + dato.nombre + "</td>";
    fila += "<td>" + dato.salario + "</td>";
    fila += "<td>" + dato.NombreCargo + "</td>";
    fila += "<td><ul>";
    for (var i = 0; i < dato.Proyectos.length; i++) {

        fila += "<li><a href='#' onclick='detalleProyecto(" + dato.Proyectos[i].idProyecto + ")'>";
        fila += dato.Proyectos[i].nombre;
        fila += "</a></li>";

    }
    fila += "</ul></td></tr>";

    $("tbody").append(fila);

}

function manejarDatos(datos) {
    borrarTabla();
    for (var i = 0; i < datos.length; i++) {
        escribirFila(datos[i]);
    }

}

function pedirDatosEmpleadosAjax(uri) {
    var url = url_base+"empleados/" + uri;

    $.getJSON(url, null, manejarDatos);

}

function buscar() {
    var tipo = $("#ddlTipo").val();
    var uri;
    if (tipo == 1) {
        uri = "/porNombre/" + $("#txtBuscador").val();
    }
    if (tipo == 2) {
        uri = "/porCargo/" + $("#txtBuscador").val();
    }
    if (tipo == 3) {
        uri = "/porSalario/" + $("#txtBuscador").val();
    }
    pedirDatosEmpleadosAjax(uri);
}

(function() {
    pedirDatosEmpleadosAjax("get");
    $("#btnBuscar").bind("click", buscar);

})();