function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBingoCard(questionNumbers, size) {
    shuffleArray(questionNumbers);
    const card = [];
    for (let i = 0; i < questionNumbers.length; i += size) {
        card.push(questionNumbers.slice(i, i + size));
    }
    return card;
}

function generateBingoCards(players, size) {
    const followUpQuestionNumbers = [...Array(players).keys()].map(i => i + 1);
    const bingoCards = new Set();

    while (bingoCards.size < players) {
        const newCard = createBingoCard([...followUpQuestionNumbers], size);
        bingoCards.add(JSON.stringify(newCard));
    }

    return Array.from(bingoCards).map(card => JSON.parse(card));
}

const PLAYERS = 25;
const x = Math.floor(Math.sqrt(PLAYERS));

// Generate unique bingo cards
const bingoCards = generateBingoCards(PLAYERS, x);

// Output the bingo cards
bingoCards.forEach((card, index) => {
    console.log(`Bingo Card ${index + 1}:`);
    card.forEach(row => {
        console.log(row.join(', '));
    });
    console.log();
});
