function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateValues(totalCells) {
    const fillers = [...Array(totalCells).keys()].map(i => i + 1);
    return shuffleArray(fillers);
}

function createBingoCard(values, size) {
    const card = [];
    for (let i = 0; i < size; i++) {
        card.push(values.slice(i * size, (i + 1) * size));
    }
    return card;
}

function generateBingoCards(playerCount, size) {
    const totalCells = size * size;
    const bingoCards = [];

    for (let i = 0; i < playerCount; i++) {
        const values = generateValues(totalCells);
        const card = createBingoCard(values.slice(0, totalCells), size);
        bingoCards.push(card);
    }

    return bingoCards;
}

function generateCSV(bingoCards) {
    let csvContent = "data:text/csv;charset=utf-8,";
    bingoCards.forEach((card, index) => {
        csvContent += `Card ${index + 1}\n`;
        card.forEach(row => {
            csvContent += row.join(",") + "\n";
        });
        csvContent += "\n"; // Add an empty line between cards
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bingo_cards.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "bingo_cards.csv"
}

function generateAndDownloadBingoCards() {
    const playerCountInput = document.getElementById('playerCount').value;
    const playerCount = parseInt(playerCountInput, 10);
    const x = Math.ceil(Math.sqrt(playerCount));

    // Generate unique bingo cards
    const bingoCards = generateBingoCards(playerCount, x);

    // Generate and download CSV
    generateCSV(bingoCards);

    // Hide the input container
    document.getElementById('input-container').style.display = 'none';
}
