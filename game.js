const encodedDots = new Set();

let activeColor;

function decodeDot(encodedDot) {
  const [color, ...coordinates] = encodedDot.split(".");
  return [...coordinates.map(Number), color]; // color last to match the order of setDot's args
}

function create(game) {
  activeColor = Color.Indigo;
}

function onDotClicked(x, y) {
  encodedDots.add(`${activeColor}.${x}.${y}`); // color first to ease decoding

  console.log(encodedDots);
}

function onKeyPress(direction) {
  // i want to cycle through all the available colors

  if (direction === Direction.Up) {
    activeColor = Color.Green;
  }

  if (direction === Direction.Down) {
    activeColor = Color.Yellow;
  }
}

function update(game) {
  for (encDot of encodedDots) {
    const [x, y, color] = decodeDot(encDot);
    game.setDot(x, y, color);
  }

  game.setText(`UP / DOWN keys to switch color: ${activeColor}`);
}

const config = {
  create,
  onDotClicked,
  onKeyPress,
  update,
};

const game = new Game(config);

game.run();
