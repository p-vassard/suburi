import {pulse} from "../display/Pulser.js";
import {AbstractSuburi} from "./AbstractSuburi.js";

const maxMoves = 2;
const shiftTypes: { [key: string]: string } = {
    0: '⇒<br />Migi',
    1: '⇐<br />Hidari',
    2: '⇑<br />Mae',
    3: '⇓<br />Ato',
    4: '⇖<br />Avant gauche',
    5: '⇗<br />Avant droit',
    6: '⇙<br />Arrière gauche',
    7: '⇘<br />Arrière droit'
}
const maeAtoValues = {0: 0, 1: 0, 2: 1, 3: -1, 4: 1, 5: 1, 6: -1, 7: -1};
const migiHidariValues = {0: 1, 1: -1, 2: 0, 3: 0, 4: -1, 5: 1, 6: -1, 7: 1};

export class Shifts extends AbstractSuburi
{
    name = 'Déplacements';
    summary = "Déplacez-vous !";
    difficulty: number;

    intervals = {
        1: 1750,
        2: 1500,
        3: 1250
    };
    randomDurations = {
        1: 0,
        2: 1500,
        3: 3000,
    }

    order = [];

    getRandomShift(): number
    {
        switch (this.difficulty) {
            case 1: return Math.floor(Math.random() * 4)
            case 2: return Math.floor(Math.random() * 8)
            case 3: return Math.floor(Math.random() * 8)
        }
    }

    constructor(difficulty: number) {

        super(difficulty);

        let maeAtoCount = 0;
        let migiHidariCount = 0;
        for (let i = 0; i < 100; i++) {
            let flag = false;
            do {
                const random = this.getRandomShift();

                if ((maeAtoCount + maeAtoValues[random]) >= (-1 * maxMoves)
                    && (maeAtoCount + maeAtoValues[random]) <= maxMoves
                    && (migiHidariCount + migiHidariValues[random]) >= (-1 * maxMoves)
                    && (migiHidariCount + migiHidariValues[random]) <= maxMoves) {
                    flag = true;
                    this.order.push(shiftTypes[random]);
                    maeAtoCount += maeAtoValues[random];
                    migiHidariCount += migiHidariValues[random];
                }
            } while (!flag);
        }
    }

    executeOne(params: SuburiParamsInterface): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                setInstruction(this.order[(params.suburiNumber - 1) % this.order.length]);
                pulse(this.intervals[this.difficulty]);
                Sound.get().playSound();
                const maxRandom = this.getRandomFactorFromDifficulty();
                const randomDuration = (random(0, maxRandom) === 0)
                    ? random(1000, this.randomDurations[this.difficulty])
                    : 0;
                await asyncWait(this.intervals[this.difficulty] + randomDuration - 200);
                setInstruction('');
                await asyncWait(200);
                resolve();
            })()
        });
    }

    getTips(): Array<string> {
        return [
            "Glissez bien les pieds",
            "Soyez toujours prêt",
            "Faites de grands pas",
            "Levez légèrement le talon gauche",
            "Ramenez rapidement le pied gauche",
        ]
    }
}