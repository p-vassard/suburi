import {AbstractSuburi} from "../suburi/AbstractSuburi.js";

export class Tips {
    tipsList: Array<string>;
    index = 0;

    constructor(suburi: AbstractSuburi) {
        this.reset(suburi);
    }

    reset(suburi: AbstractSuburi): void
    {
        this.tipsList = [...this.generalTips(), ...suburi.getTips()];
        shuffleArray(this.tipsList);
    }

    getOne(): string
    {
        return this.tipsList[(this.index++) % this.tipsList.length];
    }

    generalTips() {
        return [
            "Augmentez l'amplitude des déplacements",
            "Regardez bien devant vous, au niveau des yeux de votre adversaire",
            "Pensez à garder les pieds parallèles",
            "Détendez les épaules",
            "Pensez au Kiai, même s'il est silencieux",
            "La tête doit rester au même niveau lors des déplacements"
        ]
    }
}