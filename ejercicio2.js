// Calcular probabilidades
let probabilidadDefectuoso = 0;
let probabilidadT2DadoDefectuoso = 0;
let probabilidadT3DadoDefectuoso = 0;

function simularProduccion() {
    // Definir las probabilidades de los turnos y defectos
    const probabilidadT1 = 0.4;
    const probabilidadT2 = 0.35;
    const probabilidadT3 = 0.25;

    const probabilidadDefectoT1 = 0.01;
    const probabilidadDefectoT2 = 0.02;
    const probabilidadDefectoT3 = 0.03;

    // Simular la selección de un artículo al azar
    const turnoAleatorio = Math.random();
    let turno, probabilidadDefecto;

    if (turnoAleatorio < probabilidadT1) {
        turno = "T1";
        probabilidadDefecto = probabilidadDefectoT1;
    } else if (turnoAleatorio < probabilidadT1 + probabilidadT2) {
        turno = "T2";
        probabilidadDefecto = probabilidadDefectoT2;
    } else {
        turno = "T3";
        probabilidadDefecto = probabilidadDefectoT3;
    }

    // Simular si el artículo es defectuoso
    const esDefectuoso = Math.random() < probabilidadDefecto;

    return { turno, esDefectuoso };
}

// Obtén una referencia al botón
var boton = document.getElementById("btn2");

// Agrega un event listener para el evento click
boton.addEventListener("click", function () {
    // Realizar múltiples simulaciones
    let numSimulaciones = parseInt(document.getElementById("cant2").value);
    let totalDefectuosos = 0;
    let defectuososEnT2 = 0;
    let defectuososEnT3 = 0;

    for (let i = 0; i < numSimulaciones; i++) {
        const resultado = simularProduccion();

        // Contar defectuosos
        if (resultado.esDefectuoso) {
            totalDefectuosos++;

            // Contar defectuosos en T2 y T3
            if (resultado.turno === "T2") {
                defectuososEnT2++;
            } else if (resultado.turno === "T3") {
                defectuososEnT3++;
            }
        }
    }
    // Calcular probabilidades
    probabilidadDefectuoso = totalDefectuosos / numSimulaciones;
    probabilidadT2DadoDefectuoso = totalDefectuosos > 0 ? defectuososEnT2 / totalDefectuosos : 0;
    probabilidadT3DadoDefectuoso = totalDefectuosos > 0 ? defectuososEnT3 / totalDefectuosos : 0;

    var literal = document.getElementById("miDropdown2");
    var valorSeleccionado = literal.value;
    // Llamar a las funciones de gráfico con las probabilidades calculadas
    if (valorSeleccionado == 1) {  
        grafico3(probabilidadDefectuoso * 100);
    } else if (valorSeleccionado == 2) {
        probabilidadT1 = 1 - probabilidadT2DadoDefectuoso - probabilidadT3DadoDefectuoso;
        grafico2(probabilidadT1, probabilidadT2DadoDefectuoso, probabilidadT3DadoDefectuoso);
    }
});

function grafico3(proD) {
    var xValues = ["% Defectuoso", "% No Defectuoso"];
    var yValues = [proD, 100 - proD];
    var barColors = [
        "#00A8E5",
        "#336B80",
    ];

    new Chart("chart2", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Probabilidad D"
            }
        }
    });
}

function grafico2(T1param, T2Param, T3Param) {
    var xValues = ["T1", "T2", "T3"];
    var yValues = [T1param * 100, T2Param * 100, T3Param * 100];
    var barColors = [
        "#00A8E5",
        "#336B80",
        "#248CB3",
    ];

    new Chart("chart2", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Probabilidad (T/D)"
            }
        }
    });
}
