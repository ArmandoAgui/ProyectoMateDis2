#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

int main() {
    // Inicialización de la semilla para generar números aleatorios
    srand(time(0));

    // Definición de porcentajes de producción y defectuosos
    double porcentaje_T1 = 0.4;
    double porcentaje_T2 = 0.35;
    double porcentaje_T3 = 0.25;

    double porcentaje_defectuosos_T1 = 0.01;
    double porcentaje_defectuosos_T2 = 0.02;
    double porcentaje_defectuosos_T3 = 0.03;

    // Número total de realizaciones
    int n;

    cout << "Ingrese el número de realizaciones: ";
    cin >> n;

    // Contadores para realizar el seguimiento de eventos
    int total_defectuosos = 0;
    int defectuosos_T2 = 0;
    int defectuosos_T3 = 0;

    // Realización de las simulaciones
    for (int i = 0; i < n; ++i) {
        // Selección de turno
        double random_turno = (rand() % 100) / 100.0; // Número aleatorio entre 0 y 1

        if (random_turno < porcentaje_T1) {
            // Turno T1
            double random_defectuoso = (rand() % 100) / 100.0;
            if (random_defectuoso < porcentaje_defectuosos_T1) {
                // Artículo defectuoso del turno T1
                total_defectuosos++;
            }
        } else if (random_turno < porcentaje_T1 + porcentaje_T2) {
            // Turno T2
            double random_defectuoso = (rand() % 100) / 100.0;
            if (random_defectuoso < porcentaje_defectuosos_T2) {
                // Artículo defectuoso del turno T2
                total_defectuosos++;
                defectuosos_T2++;
            }
        } else {
            // Turno T3
            double random_defectuoso = (rand() % 100) / 100.0;
            if (random_defectuoso < porcentaje_defectuosos_T3) {
                // Artículo defectuoso del turno T3
                total_defectuosos++;
                defectuosos_T3++;
            }
        }
    }

    // Cálculo de las probabilidades
    double probabilidad_defectuoso = static_cast<double>(total_defectuosos) / n;
    double probabilidad_defectuoso_T2 = static_cast<double>(defectuosos_T2) / total_defectuosos;
    double probabilidad_defectuoso_T3 = static_cast<double>(defectuosos_T3) / total_defectuosos;

    // Mostrar resultados
    cout << "a. Probabilidad de que resulte defectuoso: " << probabilidad_defectuoso << endl;
    cout << "b. Probabilidad de que haya sido producido en el turno T2 dado que es defectuoso: " << probabilidad_defectuoso_T2 << endl;
    cout << "   Probabilidad de que haya sido producido en el turno T3 dado que es defectuoso: " << probabilidad_defectuoso_T3 << endl;

    return 0;
}
