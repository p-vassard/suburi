export class Difficulty {
    difficulty: number;

    constructor(difficulty: number) {
        if (difficulty < 1 || difficulty > 3) {
            throw new Error();
        }
        this.difficulty = difficulty;
    }

    getName(): string
    {
        switch(this.difficulty) {
            case 1: return '< 1er dan';
            case 2: return '1er à 2ème dan';
            case 3: return '3ème dan et plus';
        }
    }
}