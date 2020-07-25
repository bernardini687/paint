class Selector {
  constructor(first, last) {
    this.value = first;

    this.__defineGetter__("first", function () {
      return first;
    });
    this.__defineGetter__("last", function () {
      return last;
    });
  }

  inc() {
    if (this.value < this.last) {
      this.value++;
    } else {
      this.value = this.first;
    }
    return this.value;
  }

  dec() {
    if (this.value > this.first) {
      this.value--;
    } else {
      this.value = this.last;
    }
    return this.value;
  }
}

const encodedDots = new Map();
const colors = [Color.Indigo, Color.Green, Color.Yellow];

let activeColor;
let activeColorKey;

function decodeDot([coordinates, color]) {
  return [...coordinates.split(".").map(Number), color];
}

function create(game) {
  activeColorKey = new Selector(0, colors.length - 1);
  activeColor = colors[activeColorKey.value];
}

function onDotClicked(x, y) {
  encodedDots.set(`${x}.${y}`, activeColor);

  console.table(encodedDots);
}

function onKeyPress(direction) {
  // i want to cycle through all the available colors

  if (direction === Direction.Up) {
    activeColor = colors[activeColorKey.inc()];
  }

  if (direction === Direction.Down) {
    activeColor = colors[activeColorKey.dec()];
  }
}

function update(game) {
  for (encDot of encodedDots) {
    game.setDot(...decodeDot(encDot));
  }

  game.setText(`▲ / ▼ to change color: ${activeColor}`);
}

const config = {
  create,
  onDotClicked,
  onKeyPress,
  update,
};

const game = new Game(config);

game.run();
