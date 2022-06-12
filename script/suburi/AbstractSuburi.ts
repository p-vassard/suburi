import {Difficulty} from "../training/Difficulty.js";

export abstract class AbstractSuburi
{
    name: string;
    summary: string;
    difficulty: Difficulty;

    public constructor(difficulty: Difficulty) {
        this.difficulty = difficulty;
    }

    abstract executeOne(params: SuburiParamsInterface): Promise<void>;
    abstract getTips(): Array<string>;

    getRandomFactorFromDifficulty(factor: number = 1): number {
        switch (this.difficulty.difficulty) {
            case 1:
                return Math.floor(50 * factor);
            case 2:
                return Math.floor(25 * factor);
            case 3:
                return Math.floor(15 * factor);
        }
    }
}