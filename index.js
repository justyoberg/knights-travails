class Square {
  constructor(coords, lastSquare = null) {
    this.coords = coords;
    this.lastSquare = lastSquare;
  }
}

const getMoves = (location) => {
  const [xPos, yPos] = location;
  const moves = [
    [xPos - 1, yPos + 2],
    [xPos + 1, yPos + 2],
    [xPos + 2, yPos + 1],
    [xPos + 2, yPos - 1],
    [xPos + 1, yPos - 2],
    [xPos - 1, yPos - 2],
    [xPos - 2, yPos - 1],
    [xPos - 2, yPos + 1]
  ]
  return moves.filter((move) => move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8);
}

const checkMoves = (array) => {
  if (array.some(item => item < 0 || item > 7)) return false;
  return true;
}

const knightMoves = (start, end) => {
  // Make sure the coordinates are between 0 and 7
  if (!checkMoves([start, end].flat())) return console.log("Coordinates must be between 0 and 7.");

  let currentSquare = new Square(start);
  let queue = [currentSquare];
  let path = [];

  while (queue.length > 0) {
    let node = queue.shift();
    if (node.coords[0] === end[0] && node.coords[1] === end[1]) {
      path.push(node);
      break;
    };

    let moves = getMoves(node.coords);
    moves.forEach((move) => {
      // If the queue already contains a node with the coordinates, skip adding it to the queue
      if (queue.find(item => item.coords[0] == move[0] && item.coords[1] == move[1])) return;
      queue.push(new Square(move, node))
    });
  }
  
  let endNode = path[0];
  while (endNode.lastSquare !== null) {
    endNode = endNode.lastSquare;
    path.unshift(endNode);
  };

  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((move) => console.log(`[${move.coords[0]}, ${move.coords[1]}]`));
};

knightMoves([2, 1], [3, 1]);