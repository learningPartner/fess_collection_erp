import { ConstPipe } from './const.pipe';

describe('ConstPipe', () => {
  it('create an instance', () => {
    const pipe = new ConstPipe();
    expect(pipe).toBeTruthy();
  });
});
