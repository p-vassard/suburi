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
}