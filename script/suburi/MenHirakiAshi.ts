import {ZenshinKotaiMen} from "./ZenshinKotaiMen.js";

export class MenHirakiAshi extends ZenshinKotaiMen {
    name = 'Men Hiraki Ashi';
    summary = "Frappez Men en déplacement Hiraki Ashi";
    difficulty: number;

    getTips(): Array<string> {
        return [
            "Les poignets ne doivent pas être crispés lors de la frappe",
        ]
    }
}