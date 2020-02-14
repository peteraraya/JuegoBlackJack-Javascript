// Pratón Modulo
// Función anonima auto invocada
(() =>{

  'use strict'

  let deck = [];
  const tipos = ["C", "D", "H", "S"];
  const especiales = ["A", "J", "Q", "K"];

  let puntosJugador = 0,
    puntosComputadora = 0;

  // Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const btnNuevo = document.querySelector('#btnNuevo');
  // console.log(btnPedir);

  const divCartasJugador = document.querySelector("#jugador-cartas");

  const divCartasComputadora = document.querySelector("#computadora-cartas");

  const puntosHtml = document.querySelectorAll("small");

  // Está función crea una nueva baraja
  const crearDeck = () => {
    // LLeno cartas normales
    for (let i = 2; i <= 10; i++) {
      for (const tipo of tipos) {
        deck.push(i + tipo); // Establesco todos los tipos
      }
    }
    // Lleno cartas especiales
    for (const tipo of tipos) {
      for (const esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    // console.log(deck);

    // Utilización de underscore
    deck = _.shuffle(deck);

    // console.log(deck);

    return deck;
  };
  crearDeck();

  // Está función me permite tomar una carta

  const pedirCarta = () => {
    // Medida de seguridad en caso de que nos quedemos sin cartas en la baraja
    if (deck.length === 0) {
      throw " No hay cartas en el deck";
    }

    const carta = deck.pop();

    //console.log(deck); // carta debe ser de la baraja
    // console.log(carta);
    return carta;
  };

  // pedirCarta(); // sacamos el codigo en duro de pedir carta

  // Función de valor de carta
  const valorCarta = carta => {
    //substring : regresa un nuevo string cortado en base a la posición inicial y un final que podemos definir

    // Obtenemos el valor de la carta
    const valor = carta.substring(0, carta.length - 1); // olvidarnos que la ultima posición existe

    // Instrucción para saber  si es un número o no

    return isNaN(valor)
      ? valor === "A"
        ? 11
        : 10 //Primera condición ternaria
      : valor * 1;

    // let puntos = 0;

    // isNan :
    // if ( isNaN( valor) ) {
    //     // Va a regresar un valor booleano, true si no es un numero
    //     console.log('No es un número ');

    //     // Utilizamos operador ternario para establecer condicional de cartas As, Q, K y J
    //     puntos = ( valor === 'A') ? 11 : 10

    // }else{
    //     console.log('Es un número');
    //     puntos = valor * 1; // Tranformamos el valor de la carte a un número
    // }
  };

  /**
   * Turno de la computadora -
   *  se va disparar en dos ocaciones
   *      1) Cuando el jugador pierde
   *      2) O cuando tocamos el boton
   */

  const turnoComputadora = puntosMinimos => {
    // Necesitamos sacar el ciclo al menos una vez
    do {
      // Tomar una carta
      const carta = pedirCarta();

      // incrementar puntos de computadora + valor carta
      puntosComputadora += valorCarta(carta);

      //Acumulando puntos
      puntosHtml[1].innerText = puntosComputadora;

      // Creandome una nueva carta
      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");

      // Agrego carta
      divCartasComputadora.append(imgCarta);

      if (puntosMinimos > 21) {
        break; // no es necesario
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);



    // JS ejecuta estó depués
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana');
      } else if (puntosMinimos > 21) {
        alert(' Computadora Gana');
      } else if (puntosComputadora > 21) {
        alert('Jugador Gana');;
      } else {
        alert(' Computadora Gana');
      }
    }, 10);

  };

  // const valor = valorCarta( pedirCarta());

  // console.log({ valor });

  // Eventos: debemos estar escuchando cuando alguien haga click a este botón

  // Escuchando evento
  //  1 arg : evento   | 2 arg : función callback ( función que se envía como argumento)
  btnPedir.addEventListener("click", () => {
    // se dispara esta acción
    // console.log('click');  mensaje de prueba

    // Tomar una carta
    const carta = pedirCarta();

    // incrementar puntos de jugador + valor carta
    puntosJugador += valorCarta(carta);

    //Acumulando puntos
    puntosHtml[0].innerText = puntosJugador;

    // Creandome una nueva carta
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    // Agrego carta
    divCartasJugador.append(imgCarta);

    // Controlando los puntos

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21 Genial");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }

    console.log(puntosJugador);
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
  });

  // Todo Borrar
  // turnoComputadora(16);

  /**
   * Logica de la computadora (IA)
   *
   * La computadora debe hacer los puntos por lo menos igual o superior al jugador
   */


  /**
   * Botón nuevo
   */

  btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();

    // Limpiamos variables

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    // Habilitamos botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  });
})();

