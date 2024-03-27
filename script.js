const controlTexto = document.getElementById('controlTexto');
const miVentana = null;
const miVentana2 = null;
const miVentana3 = null;
const miVentana4 = null;
const miVentana5 = null;


// Verificar si el navegador soporta reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    const resultDiv = document.getElementById('result');
  
    recognition.lang = 'es-ES'; // Establecer el idioma de reconocimiento de voz
  
    // Evento cuando la voz es detectada
    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript; // Obtener el texto reconocido
      
      resultDiv.textContent = 'Orden identificada: ' + result;
      // const keyword = 'Hola';
      const kw1 = 'Abre una pestaña nueva';
      const kw2 = 'abre la página de la cuerda';
      const kw3 = 'tamaño pequeño';
      const kw4 = 'cierra la pestaña';
      const kw5 = 'cierra el navegador';
      // const kw6 = '';
      
      // result.includes(word);

      /* if (result.includes(keyword)) {
        controlTexto.classList.add('fs-3');
        console.log("Se encontró la palabra");
      }
      else  console.log("No se encontró la palabra"); */
      
      if(result.includes(kw1))
      miVentana = window.open('https://www.google.com');
      else  console.log("No se encontró la palabra");

      if(result.includes(kw2))
      miVentana2 = window.open('https://acordes.lacuerda.net' );
      else  console.log("No se encontró la palabra");

      if(result.includes(kw3)){
      const opciones = 'width=600,height=400,left=100,top=100';
      miVentana3 = window.open('https://www.google.com', '_blank', opciones);}
      else  console.log("No se encontró la palabra");

      if (result.includes(kw4)) {
        miVentana2.close();
      } else {
        console.log("No se encontró la palabra");
      }
    
      if (result.includes(kw5)) {
        /* console.log("Adiós!");
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        if (isChrome) {
            window.open('', '_self', ''); 
            window.close();
        } else if (typeof InstallTrigger !== 'undefined') {
            var cancelClose = false;
            window.addEventListener('beforeunload', function (e) {
                if (!cancelClose) {
                    var confirmationMessage = '¿Realmente deseas cerrar la ventana?';
                    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
                }
            });
            window.close();
        } else {
            alert('No se pudo cerrar automáticamente la ventana. Por favor, ciérrala manualmente.');
        } */
        miVentana2 = window.open('https://acordes.lacuerda.net');
        setTimeout(function() {
          app.quit();
        }, 5000);
      } else {
          console.log("No se encontró la palabra ");
      }

      /* if(result.includes(kw6))
      miVentana5 = window.open('https://www.ejemplo.com', '_blank');
      else  console.log("No se encontró la palabra"); */

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
  