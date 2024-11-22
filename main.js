import './style.css'
import { Cube, getCornerColorMap, getCornerTileMap, getEdgeTileMap, getEdgeColorMap } from './cube.js';

/** @type {HTMLDivElement} */
const displayU = document.querySelector('#displayU');
/** @type {HTMLDivElement} */
const displayL = document.querySelector('#displayL');
/** @type {HTMLDivElement} */
const displayF = document.querySelector('#displayF');
/** @type {HTMLDivElement} */
const displayR = document.querySelector('#displayR');
/** @type {HTMLDivElement} */
const displayB = document.querySelector('#displayB');
/** @type {HTMLDivElement} */
const displayD = document.querySelector('#displayD');

const displaySides = [displayU, displayL, displayF, displayR, displayB, displayD];

// TODO: Link center piece colors to colorScheme
const colorScheme = [
  '#ffffff', // U
  '#ffaa00', // L
  '#00ff00', // F
  '#ff0000', // R
  '#0000ff', // B
  '#ffff00', // D
];

/**
 * @type {HTMLDivElement[]}
 */
const displayTiles = [];

displaySides.map((side) => {
  displayTiles.push(
    side.children[0],
    side.children[1],
    side.children[2],
    side.children[3],
    // side.children[4] is center piece
    side.children[5],
    side.children[6],
    side.children[7],
    side.children[8],
  );
});

/**
 * Draw the given color map onto the given tile map.
 * @param {number[]} tileMap
 * @param {number[]} colorMap
 */
function drawPiece(tileMap, colorMap) {
  for (let i = 0; i < tileMap.length; i++) {
    const tile = displayTiles[tileMap[i]];
    const color = colorScheme[colorMap[i]];

    tile.style.backgroundColor = color;
  }
}

/**
 * Draw or update the drawing of the cube in the display area.
 * @param {Cube} cube 
 */
function drawCube(cube) {
  for (let i = 0; i < 8; i++) {
    const cornerTileMap = getCornerTileMap([i, cube.corners[i][1]]);
    const cornerColorMap = getCornerColorMap(cube.corners[i]);
    const edgeTileMap = getEdgeTileMap([i, cube.edges[i][1]]);
    const edgeColorMap = getEdgeColorMap(cube.edges[i]);

    drawPiece(cornerTileMap, cornerColorMap);
    drawPiece(edgeTileMap, edgeColorMap);
  }

  for (let i = 8; i < 12; i++) {
    const edgeTileMap = getEdgeTileMap([i, cube.edges[i][1]]);
    const edgeColorMap = getEdgeColorMap(cube.edges[i]);

    drawPiece(edgeTileMap, edgeColorMap);
  }
}

const cube = new Cube();

cube.dPrime();

drawCube(cube);
