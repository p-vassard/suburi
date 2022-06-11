import {pulse} from "../display/Pulser.js";
import {AbstractSuburi} from "./AbstractSuburi.js";
import {Statistics} from "../statistics/Statistics.js";

export class HayaSuburi extends AbstractSuburi {
    name = 'Haya Suburi';
    summary = "Armer en reculant, puis Men en avançant, rapidement";
    difficulty: number;

    interval = {
        1: 1500,
        2: 1000,
        3: 750
    }

    executeOne(params: SuburiParamsInterface): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                setInstruction(getJapanNumber((params.suburiNumber - 1) % 10 + 1));
                Statistics.get().addToCount([Statistics.keys.menCount, Statistics.keys.currentDaySuburiCount, Statistics.getSuburiDifficultyKey(this.difficulty)]);

                let interval1: number;
                let interval2: number;
                let interval3: number;

                switch (this.difficulty) {
                    case 1:
                        interval1 = this.interval[1];
                        interval2 = this.interval[1];
                        interval3 = this.interval[1];
                        break;
                    case 2:
                        interval1 = this.interval[1];
                        interval2 = this.interval[2];
                        interval3 = this.interval[2];
                        break;
                    case 3:
                        interval1 = this.interval[2];
                        interval2 = this.interval[2];
                        interval3 = this.interval[3];
                }

                let interval: number;
                if (params.suburiNumber < Math.floor(params.suburiTotal / 3)) {
                    interval = interval1;
                } else if (params.suburiNumber > Math.floor(params.suburiTotal / 3) * 2) {
                    interval = interval3;
                } else {
                    interval = interval2;
                }

                pulse();
                Sound.get().playSound();
                await asyncWait(interval);
                resolve();
            })()
        });
    }

    getTips(): Array<string> {
        return [
            "Glissez bien les pieds",
            "Ne sautez pas",
            "Faites de grands pas",
        ]
    }
}