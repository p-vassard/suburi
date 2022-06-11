import {Requirement} from "./Requirement.js";
import {RequirementType} from "./RequirementType.js";
import {Statistics} from "../statistics/Statistics.js";

export class SuburiConsecutiveDaysRequirement extends Requirement
{
    suburiCount: number;

    constructor(suburiCount: number, name: string, hint: string, count: number) {
        super(name, hint, count, RequirementType.Time);
        this.suburiCount = suburiCount;
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

    getProgression(): number {
        return this.achieved
            ? this.count
            : Math.max(
                Statistics.get()['consecutiveDays' + this.suburiCount],
                Statistics.get()['maxConsecutiveDays' + this.suburiCount]
            );
    }
}