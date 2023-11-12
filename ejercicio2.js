const T1 = 0.4, T2 = 0.35, T3 = 0.25;
const proT1 = 0.01, proT2 = 0.02, proT3 = 0.03;

// Obtén una referencia al botón
var boton = document.getElementById("btn2");

// Agrega un event listener para el evento click
boton.addEventListener("click", function () {
    var nVeces = 0;
    var porcentajeDefectuoso = 0;
    nVeces = document.getElementById("cant2").value;
    var literal = document.getElementById("miDropdown2");
    var valorSeleccionado = literal.value;
    for (var i = 0; i < nVeces; i++) {
        porcentajeDefectuoso += probabilidadDefectuoso();
    }
    porcentajeDefectuoso = (porcentajeDefectuoso / nVeces) * 100;
    if (valorSeleccionado == 1) {
        alert(porcentajeDefectuoso.toFixed(2) + "%" + " probabilidad de que un elemento este defectuoso")
    } else if (valorSeleccionado == 2) {
        probabilidadDadaD();
    }
    // Puedes realizar otras acciones aquí
});

function probabilidadDefectuoso() {
    var porDefec = 0;
    porDefec = (proT1 * T1) + (proT2 * T2) + (proT3 * T3);
    return porDefec;
}

function probabilidadDadaD() {
    var T1dadaD = 0, T2dadaD = 0, T3dadaD = 0;
    T1dadaD = (T1 * proT1) / probabilidadDefectuoso();
    T2dadaD = (T2 * proT2) / probabilidadDefectuoso();
    T3dadaD = (T3 * proT3) / probabilidadDefectuoso();
    grafico2(T1dadaD, T2dadaD, T3dadaD);
}
function grafico2(T1param, T2Param, T3Param) {
    var xValues = ["T1%", "T2%", "T3"];
var yValues = [T1param*100, T2Param*100, T3Param*100];
var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
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
      text: "World Wide Wine Production 2018"
    }
  }
});
}
