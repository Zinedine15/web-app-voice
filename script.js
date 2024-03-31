const controlTexto = document.getElementById('controlTexto');
const miVentana = null;
const miVentana2 = null;

let textCc = ''; //Variable que guardará el comando detectado

// Verificar si el navegador soporta reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const resultDiv = document.getElementById('result');
  
    recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz
  
    // Evento cuando la voz es detectada
    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript; // Obtener el texto reconocido
      
      resultDiv.textContent = 'Orden identificada: ' + result;
      console.log("Comando Detectado: ", result);
      textCc = result; 

      // const keyword = 'Hola';
      const kw1 = 'pestaña nueva';
      const kw2 = 'la cuerda';
      const kw3 = 'tamaño pequeño';
      const kw4 = 'cierra pestaña';
      const kw5 = 'cierra navegador';
      
      if(result.includes(kw1)){
        window.alert("Abriendo Pestaña Nueva");
        miVentana = window.open('https://www.google.com', '_blank');
      }else  console.log("No se encontró la palabra");

      if(result.includes(kw2)){
        window.alert("Abriendo Página de 'LaCuerda'");
        miVentana2 = window.open('https://acordes.lacuerda.net', '_blank' );
      }else  console.log("No se encontró la palabra");

      if(result.includes(kw3)){
      const opciones = 'width=600,height=400,left=100,top=100';
      window.alert("Abriendo Ventana Pequeña");
      miVentana3 = window.open('https://www.google.com', '_blank', opciones);}
      else  console.log("No se encontró la palabra");

      if (result.includes(kw4)) 
        window.alert("Puedes cerrar la pestaña");
       else {
        console.log("No se encontró la palabra");
      }
    
      if (result.includes(kw5)) 
        window.alert("Puedes cerrar el navegador");
      else {
          console.log("No se encontró la palabra ");
      }

      const textoAGuardar = {
        textoComando: textCc
      };

      const apiUrl = "https://6604c6232ca9478ea17e7e32.mockapi.io/ComandosDetectados";

      const options = {
        method: 'POST', // Método HTTP POST para guardar datos
        headers: {
          'Content-Type': 'application/json' // Especificar el tipo de contenido JSON
        },
        body: JSON.stringify(textoAGuardar) // Convertir el objeto a JSON
      };      

      fetch(apiUrl, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ocurrió un error al guardar el texto.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Texto guardado exitosamente:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };

    // Evento de error
    recognition.onerror = function(event) {
      console.error('Error de reconocimiento de voz:', event.error);
    };
  
    // Botón para iniciar el reconocimiento de voz
    const startButton = document.createElement('button');
    startButton.textContent = 'Iniciar Identificación por Voz';
    startButton.classList.add('btn', 'btn-primary', 'mt-3');
    startButton.onclick = function() {
      recognition.start();
    };
  
    // Añadir el botón al DOM
    document.body.appendChild(startButton);
  } else {
    // Si no hay soporte para reconocimiento de voz
    console.error('El reconocimiento de voz no está soportado en este navegador.');
  }
  