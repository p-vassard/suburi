function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms));

function getJapanNumber(i): string {
    switch(i) {
        case 1: return 'Itchi';
        case 2: return 'Ni';
        case 3: return 'San';
        case 4: return 'Shi';
        case 5: return 'Go';
        case 6: return 'Roku';
        case 7: return 'Shichi';
        case 8: return 'Hachi';
        case 9: return 'Kyuu';
        case 10: return 'Juu';
    }
}

function capitalizeFirstLetter(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}