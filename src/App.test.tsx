import React from 'react';
import { render, screen } from '@testing-library/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from './App';

test('renders learn react link', () => {
  render(
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
