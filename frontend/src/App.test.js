import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  // Render the App component
  render(<App />);
  
  // Assert that the TodoListContainer component is present
  expect(screen.getByTestId('todo-list-container')).toBeInTheDocument();
});
