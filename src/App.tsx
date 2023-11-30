import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import { Header } from './components/header/header';
import { CardGrid } from './components/cards/card_grid';
import { Card } from './components/cards/card';
import castle from './img/castle.png'
import { Footer } from './components/footer/footer';

function App() {
  return (
    <>
      <Header />
      <div className='article'>
        <main className='main'>
          <CardGrid>
            <Card>Hi</Card>
            <Card>Hi</Card>
            <Card>Hi</Card>
            <Card>Hi</Card>
          </CardGrid>
        </main>
        <img src={castle} className="castle"></img>
        <Footer/>
      </div>
    </>
  );
}

export default App;
