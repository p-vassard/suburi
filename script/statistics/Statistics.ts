import {Achievements} from "../achievements/Achievements.js";
import {RequirementType} from "../achievements/RequirementType.js";
import {Save} from "../misc/Save.js";
import {getVersion} from "../misc/Version.js";
import {Difficulty} from "../training/Difficulty.js";

export class Statistics
{
    private static instance: Statistics;

    public static get(): Statistics {
        if (!Statistics.instance) {
            Statistics.instance = new Statistics();
        }
        return Statistics.instance;
    }

    static keys = {
        'menCount': 'menCount',
        'koteCount': 'koteCount',
        'doCount': 'doCount',
        'tsukiCount': 'tsukiCount',

        'easySuburiCount': 'easySuburiCount',
        'mediumSuburiCount': 'mediumSuburiCount',
        'hardSuburiCount': 'hardSuburiCount',

        'easyTrainingCount': 'easyTrainingCount',
        'mediumTrainingCount': 'mediumTrainingCount',
        'hardTrainingCount': 'hardTrainingCount',

        'consecutiveDays100': 'consecutiveDays100',
        'consecutiveDays500': 'consecutiveDays500',
        'consecutiveDays1000': 'consecutiveDays1000',
        'currentDaySuburiCount': 'currentDaySuburiCount',

        'consecutiveDays': 'consecutiveDays',
        'lastSeen': 'lastSeen',
    }

    static category = {
        'menCount': RequirementType.Hit,
        'koteCount': RequirementType.Hit,
        'doCount': RequirementType.Hit,
        'tsukiCount': RequirementType.Hit,

        'easySuburiCount': RequirementType.Suburi,
        'mediumSuburiCount': RequirementType.Suburi,
        'hardSuburiCount': RequirementType.Suburi,

        'easyTrainingCount': RequirementType.Training,
        'mediumTrainingCount': RequirementType.Training,
        'hardTrainingCount': RequirementType.Training,

        'consecutiveDays100': RequirementType.Time,
        'consecutiveDays500': RequirementType.Time,
        'consecutiveDays1000': RequirementType.Time,
        'currentDaySuburiCount': RequirementType.Time,

        'consecutiveDays': RequirementType.Time,
        'lastSeen': RequirementType.Time,
    }

    menCount: number = 0;
    koteCount: number = 0;
    doCount: number = 0;
    tsukiCount: number = 0;

    easySuburiCount: number = 0;
    mediumSuburiCount: number = 0;
    hardSuburiCount: number = 0;

    easyTrainingCount: number = 0;
    mediumTrainingCount: number = 0;
    hardTrainingCount: number = 0;

    consecutiveDays100: number = 0;
    maxConsecutiveDays100: number = 0;
    consecutiveDays500: number = 0;
    maxConsecutiveDays500: number = 0;
    consecutiveDays1000: number = 0;
    maxConsecutiveDays1000: number = 0;
    currentDaySuburiCount: number = 0;

    consecutiveDays: number = 0;
    lastSeen: Date = new Date();

    version: string = getVersion();

    addToCount(names: string[], count: number = 1) {
        for(const i in names)
        {
            const name = names[i];
            this[name] += count;

            const category = Statistics.category[name];
            Achievements.get().verify(category);

            if (category === RequirementType.Hit) {
                if (this.currentDaySuburiCount === 100) {
                    this.consecutiveDays100++;
                    this.maxConsecutiveDays100 = this.consecutiveDays100 > this.maxConsecutiveDays100
                        ? this.consecutiveDays100
                        : this.maxConsecutiveDays100;
                }
                if (this.currentDaySuburiCount === 500) {
                    this.consecutiveDays500++;
                    this.maxConsecutiveDays500 = this.consecutiveDays500 > this.maxConsecutiveDays500
                        ? this.consecutiveDays500
                        : this.maxConsecutiveDays500;
                }
                if (this.currentDaySuburiCount === 1000) {
                    this.consecutiveDays1000++;
                    this.maxConsecutiveDays1000 = this.consecutiveDays1000 > this.maxConsecutiveDays1000
                        ? this.consecutiveDays1000
                        : this.maxConsecutiveDays1000;
                }
                Achievements.get().verify(RequirementType.Time);
            }
        }
        Save.save();
    }

    static getSuburiDifficultyKey(difficulty: Difficulty) {
        return Statistics.getDifficultyKey(difficulty) + 'SuburiCount';
    }
    static getTrainingDifficultyKey(difficulty: Difficulty) {
        return Statistics.getDifficultyKey(difficulty) + 'TrainingCount';
    }

    static getDifficultyKey(difficulty: Difficulty) {
        switch(difficulty.difficulty) {
            case 1: return 'easy';
            case 2: return 'medium';
            case 3: return 'hard';
        }
    }

    manageTime() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const beforeYesterday = new Date();
        beforeYesterday.setDate(beforeYesterday.getDate() - 2);

        if (this.lastSeen === undefined) {
            this.lastSeen = new Date();
        }

        if (this.lastSeen.toDateString() !== new Date().toDateString()) {
            this.currentDaySuburiCount = 0;
        }

        if (this.lastSeen.toDateString() === yesterday.toDateString()) {
            this.consecutiveDays++;
            this.lastSeen = new Date();
        }
        else if (this.lastSeen < beforeYesterday) {
            this.lastSeen = new Date();
            this.consecutiveDays = 0;
            this.consecutiveDays100 = 0;
            this.consecutiveDays500 = 0;
            this.consecutiveDays1000 = 0;
        }

        Save.save();
    }

    toJSON()
    {
        let list = {};
        Object.keys(this).forEach((key: string) => {
            list[key] = this[key];
        });
        return list;
    }

    fromJSON(list) {
        if (list == undefined) {
            return;
        }
        Object.keys(list).forEach((key: string) => {
            if (this.hasOwnProperty(key)) {
                if (key == 'lastSeen') {
                    this[key] = new Date(list[key]);
                    return;
                }
                this[key] = list[key];
            }
        });
    }
}