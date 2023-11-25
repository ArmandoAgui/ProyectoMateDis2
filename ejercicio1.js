// Obtén una referencia al botón
var boton = document.getElementById("btn1");

// Agrega un event listener para el evento click
boton.addEventListener("click", function () {
    var nVeces = 0, Positivos = 0, Nulos = 0, Negativos = 0;
    nVeces = document.getElementById("cant1").value;
    for (var i = 0; i < nVeces; i++) {
        var resultado = producto();
        if (resultado > 0) {
            Positivos++;
        } else if (resultado == 0) {
            Nulos++;
        } else {
            Negativos++;
        }
    }
    var literal = document.getElementById("miDropdown");
    var valorSeleccionado = literal.value;
    if (valorSeleccionado == 1) {
        alert(((Positivos / nVeces) * 100).toFixed(4) + " probabilidad de que sea Positivo");
    } else if (valorSeleccionado == 2) {
        alert(((Nulos / nVeces) * 100).toFixed(4) + " probabilidad de que sea Nulo");
    }
    grafico1(Positivos.toFixed(4), Negativos.toFixed(4), Nulos.toFixed(4), nVeces);
    // Puedes realizar otras acciones aquí
});

function obtenerNumeroRandom(tipo) {
    //Sin contar el 0
    if (tipo == 1) {
        var numeroAleatorio;
        do {
            numeroAleatorio = Math.floor(Math.random() * 14) - 8;
        } while (numeroAleatorio === 0);
        return numeroAleatorio;
    }
    //Contando el 0
    else if (tipo == 2) {
        var numRandom = 0, min, max;
        min = Math.ceil(-8);
        max = Math.floor(5);
        numRandom = Math.floor(Math.random() * (max - min + 1) + min);
        return numRandom;
    }
}

function producto() {
    var pool = [], pro = 0;
    var literal = document.getElementById("miDropdown");
    // Obtén el valor seleccionado
    var valorSeleccionado = literal.value;
    for (var i = 0; i < 4; i++) {
        pool.push(obtenerNumeroRandom(valorSeleccionado));
    }

    for (var i = 0; i < 4; i++) {
        if (i == 0) {
            pro = pool[i];
        } else {
            pro = pro * pool[i];
        }
    }
    return pro;
}

// Función para mostrar las ventas por mes del año actual en un gráfico de barras.
function grafico1(pos, neg, nulos, total) {

    // Datos para el gráfico de barras
    var datos = {
        labels: ["Positivos " + ((pos / total) * 100).toFixed(4) + "%", "Nulos " + ((nulos / total) * 100).toFixed(4) + "%", "Negativos " + ((neg / total) * 100).toFixed(4) + "%"],
        datasets: [{
            label: 'Total de resultados = ' + total,
            backgroundColor: 'rgba(34, 144, 255, 100)',
            borderColor: "white",
            borderWidth: 1,
            data: [pos, nulos, neg]
        }]
    };

    // Configuración del gráfico
    var configuracion = {
        type: 'bar',
        data: datos,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Obtén el contexto del canvas
    var contexto = document.getElementById('chart1').getContext('2d');

    // Crea el gráfico de barras
    var miGrafico = new Chart(contexto, configuracion);
}

