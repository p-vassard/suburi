import {Statistics} from "../statistics/Statistics.js";
import {Achievements} from "../achievements/Achievements.js";

export class Save {

    public static save(): void
    {
        localStorage.setItem('statistics', JSON.stringify(Statistics.get().toJSON()));
    }

    public static load(): void
    {
        Statistics.get().fromJSON(JSON.parse(localStorage.getItem('statistics')));
        Achievements.get().verifyAllOnLoad();
    }
}