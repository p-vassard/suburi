import {pulse} from "../display/Pulser.js";
import {AbstractSuburi} from "./AbstractSuburi.js";
import {Statistics} from "../statistics/Statistics.js";

export class Shomen extends AbstractSuburi {
    name = 'Shomen';
    summary = "Frappez Men puis revenez en Kamae";
    difficulty: number;

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
                const randomDurationBeforeMen = (random(0, (this.difficulty - 1) * 3) === 0)
                    ? random(1000, this.randomDurationsBeforeMen[this.difficulty])
                    : 0;
                const randomDurationBetweenMenAndKamae = (random(0, (this.difficulty - 1) * 3) === 0)
                    ? random(1000, this.randomDurationsBetweenMenAndKamae[this.difficulty])
                    : 0;

                setInstruction(this.shout)
                Statistics.get().addToCount([this.statistic, Statistics.keys.currentDaySuburiCount, Statistics.getSuburiDifficultyKey(this.difficulty)]);
                pulse(1000);
                Sound.get().playSound();
                await asyncWait(this.intervalsBeforeMen[this.difficulty] + randomDurationBeforeMen);
                setInstruction('Kamae')
                pulse(this.intervalsBeforeMen[this.difficulty]);
                Sound.get().playSound(Sound.SOUND2);
                await asyncWait(this.intervalsBetweenMenAndKamae[this.difficulty] + randomDurationBetweenMenAndKamae);
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