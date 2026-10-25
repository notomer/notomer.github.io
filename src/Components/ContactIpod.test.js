import { act, fireEvent, render, screen } from '@testing-library/react';
import ContactIpod from './ContactIpod';

test('starts dim, wakes on interaction, and dims five seconds after the last activity', () => {
  jest.useFakeTimers();
  const { unmount } = render(<ContactIpod />);
  const ipod = screen.getByLabelText('Contact and links on iOmer');
  expect(ipod).toHaveAttribute('backlit', 'false');
  fireEvent.focusIn(ipod);
  expect(ipod).toHaveAttribute('backlit', 'false');
  fireEvent.pointerDown(ipod);
  expect(ipod).toHaveAttribute('backlit', 'true');
  act(() => jest.advanceTimersByTime(4000));
  fireEvent.keyDown(ipod, { key: 'ArrowDown' });
  act(() => jest.advanceTimersByTime(4000));
  expect(ipod).toHaveAttribute('backlit', 'true');
  act(() => jest.advanceTimersByTime(1000));
  expect(ipod).toHaveAttribute('backlit', 'false');
  fireEvent.wheel(ipod);
  expect(ipod).toHaveAttribute('backlit', 'true');
  unmount();
  expect(jest.getTimerCount()).toBe(0);
  jest.useRealTimers();
});
