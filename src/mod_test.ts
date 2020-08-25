import * as path from 'path';
import {listToArray, Quotes, Declaration} from './mod';
import * as chai from 'chai';
import * as chaiJestSnapshot from 'chai-jest-snapshot';
chai.use(chaiJestSnapshot);
const {expect} = chai;

const F = path.join('src/snapshots', `${path.basename(__filename)}.js`);

describe('listToArray', () => {
  it('should test cli', async () => {
    expect(listToArray('')).to.matchSnapshot(F, 'E');
    expect(listToArray('hello')).to.matchSnapshot(F, 'S');
    expect(listToArray('hello\nworld')).to.matchSnapshot(F, 'D');

    const __tick = {quotes: Quotes.backtick};
    const __single = {quotes: Quotes.single};
    const __double = {quotes: Quotes.double};
    expect(listToArray('hello', __tick)).to.matchSnapshot(F, 'T_S');
    expect(listToArray('hello\nworld', __tick)).to.matchSnapshot(F, 'T_D');
    expect(listToArray('hello', __single)).to.matchSnapshot(F, 'S_S');
    expect(listToArray('hello\nworld', __single)).to.matchSnapshot(F, 'S_D');
    expect(listToArray('hello', __double)).to.matchSnapshot(F, 'D_S');
    expect(listToArray('hello\nworld', __double)).to.matchSnapshot(F, 'D_D');

    const name = 'name';
    const __var = {name, declaration: Declaration.var};
    const __const = {name, declaration: Declaration.const};
    const __let = {name, declaration: Declaration.let};
    expect(listToArray('hello\nworld', __var)).to.matchSnapshot(F, 'V');
    expect(listToArray('hello\nworld', __const)).to.matchSnapshot(F, 'C');
    expect(listToArray('hello\nworld', __let)).to.matchSnapshot(F, 'L');
  });
});
