import {Shomen} from "./Shomen.js";
import {Statistics} from "../statistics/Statistics.js";

export class Tsuki extends Shomen {
    name = 'Tsuki';
    summary = "Frappez Tsuki puis revenez en Kamae";
    shout = 'Tsuki !'
    statistic = Statistics.keys.tsukiCount;

    getTips(): Array<string> {
        return [
            "Les poignets ne doivent pas être crispés lors de la frappe",
            "Pensez d'abord au déplacement"
        ]
    }
}