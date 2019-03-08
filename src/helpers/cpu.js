import {
  checkRowWin,
  checkColumnWin,
  checkLeftDiagonalWin,
  checkRightDiagonalWin
} from "./winner";

export function cpuMove(board, point) {
  const size = board.length;
  const sizeColumn = Math.sqrt(size);
  const pointsFirstRow = Array.apply(null, { length: sizeColumn }).map(
    (item, index) => index * sizeColumn
  );
  const pointsLastRow = pointsFirstRow.map(item => item + sizeColumn - 1);
  const rowWin = checkRowWin(board, point);
  const columnWin = checkColumnWin(board, point);
  const leftDiagonalWin = checkLeftDiagonalWin(board, point);
  const rightDiagonalWin = checkRightDiagonalWin(board, point);
  let points = [];
  let cpu = {};
  if (rowWin.length > 2) {
    if (!pointsFirstRow.find(item => item.id === rowWin[0].id)) {
      points = [...points, rowWin[0].id - 1];
    }
    if (!pointsLastRow.find(item => item.id === rowWin[rowWin.length - 1].id)) {
      points = [...points, rowWin[rowWin.length - 1].id + 1];
    }
  }
  if (columnWin.length > 2) {
    if (columnWin[0].id - sizeColumn > 0) {
      points = [...points, columnWin[0].id - sizeColumn];
    }
    if (columnWin[0].id + sizeColumn < size) {
      points = [...points, columnWin[columnWin.length - 1].id + sizeColumn];
    }
  }
  if (leftDiagonalWin.length > 2) {
    if (
      leftDiagonalWin[0].id - sizeColumn > 0 &&
      !pointsFirstRow.find(item => item.id === leftDiagonalWin[0].id)
    ) {
      points = [...points, leftDiagonalWin[0].id - sizeColumn - 1];
    }
    if (
      leftDiagonalWin[leftDiagonalWin.length - 1].id + sizeColumn < size &&
      !pointsLastRow.find(
        item => item.id === leftDiagonalWin[leftDiagonalWin.length - 1].id
      )
    ) {
      points = [
        ...points,
        leftDiagonalWin[leftDiagonalWin.length - 1].id + sizeColumn + 1
      ];
    }
  }
  if (rightDiagonalWin.length > 2) {
    if (
      rightDiagonalWin[0].id - sizeColumn > 0 &&
      !pointsLastRow.find(item => item.id === rightDiagonalWin[0].id)
    ) {
      points = [...points, rightDiagonalWin[0].id - sizeColumn + 1];
    }
    if (
      rightDiagonalWin[rightDiagonalWin.length - 1].id + sizeColumn < size &&
      !pointsFirstRow.find(
        item => item.id === rightDiagonalWin[rightDiagonalWin.length - 1].id
      )
    ) {
      points = [
        ...points,
        rightDiagonalWin[rightDiagonalWin.length - 1].id + sizeColumn - 1
      ];
    }
  }
  const c = board.filter(
    item => !!points.find(i => i === item.id) && item.check === ""
  );
  if (c.length > 0) {
    if (c.length > 1) {
      cpu = c[Math.floor((Math.random() - 0.00000000001) * points.length)];
      console.log(cpu);
    } else {
      cpu = c[0];
      console.log(cpu);
    }
  } else {
    const top = point - sizeColumn > 0 ? point - sizeColumn : null;
    const bottom = point + sizeColumn < size ? point + sizeColumn : null;
    const left = !pointsFirstRow.find(item => item === point)
      ? point - 1
      : null;
    const right = !pointsLastRow.find(item => item === point)
      ? point + 1
      : null;
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
    let p = board.filter(
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
    if (p.length < 1) {
      p = board.filter(item => item.check === "");
    }
    cpu = p[Math.floor((Math.random() - 0.00000000001) * points.length)];
    console.log(cpu);
  }
  return cpu;
}
