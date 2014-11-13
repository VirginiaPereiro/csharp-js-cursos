var url_base = "http://localhost:54325/v1/";
function borrarTabla() {
    $("tbody").find("tr").remove();

}

function detalleProyecto(id) {
    var url = url_base + "proyecto/get/" + id;

    $.get(url, function(res) {

        if (res.nombre) {
            var texto = res.nombre + " del cliente " + res.cliente + "<br/>" + res.descripcion;
            $("#detalle").html(texto);
            $("#dlgProyecto").modal();


        }

    });


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

function inicializar() {

    var url1 = url_base + "Proyecto/get";
    $.getJSON(url1, function(res) {

        for (var i = 0; i < res.length; i++) {
            var txt = "<option value='" + res[i].idProyecto + "'>" +
                res[i].nombre + "</option>";

            $("#lstProyectos").append(txt);


        }

    });


    var url2 = url_base + "Cargo/get";
    $.getJSON(url2, function(res) {
        
        for (var i = 0; i < res.length; i++) {
            var txt = "<option value='" + res[i].idCargo + "'>" +
                res[i].nombre + "</option>";

            $("#lstCargo").append(txt);


        }


    });

}

function guardar() {
    var url = url_base + "empleados";
    var n = $("#txtNombre").val();
    var s = $("#txtSalario").val();
    var c = $("#lstCargo").val();
    var pd = $("#lstProyectos").find(":selected");
    var p = [];
    for (var i = 0; i < pd.length; i++) {

        var d = pd[i];
        p.push({ idProyecto: parseInt(d.value) });

    }

    var obj = {
        dni: "12345678", nombre: n, salario: parseFloat(s),
        idCargo: parseInt(c), proyectos: p
    };
    var objtxt = JSON.stringify(obj);
    $.ajax(url, {
        method: "POST",
        data: objtxt,
        contentType: "application/json",
        dataType: "json",
        success: function(res) {
            pedirDatosEmpleadosAjax("get");
            $("#dlgAlta").modal('hide');

        }
    });


  

}

(function() {
    pedirDatosEmpleadosAjax("get");
    $("#btnBuscar").bind("click", buscar);
    $("#btnAdd").click(function() {
        $("#dlgAlta").modal();

    });
    $("#btnGuardar").click(guardar);
    inicializar();
})();