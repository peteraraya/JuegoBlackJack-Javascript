// Pratón Modulo
// Función anonima auto invocada
const miModulo = (() =>{

  'use strict'

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  // Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector('#btnNuevo'),
        divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll("small");

  // Está función inicializa el juego      
  const inicializarJuego = ( numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
    }
   // Limpieza
    puntosHtml.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach( elem => elem.innerHTML = '');
   
    // Habilitamos botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
  }
  // Está función crea una nueva baraja
  const crearDeck = () => {

    deck = []; // reinicializando deck
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

    // Utilización de underscore
    return _.shuffle(deck);
  };

  // Está función me permite tomar una carta
  const pedirCarta = () => {
    // Medida de seguridad en caso de que nos quedemos sin cartas en la baraja
    if (deck.length === 0) {
      throw " No hay cartas en el deck";
    }
    return deck.pop();
  };

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
  };

  /**
   * Turno de la computadora -
   *  se va disparar en dos ocaciones
   *      1) Cuando el jugador pierde
   *      2) O cuando tocamos el boton
   */

  // Turno: 0: es el primer jugador y el ultimo la computadora
  const acumularPuntos = ( carta, turno ) => {

    // Incrementar puntos de computadora + valor carta
    puntosJugadores[turno] += valorCarta(carta);
    //Acumulando puntos
    puntosHtml[turno].innerText = puntosJugadores[turno];
    // Retornamos los puntos del jugador
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno ) =>{
       //Creandome una nueva carta
      const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`;
      imgCarta.classList.add("carta");
      divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {

    const [ puntosMinimos, puntosComputadora] = puntosJugadores;
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
    }, 100);

  }
  const turnoComputadora = puntosMinimos => {
    // Necesitamos sacar el ciclo al menos una vez
    let puntosComputadora = 0;
    do {
      // Tomar una carta
      const carta = pedirCarta();
      puntosComputadora =  acumularPuntos(carta, puntosJugadores.length - 1);

      // Creandome una nueva carta
       crearCarta(carta, puntosJugadores.length - 1);

    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  }
  // Eventos: debemos estar escuchando cuando alguien haga click a este botón

  // Escuchando evento
  //  1 arg : evento   | 2 arg : función callback ( función que se envía como argumento)
  btnPedir.addEventListener("click", () => {
    // se dispara esta acción
    // console.log('click');  mensaje de prueba
    // Tomar una carta
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

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

    turnoComputadora(puntosJugadores[0]);
  });


  /**
   * Logica de la computadora (IA)
   *
   * La computadora debe hacer los puntos por lo menos igual o superior al jugador
   */


  /**
   * Botón nuevo
   */

  btnNuevo.addEventListener('click', () => {
  
    inicializarJuego();

  });

  // Solamente lo que aqui retornemos va a ser visible fuera de este modulo y todo lo demás va a ser privado
  return {
   nuevoJuego: inicializarJuego
  };
})();

