var offsetX,
  offsetY,
  sqSide,
  reRollButton = null;
const dado = [
  [
    { y: "A", x: 4 },
    { y: "F", x: 6 },
    { y: "C", x: 5 },
    { y: "D", x: 6 },
    { y: "C", x: 6 },
    { y: "B", x: 5 },
  ],
  [
    { y: "A", x: 3 },
    { y: "C", x: 2 },
    { y: "B", x: 2 },
    { y: "B", x: 3 },
    { y: "A", x: 2 },
    { y: "B", x: 1 },
  ],
  [
    { y: "C", x: 3 },
    { y: "E", x: 3 },
    { y: "D", x: 3 },
    { y: "D", x: 4 },
    { y: "B", x: 4 },
    { y: "C", x: 4 },
  ],
  [
    { y: "F", x: 5 },
    { y: "E", x: 6 },
    { y: "F", x: 4 },
    { y: "E", x: 4 },
    { y: "D", x: 5 },
    { y: "E", x: 5 },
  ],
  [
    { y: "A", x: 1 },
    { y: "F", x: 3 },
    { y: "D", x: 1 },
    { y: "E", x: 2 },
    { y: "D", x: 2 },
    { y: "C", x: 1 },
  ],
  [
    { y: "E", x: 1 },
    { y: "F", x: 2 },
    { y: "B", x: 6 },
    { y: "F", x: 2 },
    { y: "A", x: 5 },
    { y: "A", x: 5 },
  ],
  [
    { y: "F", x: 1 },
    { y: "A", x: 6 },
    { y: "A", x: 6 },
    { y: "A", x: 6 },
    { y: "F", x: 1 },
    { y: "F", x: 1 },
  ],
];
var tirada = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  tirada = tirar();
  mostrarCoordenadasComoTexto(tirada);
  if (reRollButton === null) {
    reRollButton = createButton("Nueva partida");
    reRollButton.parent("coordinates");
    reRollButton.mouseClicked(setup);
  }
}

function draw() {
  background(40);
  push();
  translate(offsetX, offsetY);
  dibujarCuadricula(tirada);
  pop();
}

function tirar() {
  for (d in dado) {
    tirada[d] = dado[d][int(random(0, 6))];
  }
  return tirada;
}

function dibujarCuadricula(tirada) {
  const posicionesY = ["A", "B", "C", "D", "E", "F"];
  const casilla = (sqSide * 0.95) / 7;
  textSize(casilla * 0.6);
  strokeWeight(sqSide * 0.02);
  fill(200);
  for (y = casilla; y < sqSide; y += casilla) {
    if (y < sqSide * 0.9) {
      noStroke();
      text(
        posicionesY[round(y / casilla - 1)],
        casilla * 0.3,
        y + casilla * 0.8
      );
    }
    stroke(64);
    line(casilla, y, casilla * 7, y);
  }
  for (x = casilla; x < sqSide; x += casilla) {
    if (x < sqSide * 0.9) {
      noStroke();
      text(round(x / casilla), x + casilla * 0.3, casilla * 0.8);
    }
    stroke(64);
    line(x, casilla, x, casilla * 7);
  }
  noStroke();
  fill(150, 120, 80);
  for (d in tirada) {
    const posicion = [tirada[d].x - 1, posicionesY.indexOf(tirada[d].y)];
    ellipse(
      (posicion[0] + 1.5) * casilla,
      (posicion[1] + 1.5) * casilla,
      casilla * 0.8,
      casilla * 0.8
    );
  }
}

function mostrarCoordenadasComoTexto(tirada) {
  let coordenadas = "";
  tirada.forEach((elem) => {
    coordenadas += elem.y + elem.x + " ";
  });
  document.querySelector("#alt-text").innerHTML = coordenadas;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = (windowWidth - sqSide) / 2;
  offsetY = (windowHeight - sqSide) / 2;
}

function mouseClicked() {
  if (
    mouseX >= 0 &&
    mouseX < windowWidth &&
    mouseY >= 0 &&
    mouseY < windowHeight
  ) {
    setup();
  }
}
