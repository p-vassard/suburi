import {pulse} from "../display/Pulser.js";
import {AbstractSuburi} from "./AbstractSuburi.js";
import {Statistics} from "../statistics/Statistics.js";
import {Difficulty} from "../training/Difficulty.js";

export class ZenshinKotaiMen extends AbstractSuburi {
    name = 'Zenshin Kotai Men';
    summary = "Men en avançant, Men en reculant";
    difficulty: Difficulty;

    intervals = {
        1: 2000,
        2: 1500,
        3: 1000
    };
    randomDurations = {
        1: 0,
        2: 1500,
        3: 3000,
    }

    executeOne(params: SuburiParamsInterface): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                const maxRandom = this.getRandomFactorFromDifficulty();
                const randomDuration = (random(0, maxRandom) === 0)
                    ? random(1000, this.randomDurations[this.difficulty.difficulty])
                    : 0;
                const duration = this.intervals[this.difficulty.difficulty] + randomDuration;
                setInstruction('Men !')
                Statistics.get().addToCount([Statistics.keys.menCount, Statistics.keys.currentDaySuburiCount, Statistics.getSuburiDifficultyKey(this.difficulty)]);
                pulse(duration);
                Sound.get().playSound();
                await asyncWait(duration);
                resolve();
            })()
        });
    }

    getTips(): Array<string> {
        return [
            "Les poignets ne doivent pas être crispés lors de la frappe",
        ]
    }
}