let expect = require('expect.js'),
    a2v = ([x,y]) => ({x,y});

import {extract_cycles as ec} from '../src/cycles';

suite('complex graphs from the PDF v1/v2');

test('all kinds of primitives, v1', () => {
    let [f1,f2,f3,
         f4,f5,f6,
         f7,f8,f9] = [[2,5], [4,4], [6,6], 
                      [5,2], [8,1], [10,2],
                      [12,9],[16,7],[18,8]].map(a2v),
        [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17] = 
            [[1,2],[0,6],
             [7,8],[9,4],[10,7],
             [11,6],[15,2],[17,3],[19,2],[21,0],[20,5],
             [25,5],[25,9],[20,9],
             [22,8],[23,6],[24,8]].map(a2v),
        vertices = [f1,f2,f3,f4,f5,f6,f7,f8,f9,
                    c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15,c16,c17],
        edges = [[f1,f2],[f2,f3],
                 [f4,f5],[f5,f6],
                 [f7,f8],[f8,f9],
                 [c1,c2],[c2,f3],[c1,f4],[f3,f4],
                 [c3,c4],[c4,c5],[c5,c3],
                 [f6,c7],[c7,c8],[c8,c9],[c9,c10],[c10,c11],[c9,c11],[c6,c11],[f6,c6],[c6,c7],
                 [c11,c12],[c12,c13],[c13,c14],[c14,c11],
                 [c15,c16],[c16,c17],[c17,c15]],
        cycles = ec(vertices, edges);
    
    expect(cycles).to.eql([
        [c2,f3,f4,c1],
        [c3,c5,c4],
        [f6,c6,c7],
        [c6,c11,c9,c8,c7],
        [c9,c11,c10],
        [c14,c13,c12,c11],
        [c15,c17,c16] ]);
});

test('just cycles, v2', () => {
    let v = [[1,0], [0,3], [5,3], [2,1], [1,2], [5,1], [7,0], [9,5], [8,1], [13,0], [5,5], [8,5], [7,2],
             [10,8], [13,6], [15,7], [17,2], [19,1], [20,5], [22,0], [20,9], [24,9], [24,5], [21,8],
             [23,8], [22,6], [18,3], [16,3], [13,1], [15,3], [12,2]].map(a2v),
        e = [[0,1], [1,2], [2,3], [3,4], [2,5], [0,5], [5,6], [6,8], [10,11], [11,12], [12,10], [13,14],
             [14,15], [8,9], [9,7], [7,8], [9,28], [28,29], [29,30], [30,28], [9,16], [16,26], [26,27],
             [27,16], [16,17], [17,19], [17,18], [18,19], [18,7], [18,22], [22,21], [21,20], [20,18],
             [20,23], [23,24], [24,25], [25,23]],
        edges = e.map(([a,b]) => [v[a], v[b]]),
        cycles = ec(v, edges);
    expect(cycles.length).to.eql(9);
});
