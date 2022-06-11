import {Training} from "./Training.js";
import {Suburi} from "./Suburi.js";

import {Shomen} from "../suburi/Shomen.js";
import {JogeBuri} from "../suburi/JogeBuri.js";
import {HayaSuburi} from "../suburi/HayaSuburi.js";
import {Shifts} from "../suburi/Shifts.js";
import {NanameBuri} from "../suburi/NanameBuri.js";
import {NihoZenshinKotaiMen} from "../suburi/NihoZenshinKotaiMen.js";
import {ZenshinKotaiMen} from "../suburi/ZenshinKotaiMen.js";
import {Kote} from "../suburi/Kote.js";
import {Do} from "../suburi/Do.js";
import {AbstractSuburi} from "../suburi/AbstractSuburi.js";
import {Hits} from "../suburi/Hits.js";
import {Tsuki} from "../suburi/Tsuki.js";

const difficulty1 = [
    'JogeBuri',
    'Shifts',
    'Shomen',
    'Kote',
    'Do',
    'ZenshinKotaiMen',
    'Hits'
]

const difficulty2 = [
    'HayaSuburi',
    'JogeBuri',
    'NanameBuri',
    'NihoZenshinKotaiMen',
    'Shifts',
    'Shomen',
    'Kote',
    'Do',
    'Tsuki',
    'ZenshinKotaiMen',
    'Hits'
]

const difficulty3 = [
    'HayaSuburi',
    'JogeBuri',
    'NanameBuri',
    'NihoZenshinKotaiMen',
    'Shomen',
    'Kote',
    'Do',
    'Tsuki',
    'ZenshinKotaiMen',
    'Hits'
]

const isStarter = [
    'JogeBuri',
    'Shifts',
]

const isFinisher = [
    'HayaSuburi',
    'NihoZenshinKotaiMen',
    'Hits'
]

export function createTraining(difficulty, totalAmount, pauseDuration, displayTips): Training
{
    let training = new Training(difficulty, totalAmount, pauseDuration, displayTips);

    let trainingCount = 0;
    let suburiCount = 10;

    switch (totalAmount) {
        case 50: trainingCount = 5; suburiCount = 10; break;
        case 100: trainingCount = 5; suburiCount = 20; break;
        case 200: trainingCount = 5; suburiCount = 40; break;
        case 300: trainingCount = 6; suburiCount = 50; break;
        case 500: trainingCount = 10; suburiCount = 50; break;
        case 1000: trainingCount = 10; suburiCount = 100; break;
    }

    let availableSuburis = eval('difficulty' + difficulty);
    for (let i = 0 ; i < trainingCount ; i++) {
        let preferedOnes = [];
        if (i === 0) {
            preferedOnes = availableSuburis.filter(value => isStarter.includes(value));
        }
        if (i === trainingCount) {
            preferedOnes = availableSuburis.filter(value => isStarter.includes(value));
        }
        if (preferedOnes.length === 0) {
            preferedOnes = availableSuburis
        }
        const selectedOne = preferedOnes[Math.floor(Math.random() * (preferedOnes.length - 1))];
        training.suburiList.push(new Suburi(suburiCount, createSuburi(selectedOne, difficulty)));
        availableSuburis = availableSuburis.filter(obj => { return obj !== selectedOne });
        if (availableSuburis.length === 0) {
            availableSuburis = eval('difficulty' + difficulty);
        }
    }

    return training;
}

export function createSingleSuburi(
    difficulty: number,
    displayTips: boolean,
    quantity: number,
    suburi: string): Training {

    let training = new Training(difficulty, quantity, 0, displayTips);
    training.suburiList.push(new Suburi(quantity, createSuburi(suburi, difficulty)));

    return training;
}

function createSuburi(name: string, difficulty: number): AbstractSuburi {
    switch(name) {
        case 'HayaSuburi': return new HayaSuburi(difficulty);
        case 'JogeBuri': return new JogeBuri(difficulty);
        case 'NanameBuri': return new NanameBuri(difficulty);
        case 'NihoZenshinKotaiMen': return new NihoZenshinKotaiMen(difficulty);
        case 'Shifts': return new Shifts(difficulty);
        case 'Shomen': return new Shomen(difficulty);
        case 'Kote': return new Kote(difficulty);
        case 'Do': return new Do(difficulty);
        case 'ZenshinKotaiMen': return new ZenshinKotaiMen(difficulty);
        case 'Hits': return new Hits(difficulty);
        case 'Tsuki': return new Tsuki(difficulty);
    }
}