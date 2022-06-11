import {Requirement} from "./Requirement.js";
import {RequirementType} from "./RequirementType.js";
import {Statistics} from "../statistics/Statistics.js";

export class HitRequirement extends Requirement {
    hitType: string;

    constructor(hitType: string, name: string, hint: string, count: number) {
        super(name, hint, count, RequirementType.Hit);
        this.hitType = hitType;
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
        return this.achieved ? this.count : Statistics.get()[this.hitType + 'Count'];
    }
}