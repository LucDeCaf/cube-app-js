/**
 * Cycle any number of items in the list such that if n === list.length, then i[0] > i[n-1] > i[n-2] > ... > i[0]
 * Note: For sequentially incrementing patterns (eg. 0, 2, 3), the list cycles clockwise and vice versa.
 * @param {any[]} list
 * @param {number[]} indexes
 */
function cycle(list, indexes) {
    const first = list[indexes[0]];
    const len = indexes.length;

    for (let i = 0; i < len - 1; i++) {
        list[indexes[i]] = list[indexes[i + 1]];
    }
    list[indexes[len - 1]] = first;
}

// TODO: Define turn functions
// TODO: Define twist and flip functions
// TODO: Define reset functions
/**
 * @class
 * @constructor
 * @public
 */
export class Cube {
    constructor() {
        /** 
         * @type {number[][]}
         * @public
         */
        this.corners = [];
        /**
         * @type {number[][]}
         * @public
         */
        this.edges = [];

        for (let i = 0; i < 12; i++) {
            if (i < 8) {
                this.corners.push([i, 0]);
            }

            this.edges.push([i, 0]);
        }
    }

    u() {
        cycle(this.corners, [3, 2, 1, 0]);
        cycle(this.edges, [3, 2, 1, 0]);
    }

    uPrime() {
        cycle(this.corners, [0, 1, 2, 3]);
        cycle(this.edges, [0, 1, 2, 3]);
    }

    l() {
        cycle(this.corners, [3, 0, 7, 4]);
        cycle(this.edges, [3, 8, 7, 11]);

        this.corners[3][1] += 1;
        this.corners[0][1] += 2;
        this.corners[7][1] += 1;
        this.corners[4][1] += 2;

        this.updateTwists([3, 0, 7, 4]);
    }

    lPrime() {
        cycle(this.corners, [4, 7, 0, 3]);
        cycle(this.edges, [11, 7, 8, 3]);

        this.corners[3][1] += 1;
        this.corners[0][1] += 2;
        this.corners[7][1] += 1;
        this.corners[4][1] += 2;

        this.updateTwists([3, 0, 7, 4]);
    }

    f() {
        cycle(this.corners, [4, 5, 2, 3]);
        cycle(this.edges, [11, 4, 10, 2]);

        this.corners[4][1] += 1;
        this.corners[5][1] += 2;
        this.corners[2][1] += 1;
        this.corners[3][1] += 2;

        this.edges[11][1] += 1;
        this.edges[4][1] += 1;
        this.edges[10][1] += 1;
        this.edges[2][1] += 1;

        this.updateTwists([4, 5, 2, 3]);
        this.updateFlips([11, 4, 10, 2]);
    }

    fPrime() {
        cycle(this.corners, [3, 2, 5, 4]);
        cycle(this.edges, [2, 10, 4, 11]);

        this.corners[3][1] += 2;
        this.corners[2][1] += 1;
        this.corners[5][1] += 2;
        this.corners[4][1] += 1;

        this.edges[2][1] += 1;
        this.edges[10][1] += 1;
        this.edges[4][1] += 1;
        this.edges[11][1] += 1;

        this.updateTwists([3, 2, 5, 4]);
        this.updateFlips([2, 10, 4, 11]);
    }

    r() {
        cycle(this.corners, [2, 5, 6, 1]);
        cycle(this.edges, [10, 5, 9, 1]);

        this.corners[2][1] += 2;
        this.corners[5][1] += 1;
        this.corners[6][1] += 2;
        this.corners[1][1] += 1;

        this.updateTwists([2, 5, 6, 1]);
    }

    rPrime() {
        cycle(this.corners, [1, 6, 5, 2]);
        cycle(this.edges, [1, 9, 5, 10]);

        this.corners[2][1] += 2;
        this.corners[5][1] += 1;
        this.corners[6][1] += 2;
        this.corners[1][1] += 1;

        this.updateTwists([2, 5, 6, 1]);
    }

    b() {
        cycle(this.corners, [0, 1, 6, 7]);
        cycle(this.edges, [0, 9, 6, 8]);

        this.corners[0][1] += 1;
        this.corners[1][1] += 2;
        this.corners[6][1] += 1;
        this.corners[7][1] += 2;
        
        this.edges[0][1] += 1;
        this.edges[9][1] += 1;
        this.edges[6][1] += 1;
        this.edges[8][1] += 1;

        this.updateTwists([0, 1, 6, 7]);
        this.updateFlips([0, 9, 6, 8]); 
    }

    bPrime() {
        cycle(this.corners, [7, 6, 1, 0]);
        cycle(this.edges, [8, 6, 9, 0]);

        this.corners[0][1] += 1;
        this.corners[1][1] += 2;
        this.corners[6][1] += 1;
        this.corners[7][1] += 2;
        
        this.edges[0][1] += 1;
        this.edges[9][1] += 1;
        this.edges[6][1] += 1;
        this.edges[8][1] += 1;

        this.updateTwists([0, 1, 6, 7]);
        this.updateFlips([0, 9, 6, 8]); 
    }

    d() {
        cycle(this.corners, [7, 6, 5, 4]);
        cycle(this.edges, [7, 6, 5, 4]);
    }

    dPrime() {
        cycle(this.corners, [4, 5, 6, 7]);
        cycle(this.edges, [4, 5, 6, 7]);
    }

    updateTwists(indexes) {
        const len = indexes.length;
        for (let i = 0; i < len; i++) {
            this.corners[indexes[i]][1] %= 3;
        }
    }

    updateFlips(indexes) {
        const len = indexes.length;
        for (let i = 0; i < len; i++) {
            this.edges[indexes[i]][1] %= 2;
        }
    }
}

const CORNER_COLOR_MAP = [
    [0, 1, 4], // ULB
    [0, 4, 3], // UBR
    [0, 3, 2], // URF
    [0, 2, 1], // UFL
    [5, 1, 2], // DLF
    [5, 2, 3], // DFR
    [5, 3, 4], // DRB
    [5, 4, 1], // DBL
];
const EDGE_COLOR_MAP = [
    [0, 4], // UB
    [0, 3], // UR
    [0, 2], // UF
    [0, 1], // UL
    [5, 2], // DF
    [5, 3], // DR
    [5, 4], // DB
    [5, 1], // DL
    [4, 1], // BL
    [4, 3], // BR
    [2, 3], // FR
    [2, 1], // FL
];

/**
 * Get the color map for a given corner.
 * @param {number[]} corner 
 * @returns {number[]}
 */
export function getCornerColorMap(corner) {
    return CORNER_COLOR_MAP[corner[0]];
}

/**
 * Get the color map for a given edge.
 * @param {number[]} edge 
 * @returns {number[]}
 */
export function getEdgeColorMap(edge) {
    return EDGE_COLOR_MAP[edge[0]];
}

const CORNER_TILE_MAP = [
    [0, 8, 34], // ULB
    [2, 32, 26], // UBR
    [7, 24, 18], // URF
    [5, 16, 10], // UFL
    [40, 15, 21], // DLF
    [42, 23, 29], // DFR
    [47, 31, 37], // DRB
    [45, 39, 13], // DBL
];
const EDGE_TILE_MAP = [
    [1, 33], // UB
    [4, 25], // UR
    [6, 17], // UF
    [3, 9], // UL
    [41, 22], // DF
    [44, 30], // DR
    [46, 38], // DB
    [43, 14], // DL
    [36, 11], // BL
    [35, 28], // BR
    [20, 27], // FR
    [19, 12], // FL
];

/**
 * Get the tile IDs in the correct fill order for a given corner piece.
 * @param {number[]} corner 
 * @returns {number[]}
 */
export function getCornerTileMap(corner) {
    const tileMap = [...CORNER_TILE_MAP[corner[0]]];
    const twists = corner[1];

    if (twists === 1) {
        cycle(tileMap, [0, 1, 2]);
    } else if (twists === 2) {
        cycle(tileMap, [2, 1, 0]);
    }

    return tileMap;
}

/**
 * Get the tile IDs in the correct fill order for a given edge piece.
 * @param {number[]} edge 
 * @returns {number[]}
 */
export function getEdgeTileMap(edge) {
    const tileMap = [...EDGE_TILE_MAP[edge[0]]];
    const flipped = edge[1];

    if (flipped) {
        [tileMap[0], tileMap[1]] = [tileMap[1], tileMap[0]];
    }

    return tileMap;
}
