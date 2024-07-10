function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateValues(names, size) {
    const totalCells = size * size;
    const followUpQuestionNumbers = names.slice(0, totalCells);
    const fillers = [...Array(totalCells - followUpQuestionNumbers.length).keys()].map(i => `F${i + 1}`);
    return shuffleArray(followUpQuestionNumbers.concat(fillers));
}

function createBingoCard(values, size) {
    const card = [];
    for (let i = 0; i < size; i++) {
        card.push(values.slice(i * size, (i + 1) * size));
    }
    return card;
}

function generateBingoCards(names, size) {
    const totalCells = size * size;
    const bingoCards = [];

    for (let i = 0; i < names.length; i++) {
        const values = generateValues(names, size);
        const card = createBingoCard(values.slice(0, totalCells), size);
        bingoCards.push(card);
    }
    return bingoCards;
}

function generateAndDisplayBingoCards() {
    const namesInput = document.getElementById('names').value;
    const names = namesInput.split(',').map(name => name.trim());
    const PLAYERS = names.length;
    const x = Math.ceil(Math.sqrt(PLAYERS));

    // Generate unique bingo cards
    const bingoCards = generateBingoCards(names, x);

    // Display the bingo cards
    const container = document.getElementById('bingo-cards');
    container.innerHTML = ''; // Clear previous cards
    bingoCards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        // Add Shruti's Birthday Bingo title
        const birthdayTitle = document.createElement('div');
        birthdayTitle.className = 'card-title';
        birthdayTitle.textContent = "Shruti's Birthday Bingo";
        cardDiv.appendChild(birthdayTitle);

        card.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'card-row';
            row.forEach(cell => {
                const cellDiv = document.createElement('div');
                cellDiv.className = 'card-cell';
                cellDiv.textContent = cell;
                rowDiv.appendChild(cellDiv);
            });
            cardDiv.appendChild(rowDiv);
        });

        container.appendChild(cardDiv);
    });

    // Hide the input container
    document.getElementById('input-container').style.display = 'none';
}
