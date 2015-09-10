let expect = require('expect.js'),
    rewire = require('rewire'),
    cycles = rewire('../cycles'),
    bbk = cycles.__get__('best_by_kind'),
    cw = (a,b) => bbk(a,b,'cw'),
    ccw = (a,b) => bbk(a,b,'ccw');

`
      a
       \
        b
      / | \
     c  d  e       `;

let a,b,c,d,e, 
    setup = () => {
        [a,b,c,d,e] = [[0,0],[1,1],[0,2],[1,2],[2,2]];
        b.adj = [a,c,d,e];
        a.adj = [b];
        c.adj = [b];
        d.adj = [b];
        e.adj = [b];
    };

suite('cw-most');

beforeEach(setup);

test('no adjacent', () => {
    b.adj = [];
    expect(cw(a,b)).to.be(undefined);
});

test('one adjacent', () => {
    b.adj = [e];
    expect(cw(a,b)).to.be(e);
});

test('one adjacent, same as starting point', () => {
    b.adj = [a];
    expect(cw(a,b)).to.be(undefined);
});

test('starting at a', () => {
    expect(cw(a,b)).to.be(c);
});

test('starting at c', () => {
    expect(cw(c,b)).to.be(d);
});

test('starting at e', () => {
    expect(cw(e,b)).to.be(a);
});

test('starting at d', () => {
    expect(cw(d,b)).to.be(e);
});

test('undefined starting point', () => {
    expect(cw(undefined, b)).to.be(e);
});

suite('ccw-most');

beforeEach(setup);

test('no adjacent', () => {
    b.adj = [];
    expect(ccw(a,b)).to.be(undefined);
});

test('one adjacent', () => {
    b.adj = [e];
    expect(ccw(a,b)).to.be(e);
});

test('one adjacent, same as starting point', () => {
    b.adj = [a];
    expect(cw(a,b)).to.be(undefined);
});

test('starting at a', () => {
    expect(ccw(a,b)).to.be(e);
});

test('starting at c', () => {
    expect(ccw(c,b)).to.be(a);
});

test('starting at e', () => {
    expect(ccw(e,b)).to.be(d);
});

test('starting at d', () => {
    expect(ccw(d,b)).to.be(c);
});

test('undefined starting point', () => {
    expect(ccw(undefined, b)).to.be(c);
});
