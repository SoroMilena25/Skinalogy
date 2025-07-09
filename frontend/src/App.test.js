import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Skinalogy homepage', () => {
  render(<App />);
  
  const titleElement = screen.getByRole('heading', { name: /SKINALOGY/i, level: 1 });
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  
  const connexionLink = screen.getByText(/CONNEXION/i);
  

  expect(connexionLink).toBeInTheDocument();
});

test('renders beauty basics section', () => {
  render(<App />);
  
  const beautySection = screen.getByText(/BEAUTY BASICS/i);
  expect(beautySection).toBeInTheDocument();
});