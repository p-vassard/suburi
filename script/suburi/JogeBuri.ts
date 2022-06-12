import {pulse} from "../display/Pulser.js";
import {AbstractSuburi} from "./AbstractSuburi.js";
import {Statistics} from "../statistics/Statistics.js";
import {Difficulty} from "../training/Difficulty.js";

export class JogeBuri extends AbstractSuburi
{
    name = 'Joge Buri';
    summary = "Frapper souplement à la hauteur du genou de haut en bas, en grand";
    difficulty: Difficulty;

    intervals = {
        1: 1500,
        2: 1250,
        3: 1000
    }

    executeOne(params: SuburiParamsInterface): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                setInstruction(getJapanNumber((params.suburiNumber - 1) % 10 + 1));
                Statistics.get().addToCount([Statistics.keys.currentDaySuburiCount, Statistics.getSuburiDifficultyKey(this.difficulty)]);
                const interval = this.intervals[this.difficulty.difficulty];
                pulse(interval);
                Sound.get().playSound();
                await asyncWait(interval);
                resolve();
            })()
        });
    }

    getTips(): Array<string> {
        return [
            "Au plus haut, la pointe du shinaï doit percer le ciel",
            "Au plus bas, la points du shinaï doit être à la hauteur de votre genou",
        ]
    }
}