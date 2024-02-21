import React, { useState, useEffect } from "react";
import './CardGame.css';

const CardGame = () => {

    const [player1Cards, setPlayer1Cards] = useState([]);
    const [player2Cards, setPlayer2Cards] = useState([]);
    const [deckId, setDeckId] = useState('');
    const [remainingDeck, setRemainingDeck] = useState(52); // Assuming a full deck of 52 cards
    const [placeholderMessage, setPlaceholderMessage] = useState(`Beat the computer's hand by selecting cards to remove from your hand. When you are ready, click the deck.`); // Placeholder message
    const [winner, setWinner] = useState(null); // State to store the winner

    // Function to initialize a new deck and draw cards
    useEffect(() => {
        const initializeGame = async () => {
            try {
                // Create a new deck
                const newDeckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
                const newDeckData = await newDeckResponse.json();
                const deckId = newDeckData.deck_id;
                setDeckId(deckId);

                // Draw cards for player 1 (user)
                const player1Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
                const player1Data = await player1Response.json();
                setPlayer1Cards(player1Data.cards);

                // Draw cards for player 2 (computer)
                const player2Response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
                const player2Data = await player2Response.json();
                setPlayer2Cards(player2Data.cards);

                setRemainingDeck(newDeckData.remaining - 10); // Subtract 10 cards drawn for both players
            } catch (error) {
                console.error('Error initializing game:', error);
                setPlaceholderMessage('Failed to initialize the game. Please try again later.'); // Update placeholder message in case of error
            }
        };

        initializeGame();
    }, []); // Empty dependency array to run effect only once when component mounts


    // Function to handle card removal and drawing new cards from the deck for player 1
    const handleCardRemovalAndDrawPlayer1 = async (selectedCardIndices) => {
        try {
            // Remove selected cards from player 1's hand
            const newPlayer1Cards = player1Cards.filter((card, index) => !selectedCardIndices.includes(index));

            // Draw new cards from the deck
            const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${selectedCardIndices.length}`);
            const drawData = await drawResponse.json();
            const drawnCards = drawData.cards;

            // Insert drawn cards at the same position where selected cards were removed
            const updatedPlayer1Cards = [...newPlayer1Cards];
            selectedCardIndices.forEach((index, i) => {
                updatedPlayer1Cards.splice(index, 0, drawnCards[i]);
            });

            // Set the new player 1's hand with updated cards
            setPlayer1Cards(updatedPlayer1Cards);

            // Update remaining deck count
            setRemainingDeck(prevRemainingDeck => prevRemainingDeck - selectedCardIndices.length);
        } catch (error) {
            console.error('Error handling card removal and drawing for player 1:', error);
        }
    };

    // Function to handle card removal and drawing new cards from the deck for player 2
    const handleCardRemovalAndDrawPlayer2 = async () => {
        try {
            // Determine which cards to remove from player 2's hand to improve the hand strength
            // For simplicity, let's assume the computer randomly removes up to 5 cards
            const randomIndices = [];
            while (randomIndices.length < 5 && randomIndices.length < player2Cards.length) {
                const randomIndex = Math.floor(Math.random() * player2Cards.length);
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }

            // Remove selected cards from player 2's hand
            const newPlayer2Cards = player2Cards.filter((card, index) => !randomIndices.includes(index));

            // Draw new cards from the deck
            const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${randomIndices.length}`);
            const drawData = await drawResponse.json();
            const drawnCards = drawData.cards;

            // Set the new player 2's hand with drawn cards
            setPlayer2Cards([...newPlayer2Cards, ...drawnCards]);

            // Update remaining deck count
            setRemainingDeck(prevRemainingDeck => prevRemainingDeck - randomIndices.length);
        } catch (error) {
            console.error('Error handling card removal and drawing for player 2:', error);
        }
    };

    // Function to evaluate the hand strength
    const evaluateHandStrength = (cards) => {
        // Implement logic to evaluate hand strength based on standard poker hands
        // Return a string indicating the hand strength
        return "High Card"; // Placeholder
    };

    // Function to determine the winner based on hand strength
    const determineWinner = () => {
        const player1HandStrength = evaluateHandStrength(player1Cards);
        const player2HandStrength = evaluateHandStrength(player2Cards);

        // Compare hand strengths and determine the winner
        if (player1HandStrength > player2HandStrength) {
            setWinner("Player 1 wins!");
        } else if (player1HandStrength < player2HandStrength) {
            setWinner("Player 2 wins!");
        } else {
            setWinner("It's a tie!");
        }
    };


    // Function to update the placeholder message with the hand strength of player 1's hand
    const updatePlaceholderMessage = () => {
        const handStrength = evaluateHandStrength(player1Cards);
        setPlaceholderMessage(handStrength);
    };



    return (
        <div className="container container-cardgame">
            <div className="placeholder-container">
                <p className="placeholder-message">{placeholderMessage}</p>
            </div>
            <div className="card-game-container">
                <div className="left-section">
                    <h2>Mulligan</h2>
                    <div className="card deck" onClick={() => handleCardRemovalAndDrawPlayer1([])}>
                        {remainingDeck}
                    </div>
                </div>
                <div className='hand-container'>
                    <div className="player-container">
                        <h2>Computer's Cards</h2>
                        <div className="card-container">
                            {player2Cards.map((card, index) => (
                                <div className="card computer-card" key={index}>
                                    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="player-container">
                        <h2>Your Cards</h2>
                        <div className="card-container">
                            {player1Cards.map((card, index) => (
                                <div
                                    className={`card user-card ${card.selected ? 'selected' : ''}`}
                                    key={index}
                                    onClick={() => {
                                        const updatedPlayer1Cards = [...player1Cards];
                                        updatedPlayer1Cards[index].selected = !updatedPlayer1Cards[index].selected;
                                        setPlayer1Cards(updatedPlayer1Cards);
                                    }}
                                >
                                    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => {
                        const selectedCardIndices = player1Cards.reduce((indices, card, index) => {
                            if (card.selected) {
                                indices.push(index);
                            }
                            return indices;
                        }, []);
                        handleCardRemovalAndDrawPlayer1(selectedCardIndices);
                        handleCardRemovalAndDrawPlayer2();
                        determineWinner();
                        updatePlaceholderMessage();
                    }}>Remove and Draw</button>
                </div>

            </div>
        </div>
    );
};

export default CardGame;
