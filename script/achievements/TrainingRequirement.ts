import {Requirement} from "./Requirement.js";
import {RequirementType} from "./RequirementType.js";
import {Statistics} from "../statistics/Statistics.js";
import {Difficulty} from "../training/Difficulty.js";

export class TrainingRequirement extends Requirement {
    difficulty: Difficulty;

    constructor(difficulty: Difficulty, name: string, hint: string, count: number, score: number) {
        super(name, hint, count, RequirementType.Training, score);
        this.difficulty = difficulty;
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
        const statistic = Statistics.getTrainingDifficultyKey(this.difficulty);
        return this.achieved ? this.count : Statistics.get()[statistic];
    }
}