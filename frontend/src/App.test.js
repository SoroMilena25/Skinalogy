import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Skinalogy homepage', () => {
  render(<App />);
  
  // Teste que le titre principal de ton app est présent (spécifiquement le h1)
  const titleElement = screen.getByRole('heading', { name: /SKINALOGY/i, level: 1 });
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  
  // Teste que tes liens de navigation sont présents
  const aboutLink = screen.getByText(/ABOUT/i);
  const connexionLink = screen.getByText(/CONNEXION/i);
  
  expect(aboutLink).toBeInTheDocument();
  expect(connexionLink).toBeInTheDocument();
});

test('renders beauty basics section', () => {
  render(<App />);
  
  // Teste une section spécifique de ton app
  const beautySection = screen.getByText(/BEAUTY BASICS/i);
  expect(beautySection).toBeInTheDocument();
});