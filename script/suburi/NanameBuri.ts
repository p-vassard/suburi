import {JogeBuri} from "./JogeBuri.js";

export class NanameBuri extends JogeBuri
{
    name = 'Naname Buri';
    summary = "Frapper souplement à la hauteur du genou de haut en bas, en grand et en oblique";

    getTips(): Array<string> {
        return [
            "Au plus haut, la pointe du shinaï doit percer le ciel",
            "Au plus bas, la points du shinaï doit être à la hauteur de votre genou",
            "Pensez à armer droit, même si la frappe est oblique",
        ]
    }
}