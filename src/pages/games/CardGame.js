import React, { useState, useEffect } from "react";
import './CardGame.css';

const CardGame = () => {

    const [computerCards, setComputerCards] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [deckId, setDeckId] = useState('');
    const [remainingDeck, setRemainingDeck] = useState(52); // Assuming a full deck of 52 cards
    // Instructions
    const [instructions, setInstructions] = useState(`Beat the computer's hand by selecting cards to remove from your hand. Click the deck to reset.`);
    // Winner String
    const [winner, setWinner] = useState('');
    const [isFirstRound, setIsFirstRound] = useState(true);


    // Function to initialize a new deck and draw cards
    const initializeGame = async () => {
        setWinner('');
        setIsFirstRound(true);
        try {
            // Create a new deck
            const newDeckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const newDeckData = await newDeckResponse.json();
            const deckId = newDeckData.deck_id;
            setDeckId(deckId);

            // Draw cards for Computer 
            const computerResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
            const computerCards = await computerResponse.json();
            setComputerCards(computerCards.cards);

            // Draw cards for User
            const userResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=5`);
            const userCards = await userResponse.json();
            setUserCards(userCards.cards);

            setRemainingDeck(newDeckData.remaining - 10); // Subtract 10 cards drawn for both players
        } catch (error) {
            console.error('Error initializing game:', error);
            setInstructions('Failed to initialize the game. Please try again later.'); // Update placeholder message in case of error
        }
    };

    useEffect(() => {
        initializeGame();
    }, []); // Empty dependency array to run effect only once when component mounts


    // Function to handle card removal and drawing new cards from the deck for User
    const handleCardRemovalAndDrawUser = async (selectedCardIndices) => {
        setIsFirstRound(false);

        try {
            // Remove selected cards from player's hand
            const newUserCards = userCards.filter((card, index) => !selectedCardIndices.includes(index));

            // Draw new cards from the deck
            const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${selectedCardIndices.length}`);
            const drawData = await drawResponse.json();
            const drawnCards = drawData.cards;

            // Insert drawn cards at the same position where selected cards were removed
            const updatedUserCards = [...newUserCards];
            selectedCardIndices.forEach((index, i) => {
                updatedUserCards.splice(index, 0, drawnCards[i]);
            });

            // Set the new player 1's hand with updated cards
            setUserCards(updatedUserCards);

            // Update remaining deck count
            setRemainingDeck(prevRemainingDeck => prevRemainingDeck - selectedCardIndices.length);
        } catch (error) {
            console.error('Error handling card removal and drawing for player 1:', error);
        }
    };

    // Function to handle card removal and drawing new cards from the deck for player 2
    const handleCardRemovalAndDrawComputer = async () => {
        try {
            // Determine which cards to remove from player 2's hand to improve the hand strength
            // For simplicity, let's assume the computer randomly removes up to 5 cards
            const randomIndices = [];
            while (randomIndices.length < 5 && randomIndices.length < computerCards.length) {
                const randomIndex = Math.floor(Math.random() * computerCards.length);
                if (!randomIndices.includes(randomIndex)) {
                    randomIndices.push(randomIndex);
                }
            }

            // Remove selected cards from player 2's hand
            const newComputerCards = computerCards.filter((card, index) => !randomIndices.includes(index));

            // Draw new cards from the deck
            const drawResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${randomIndices.length}`);
            const drawData = await drawResponse.json();
            const drawnCards = drawData.cards;

            // Set the new player 2's hand with drawn cards
            setComputerCards([...newComputerCards, ...drawnCards]);

            // Update remaining deck count
            setRemainingDeck(prevRemainingDeck => prevRemainingDeck - randomIndices.length);
        } catch (error) {
            console.error('Error handling card removal and drawing for computer:', error);
        }
    };

    const evaluateHandStrength = (cards) => {
        const cardValues = cards.map(card => card.value);
        const cardSuits = cards.map(card => card.suit);

        const valueMap = {
            "ACE": 14,
            "KING": 13,
            "QUEEN": 12,
            "JACK": 11,
            "10": 10,
            "9": 9,
            "8": 8,
            "7": 7,
            "6": 6,
            "5": 5,
            "4": 4,
            "3": 3,
            "2": 2
        };

        const numericValues = cardValues.map(value => valueMap[value]).sort((a, b) => a - b);

        // Count occurrences of each value and suit
        const valueCounts = {};
        const suitCounts = {};
    
        numericValues.forEach(value => valueCounts[value] = (valueCounts[value] || 0) + 1);
        cardSuits.forEach(suit => suitCounts[suit] = (suitCounts[suit] || 0) + 1);
    
        const uniqueValues = Object.keys(valueCounts).length;
        const valuesArray = Object.values(valueCounts);
    
        const isFlush = Object.keys(suitCounts).length === 1;
        const isStraight = uniqueValues === 5 && numericValues[4] - numericValues[0] === 4;
        const isRoyal = isStraight && isFlush && numericValues[0] === 10;
    
        // Determine hand strength based on count and patterns
        if (isRoyal) return "Royal Flush";
        if (isStraight && isFlush) return "Straight Flush";
        if (valuesArray.includes(4)) return "Four of a Kind";
        if (valuesArray.includes(3) && valuesArray.includes(2)) return "Full House";
        if (isFlush) return "Flush";
        if (isStraight) return "Straight";
        if (valuesArray.includes(3)) return "Three of a Kind";
        if (valuesArray.filter(count => count === 2).length === 2) return "Two Pair";
        if (valuesArray.includes(2)) return "One Pair";
    
        // Default to High Card if no other hand is found
        const highCardValue = Math.max(...numericValues);
        return `High Card (value of ${highCardValue})`;
    };

    // Function to determine the winner based on hand strength
    const determineWinner = () => {
        const computerHandStrength = evaluateHandStrength(computerCards);
        const userHandStrength = evaluateHandStrength(userCards);

        let resultMessage;
        // Compare hand strengths and determine the winner
        if (computerHandStrength === userHandStrength) {
            resultMessage = `It's a tie! Both have ${userHandStrength}.`;
        } else if (handRank(computerHandStrength) > handRank(userHandStrength)) {
            resultMessage = `Computer wins with ${computerHandStrength}!`;
        } else {
            resultMessage = `You win with ${userHandStrength}!`;
        }
        setWinner(resultMessage);
    };


    // Helper function to rank hands for comparison
    const handRank = (hand) => {
        const handRanks = {
            "Royal Flush": 10,
            "Straight Flush": 9,
            "Four of a Kind": 8,
            "Full House": 7,
            "Flush": 6,
            "Straight": 5,
            "Three of a Kind": 4,
            "Two Pair": 3,
            "One Pair": 2,
            "High Card": 1
        };
        return handRanks[hand];
    };

    useEffect(() => {
        if (!isFirstRound && userCards.length === 5 && computerCards.length === 5) {
            determineWinner();
        }
    }, [userCards, computerCards, isFirstRound]);


    return (
        <div className="container container-cardgame">
            <div className="instructions-container">
                <p className="instructions-message">{instructions}</p>
            </div>
            <div className="winner-container">
                <p className="winner-message">{winner}</p>
            </div>
            <div className="card-game-container">
                <div className="left-section">
                    <h2>Deck</h2>
                    <div className="card deck" onClick={() => initializeGame()}>
                        {remainingDeck}
                    </div>
                </div>
                <div className='hand-container'>
                    <div className="player-container">
                        <h2>Computer's Cards</h2>
                        <div className="card-container">
                            {computerCards.map((card, index) => (
                                <div className="card computer-card" key={index}>
                                    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="player-container">
                        <h2>Your Cards</h2>
                        <div className="card-container">
                            {userCards.map((card, index) => (
                                <div
                                    className={`card user-card ${card.selected ? 'selected' : ''}`}
                                    key={index}
                                    onClick={() => {
                                        const updatedUserCards = [...userCards];
                                        updatedUserCards[index].selected = !updatedUserCards[index].selected;
                                        setUserCards(updatedUserCards);
                                    }}
                                >
                                    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => {
                        const selectedCardIndices = userCards.reduce((indices, card, index) => {
                            if (card.selected) {
                                indices.push(index);
                            }
                            return indices;
                        }, []);
                        handleCardRemovalAndDrawComputer();
                        handleCardRemovalAndDrawUser(selectedCardIndices);
                    }}>Mulligan</button>
                </div>

            </div>
        </div>
    );
};

export default CardGame;
