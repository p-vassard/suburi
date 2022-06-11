import {Shomen} from "./Shomen.js";
import {Statistics} from "../statistics/Statistics.js";

export class Kote extends Shomen {
    name = 'Kote';
    summary = "Frappez Kote puis revenez en Kamae";
    shout = 'Kote !'
    statistic = Statistics.keys.koteCount;
}