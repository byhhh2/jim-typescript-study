interface Point {
    x: number;
    y: number;
  }
  
  function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
  }
  
  
  class VirtualPoint {
    x: number;
    y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }
  
  const newVPoint = new VirtualPoint(13, 56);
  printPoint(newVPoint); // "13, 56"