import {Suburi} from "./Suburi.js";
import {Statistics} from "../statistics/Statistics.js";
import {showNavbar} from "../controller/Controller.js";
import {Difficulty} from "./Difficulty.js";

export class Training {
    difficulty: Difficulty;
    totalAmount: number;
    pauseDuration: number;
    displayTips: boolean;
    suburiList: Array<Suburi> = [];

    currentSuburiNumber = 0;

    constructor(difficulty: Difficulty, totalAmount: number, pauseDuration: number, displayTips: boolean) {
        this.difficulty = difficulty;
        this.totalAmount = totalAmount;
        this.pauseDuration = pauseDuration;
        this.displayTips = displayTips;
    }

    execute(): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                for (const i in this.suburiList) {

                    this.currentSuburiNumber = parseInt(i);
                    Sound.get().playSound(Sound.START1);
                    const selector = '#suburi-list .list-group .list-group-item';
                    $(selector).removeClass('active');
                    $(selector + `:nth-child(${this.currentSuburiNumber + 1})`).addClass('active');

                    this.suburiList[i].resetProgressBar();
                    this.showSuburiTips(this.suburiList[i]);
                    await this.showSuburiInstructions(this.suburiList[i]);

                    await this.suburiList[i].execute();

                    if (parseInt(i) < this.suburiList.length - 1) {
                        Sound.get().playSound(Sound.END1);
                    }
                    await this.executePauseBetweenSuburis();
                }

                setInstruction("Sonkyo, Osamaeto");
                Statistics.get().addToCount([Statistics.getTrainingDifficultyKey(this.difficulty)]);
                showNavbar();
                setTips("<button class='btn btn-primary' onclick='new bootstrap.Modal(document.getElementById(\"configModal\")).toggle()'>Recommencer !</button>");

                switch(this.difficulty.difficulty) {
                    case 1: Sound.get().playSound(Sound.END2); break;
                    case 2: Sound.get().playSound(Sound.END3); break;
                    case 3: Sound.get().playSound(Sound.END4); break;
                }
                resolve();
            })()
        });
    }

    executePauseBetweenSuburis(): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                setInstruction('Yame');
                await asyncWait(this.pauseDuration - 3000);
                resolve();
            })()
        });
    }

    showSuburiInstructions(suburi: Suburi): Promise<void> {
        return new Promise<void>(resolve => {
            (async () => {
                setInstruction(suburi.suburi.name);
                await asyncWait(5000);
                resolve();
            })()
        });
    }

    showSuburiTips(suburi: Suburi): void {
        setTips(suburi.suburi.summary);
    }
}