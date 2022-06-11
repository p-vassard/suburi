import {AbstractSuburi} from "../suburi/AbstractSuburi.js";
import {Tips} from "../tips/Tips.js";

export class Suburi {
    count: number;
    suburi: AbstractSuburi;
    tips: Tips;

    constructor(count, suburi) {
        this.count = count;
        this.suburi = suburi;
        this.tips = new Tips(suburi);
    }

    execute(): Promise<void> {
        return new Promise<void>(resolve => {
            $('#current-suburi .progress .progress-bar').css('width', 0);
            (async () => {
                for (let i = 0; i < this.count; i++) {
                    setSuburiProgressBar(100 / this.count * (i + 1), `${i + 1} / ${this.count}`);
                    const params: SuburiParamsInterface = {
                        suburiNumber: i + 1,
                        suburiTotal: this.count
                    };
                    await this.suburi.executeOne(params);
                    if (i !== 0 && i % 25 === 0) {
                        setTips(this.tips.getOne());
                    }
                }
                resolve();
            })()
        });
    }

    resetProgressBar() {
        setSuburiProgressBar(0, `0 / ${this.count}`);
    }
}