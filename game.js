const colors = [
  Color.Black,
  Color.Blue,
  Color.Gray,
  Color.Green,
  Color.Indigo,
  Color.Orange,
  Color.Red,
  Color.Violet,
  Color.Yellow,
];
const colorSelector = new Selector(0, colors.length - 1);
const encodedDots = new Map();

function activeColor() {
  return colors[colorSelector.value];
}

function decodeDot([coordinates, color]) {
  return [...coordinates.split(".").map(Number), color];
}

function onDotClicked(x, y) {
  encodedDots.set(`${x}.${y}`, activeColor());
}

function onKeyPress(direction) {
  if (direction === Direction.Up) {
    colorSelector.inc();
  }

  if (direction === Direction.Down) {
    colorSelector.dec();
  }
}

function update(game) {
  for (encDot of encodedDots) {
    game.setDot(...decodeDot(encDot));
  }

  game.setText(`▲ / ▼ to change color: ${activeColor()}`);
}

const config = {
  onDotClicked,
  onKeyPress,
  update,
};

const game = new Game(config);

game.run();
