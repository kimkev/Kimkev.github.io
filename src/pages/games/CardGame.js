import React, { useState, useEffect } from "react";
import './CardGame.css';

const CardGame = () => {

    const [player1Cards, setPlayer1Cards] = useState([]);
    const [player2Cards, setPlayer2Cards] = useState([]);
    const [deckId, setDeckId] = useState('');
    const [remainingDeck, setRemainingDeck] = useState(52); // Assuming a full deck of 52 cards


    // Function to initialize a new deck and draw cards
    useEffect(() => {
        const initializeGame = async () => {
            try {
                // Create a new deck
                const newDeckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                const newDeckData = await newDeckResponse.json();
                const deckId = newDeckData.deck_id;
                setDeckId(deckId);

                // Draw cards for player 1
                const player1Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
                const player1Data = await player1Response.json();
                setPlayer1Cards(player1Data.cards);

                // Draw cards for player 2
                const player2Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
                const player2Data = await player2Response.json();
                setPlayer2Cards(player2Data.cards.map(card => ({ ...card, image: 'https://deckofcardsapi.com/static/img/back.png' })));

                setRemainingDeck(newDeckData.remaining);
            } catch (error) {
                console.error('Error initializing game:', error);
            }
        };

        initializeGame();
    }, []); // Empty dependency array to run effect only once when component mounts

    return (
        <div className="container container-cardgame">
            <div className="player-container">
        <h2>Your Cards</h2>
        <div className="card-container">
          {player1Cards.map((card, index) => (
            <div className="card user-card" key={index}>
              <img src={card.image} alt={`${card.value} of ${card.suit}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="deck-container">
        <h2>Deck</h2>
        <div className="card deck">
          {remainingDeck}
        </div>
      </div>
      <div className="player-container">
        <h2>Computer's Cards</h2>
        <div className="card-container">
          {player2Cards.map((card, index) => (
            <div className="card computer-card" key={index}></div>
          ))}
        </div>
      </div>
        </div>
    );
};

export default CardGame;
