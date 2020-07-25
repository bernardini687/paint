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
  }

  dec() {
    if (this.value > this.first) {
      this.value--;
    } else {
      this.value = this.last;
    }
  }
}
