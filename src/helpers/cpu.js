export function cpuMove(board, point) {
  const size = board.length;
  const sizeColumn = Math.sqrt(size);
  const pointsFirstRow = Array.apply(null, { length: sizeColumn }).map(
    (item, index) => index * sizeColumn
  );
  const pointsLastRow = pointsFirstRow.map(item => item + sizeColumn - 1);
  const top = point - sizeColumn > 0 ? point - sizeColumn : null;
  const bottom = point + sizeColumn < size ? point + sizeColumn : null;
  const left = !pointsFirstRow.find(item => item === point) ? point - 1 : null;
  const right = !pointsLastRow.find(item => item === point) ? point + 1 : null;
  const top_left =
    top !== null &&
    !pointsFirstRow.find(item => item === point) &&
    !pointsFirstRow.find(item => item === top)
      ? top - 1
      : null;
  const top_right =
    top !== null &&
    !pointsLastRow.find(item => item === point) &&
    !pointsLastRow.find(item => item === top)
      ? top + 1
      : null;
  const bottom_left =
    bottom !== null &&
    !pointsFirstRow.find(item => item === point) &&
    !pointsFirstRow.find(item => item === bottom)
      ? bottom - 1
      : null;
  const bottom_right =
    bottom !== null &&
    !pointsLastRow.find(item => item === point) &&
    !pointsLastRow.find(item => item === bottom)
      ? bottom + 1
      : null;
  let points = board.filter(
    item =>
      (item.id === top ||
        item.id === top_left ||
        item.id === top_right ||
        item.id === bottom ||
        item.id === bottom_left ||
        item.id === bottom_right ||
        item.id === left ||
        item.id === right) &&
      item.check === ""
  );
  if (points.length < 1) {
    points = board.filter(item => item.check === "");
  }
  const cpu =
    points[Math.floor((Math.random() - 0.00000000001) * points.length)];
  return cpu;
}
