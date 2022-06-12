import {pulse} from "../display/Pulser.js";
import {AbstractSuburi} from "./AbstractSuburi.js";
import {Statistics} from "../statistics/Statistics.js";
import {Difficulty} from "../training/Difficulty.js";

export class Shomen extends AbstractSuburi {
    name = 'Shomen';
    summary = "Frappez Men puis revenez en Kamae";
    difficulty: Difficulty;

    shout = 'Men !';
    statistic = Statistics.keys.menCount;

    intervalsBeforeMen = {
        1: 2000,
        2: 1500,
        3: 1000
    };
    intervalsBetweenMenAndKamae = {
        1: 2000,
        2: 1500,
        3: 1000
    };
    randomDurationsBeforeMen = {
        1: 0,
        2: 1500,
        3: 3000,
    }
    randomDurationsBetweenMenAndKamae = {
        1: 0,
        2: 1500,
        3: 3000,
    }

    executeOne(params: SuburiParamsInterface): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                const maxRandom = this.getRandomFactorFromDifficulty();
                const randomDurationBeforeMen = (random(0, maxRandom) === 0)
                    ? random(1000, this.randomDurationsBeforeMen[this.difficulty.difficulty])
                    : 0;
                const randomDurationBetweenMenAndKamae = (random(0, maxRandom) === 0)
                    ? random(1000, this.randomDurationsBetweenMenAndKamae[this.difficulty.difficulty])
                    : 0;

                setInstruction(this.shout)
                Statistics.get().addToCount([this.statistic, Statistics.keys.currentDaySuburiCount, Statistics.getSuburiDifficultyKey(this.difficulty)]);
                pulse(1000);
                Sound.get().playSound();
                await asyncWait(this.intervalsBeforeMen[this.difficulty.difficulty] + randomDurationBeforeMen);
                setInstruction('Kamae')
                pulse(this.intervalsBeforeMen[this.difficulty.difficulty]);
                Sound.get().playSound(Sound.SOUND2);
                await asyncWait(this.intervalsBetweenMenAndKamae[this.difficulty.difficulty] + randomDurationBetweenMenAndKamae);
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