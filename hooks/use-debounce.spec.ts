import { act, renderHook } from '@testing-library/react';

import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('should debounce the value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 1000 }
      }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 1000 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should clear timeout on unmount', () => {
    const { result, unmount } = renderHook(() => useDebounce('test', 1000));

    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('test');
  });
});
