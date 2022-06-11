import {Shomen} from "./Shomen.js";
import {Statistics} from "../statistics/Statistics.js";

export class Do extends Shomen {
    name = 'Do';
    summary = "Frappez Do puis revenez en Kamae";
    shout = 'Do !'
    statistic = Statistics.keys.doCount;

    getTips(): Array<string> {
        return [
            "Les poignets ne doivent pas être crispés lors de la frappe",
            "Lors de la frappe, la main droite doit être au dessus de la main gauche",
        ]
    }
}