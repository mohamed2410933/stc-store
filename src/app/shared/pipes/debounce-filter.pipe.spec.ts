import { DebounceFilterPipe } from './debounce-filter.pipe';

describe('DebounceFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new DebounceFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
