import {pulse} from "../display/Pulser.js";
import {AbstractSuburi} from "./AbstractSuburi.js";
import {Statistics} from "../statistics/Statistics.js";
import {HitTypes} from "../statistics/HitTypes.js";

export class Hits extends AbstractSuburi {
    name = 'Frappes aléatoires';
    summary = "Frappez ce qui est indiqué puis revenez en Kamae";
    difficulty: number;

    intervalsBeforeHit = {
        1: 2000,
        2: 1500,
        3: 1000
    };
    intervalsBetweenHitAndKamae = {
        1: 2000,
        2: 1500,
        3: 1000
    };
    randomDurationsBeforeHit = {
        1: 0,
        2: 1500,
        3: 3000,
    }
    randomDurationsBetweenHitAndKamae = {
        1: 0,
        2: 1500,
        3: 3000,
    }

    chooseHit(): string
    {
        const hits = {
            30: HitTypes.MEN,
            60: HitTypes.KOTE,
            90: HitTypes.DO,
            100: HitTypes.TSUKI
        }

        const randomHit = random(0, 99);
        for(const i in hits) {
            if (randomHit < parseInt(i)) {
                return hits[i];
            }
        }
    }

    executeOne(params: SuburiParamsInterface): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                const randomDurationBeforeHit = (random(0, (this.difficulty - 1) * 3) === 0)
                    ? random(1000, this.randomDurationsBeforeHit[this.difficulty])
                    : 0;
                const randomDurationBetweenHitAndKamae = (random(0, (this.difficulty - 1) * 3) === 0)
                    ? random(1000, this.randomDurationsBetweenHitAndKamae[this.difficulty])
                    : 0;

                const hit = this.chooseHit();

                setInstruction(capitalizeFirstLetter(hit) + ' !');
                Statistics.get().addToCount([Statistics.keys[hit + 'Count'], Statistics.keys.currentDaySuburiCount, Statistics.getSuburiDifficultyKey(this.difficulty)]);
                pulse(1000);
                Sound.get().playSound();
                await asyncWait(this.intervalsBeforeHit[this.difficulty] + randomDurationBeforeHit);
                setInstruction('Kamae')
                pulse(this.intervalsBeforeHit[this.difficulty]);
                Sound.get().playSound(Sound.SOUND2);
                await asyncWait(this.intervalsBetweenHitAndKamae[this.difficulty] + randomDurationBetweenHitAndKamae);
                resolve();
            })()
        });
    }

    getTips(): Array<string> {
        return [
            "Soyez vigilents",
        ]
    }
}