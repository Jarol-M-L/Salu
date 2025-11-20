 function clasificarPresion() {
    let sistolica = parseFloat(document.getElementById("sistolica").value);
    let diastolica = parseFloat(document.getElementById("diastolica").value);
    let mensaje = "";

    if (sistolica < 120 && diastolica < 80) mensaje = "Normal";
    else if (sistolica < 130 && diastolica < 80) mensaje = "Elevada";
    else if ((sistolica <= 139) || (diastolica <= 89)) mensaje = "HTA grado 1";
    else mensaje = "HTA grado 2";

    document.getElementById("resultadoPresion").innerHTML = mensaje;
  }

  function pedirTemperaturas() {
    const n = parseInt(document.getElementById("numPacientes").value);
    const contenedor = document.getElementById("tempInputs");
    contenedor.innerHTML = "";

    for (let i = 0; i < n; i++) {
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = `Paciente ${i + 1} (°C)`;
      input.id = `temp${i}`;
      contenedor.appendChild(input);
      contenedor.appendChild(document.createElement("br"));
    }

    const botonCalcular = document.createElement("button");
    botonCalcular.textContent = "Calcular Promedio";
    botonCalcular.onclick = calcularPromedioTemperatura;
    contenedor.appendChild(botonCalcular);
  }

  function calcularPromedioTemperatura() {
    const n = parseInt(document.getElementById("numPacientes").value);
    let suma = 0;
    for (let i = 0; i < n; i++) {
      suma += parseFloat(document.getElementById(`temp${i}`).value);
    }
    const promedio = suma / n;
    document.getElementById("resultadoTemperatura").innerHTML = `Temperatura promedio: ${promedio.toFixed(2)} °C`;
  }

  let contadorFiebre = 0;
  function agregarFiebre() {
    let temp = parseFloat(document.getElementById("tempPaciente").value);

    while (temp !== 0) {
      if (temp >= 38) contadorFiebre++;
      document.getElementById("resultadoFiebre").innerHTML = `Pacientes con fiebre ≥ 38°C: ${contadorFiebre}`;
      break;
    }

    if (temp === 0) {
      document.getElementById("resultadoFiebre").innerHTML = `Registro finalizado. Total pacientes con fiebre ≥ 38°C: ${contadorFiebre}`;
    }

    document.getElementById("tempPaciente").value = "";
    document.getElementById("tempPaciente").focus();
  }
  
  function clasificarTriage() {
    const codigo = parseInt(document.getElementById("codigoTriage").value);
    let mensaje = "";

    switch(codigo) {
      case 1: mensaje = "Rojo"; break;
      case 2: mensaje = "Amarillo"; break;
      case 3: mensaje = "Verde"; break;
      case 4: mensaje = "Azul"; break;
      default: mensaje = "Código no válido (1-4)";
    }

    document.getElementById("resultadoTriage").innerHTML = mensaje;
  }

  let registrosSpO2 = [];
  function registrarSpO2() {
    let entrada;
    do {
      entrada = document.getElementById("nivelSpO2").value;

      if (entrada.toLowerCase() === "no") {
        document.getElementById("resultadoSpO2").innerHTML = 
          `Registro finalizado. Valores ingresados: ${registrosSpO2.join(", ")}`;
        break;
      }

      let valor = parseFloat(entrada);
      if (!isNaN(valor)) {
        registrosSpO2.push(valor);
        document.getElementById("resultadoSpO2").innerHTML = `Saturación registrada: ${valor}%`;
      } else {
        document.getElementById("resultadoSpO2").innerHTML = "Entrada inválida. Ingresa un número o 'no'.";
      }

      document.getElementById("nivelSpO2").value = "";
      document.getElementById("nivelSpO2").focus();
      break;
    } while (true);
  }