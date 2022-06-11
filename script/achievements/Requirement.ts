export abstract class Requirement {
    name: string;
    hint: string;
    count: number;
    type: string;
    achieved: boolean;

    protected constructor(name: string, hint: string, count: number, type: string) {
        this.name = name;
        this.hint = hint;
        this.count = count;
        this.type = type;
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