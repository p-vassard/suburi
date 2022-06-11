export abstract class Requirement {
    name: string;
    hint: string;
    count: number;
    type: string;
    score: number;
    achieved: boolean;

    protected constructor(name: string, hint: string, count: number, type: string, score: number) {
        this.name = name;
        this.hint = hint;
        this.count = count;
        this.type = type;
        this.score = score;
    }

    checkIfAchieved(): boolean
    {
        if (this.achieved) {
            return true;
        }
        if (this.getProgression() >= this.count) {
            this.achieved = true;
        }
        return this.achieved;
    }

    abstract getProgression(): number;
}