export abstract class AbstractSuburi
{
    name: string;
    summary: string;
    difficulty: number;

    public constructor(difficulty: number) {
        this.difficulty = difficulty;
    }

    abstract executeOne(params: SuburiParamsInterface): Promise<void>;
    abstract getTips(): Array<string>;

    getRandomFactorFromDifficulty(factor: number = 1): number {
        switch (this.difficulty) {
            case 1:
                return Math.floor(50 * factor);
            case 2:
                return Math.floor(25 * factor);
            case 3:
                return Math.floor(15 * factor);
        }
    }
}