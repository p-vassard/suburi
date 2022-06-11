import {Requirement} from "./Requirement.js";
import {HitRequirement} from "./HitRequirement.js";
import {RequirementType} from "./RequirementType.js";
import {HitTypes} from "../statistics/HitTypes.js";
import {createToast} from "../display/Toast.js";
import {SuburiConsecutiveDaysRequirement} from "./SuburiConsecutiveDaysRequirement.js";
import {Save} from "../misc/Save.js";
import {TrainingRequirement} from "./TrainingRequirement.js";

export class Achievements {
    private static instance: Achievements;

    public static get(): Achievements {
        if (!Achievements.instance) {
            Achievements.instance = new Achievements();
            Achievements.instance.initialize();
        }
        return Achievements.instance;
    }

    list: Requirement[] = [];
    alreadyAchieved: Requirement[] = [];

    verify(type: RequirementType) {
        this.list
            .filter((requirement: Requirement) => requirement.type === type)
            .filter((requirement: Requirement) => requirement.checkIfAchieved())
            .filter((requirement: Requirement) => this.alreadyAchieved.indexOf(requirement) < 0)
            .map((requirement: Requirement) => this.handleNewAchievement(requirement));
    }

    verifyAllOnLoad() {
        this.list
            .filter((requirement: Requirement) => requirement.checkIfAchieved())
            .map((requirement: Requirement) => this.alreadyAchieved.push(requirement));
    }

    initialize() {
        this.list.push(new HitRequirement(HitTypes.MEN, "Men, c'est la base", "Faire 10 Men", 10));
        this.list.push(new HitRequirement(HitTypes.MEN, "Quelle autre frappe ?", "Faire 100 Men", 100));
        this.list.push(new HitRequirement(HitTypes.MEN, "On peut tout gagner avec des Men", "Faire 1 000 Men", 1000));
        this.list.push(new HitRequirement(HitTypes.MEN, "L'air a mal au crâne", "Faire 10 000 Men", 10000));
        this.list.push(new HitRequirement(HitTypes.MEN, "Plus vite je frapperai, plus vite j'aurai atteint les 100 000", "Faire 100 000 Men", 100000));

        this.list.push(new HitRequirement(HitTypes.KOTE, "Kote, l'autre frappe", "Faire 10 Kote", 10));
        this.list.push(new HitRequirement(HitTypes.KOTE, "Avec ou sans Kote ?", "Faire 100 Kote", 100));
        this.list.push(new HitRequirement(HitTypes.KOTE, "Ne jamais mettre cette frappe de côté", "Faire 1 000 Kote", 1000));
        this.list.push(new HitRequirement(HitTypes.KOTE, "It's over 9000!", "Faire 10 000 Kote", 10000));
        this.list.push(new HitRequirement(HitTypes.KOTE, "Vas-y, lance Men pour voir", "Faire 100 000 Kote", 100000));

        this.list.push(new HitRequirement(HitTypes.DO, "Dôôôôôô", "Faire 10 Do", 10));
        this.list.push(new HitRequirement(HitTypes.DO, "J'aime le son que produit Do", "Faire 100 Do", 100));
        this.list.push(new HitRequirement(HitTypes.DO, "Cette frappe est trop classe", "Faire 1 000 Do", 1000));
        this.list.push(new HitRequirement(HitTypes.DO, "Hé, on peut la faire des deux côtés !", "Faire 10 000 Do", 10000));
        this.list.push(new HitRequirement(HitTypes.DO, "J'espère que ton armure est solide", "Faire 100 000 Do", 100000));

        this.list.push(new HitRequirement(HitTypes.TSUKI, "Tsukiiii", "Faire 10 Tsuki", 10));
        this.list.push(new HitRequirement(HitTypes.TSUKI, "Vise bien stp ^^'", "Faire 100 Tsuki", 100));
        this.list.push(new HitRequirement(HitTypes.TSUKI, "Toujours plus vite, toujours plus fort", "Faire 1 000 Tsuki", 1000));
        this.list.push(new HitRequirement(HitTypes.TSUKI, "A une ou deux mains ?", "Faire 10 000 Tsuki", 10000));
        this.list.push(new HitRequirement(HitTypes.TSUKI, "Bouge pas, je vise", "Faire 100 000 Tsuki", 100000));

        this.list.push(new TrainingRequirement(1, "On commence tous par là", "Faire 10 entraînements < 1er dan", 10));
        this.list.push(new TrainingRequirement(1, "Les pieds chauffent un peu non ?", "Faire 100 entraînements < 1er dan", 100));
        this.list.push(new TrainingRequirement(1, "Il faut vraiment attendre 3 ans ?", "Faire 1000 entraînements < 1er dan", 1000));
        this.list.push(new TrainingRequirement(2, "On s'y met sérieusement", "Faire 10 entraînements 1er à 2ème dan", 10));
        this.list.push(new TrainingRequirement(2, "C'est une histoire sans fin", "Faire 100 entraînements 1er à 2ème dan", 100));
        this.list.push(new TrainingRequirement(2, "Est-ce une addiction ?", "Faire 1000 entraînements 1er à 2ème dan", 1000));
        this.list.push(new TrainingRequirement(3, "Est-ce vraiment plus dur ?", "Faire 10 entraînements > 3ème dan", 10));
        this.list.push(new TrainingRequirement(3, "Les bras de Saitama", "Faire 100 entraînements > 3ème dan", 100));
        this.list.push(new TrainingRequirement(3, "Ces entraînements sont vraiemnt trop faciles...", "Faire 1000 entraînements > 3ème dan", 1000));

        this.list.push(new SuburiConsecutiveDaysRequirement(100, "J'aime m'entraîner à taper", "Faire 100 suburi 7 jours de suite", 7));
        this.list.push(new SuburiConsecutiveDaysRequirement(100, "J'aime taper", "Faire 100 suburi 30 jours de suite", 30));
        this.list.push(new SuburiConsecutiveDaysRequirement(100, "J'aime", "Faire 100 suburi 365 jours de suite", 365));

        this.list.push(new SuburiConsecutiveDaysRequirement(500, "Des épaules en fer", "Faire 500 suburi 7 jours de suite", 7));
        this.list.push(new SuburiConsecutiveDaysRequirement(500, "Des épaules en acier", "Faire 500 suburi 30 jours de suite", 30));
        this.list.push(new SuburiConsecutiveDaysRequirement(500, "Des épaules en adamantium", "Faire 500 suburi 365 jours de suite", 365));

        this.list.push(new SuburiConsecutiveDaysRequirement(1000, "Préparation pour le summer body", "Faire 1000 suburi 7 jours de suite", 7));
        this.list.push(new SuburiConsecutiveDaysRequirement(1000, "Préparation pour les JO", "Faire 1000 suburi 30 jours de suite", 30));
        this.list.push(new SuburiConsecutiveDaysRequirement(1000, "Préparation pour combattre les martiens", "Faire 1000 suburi 365 jours de suite", 365));
    }

    async handleNewAchievement(requirement: Requirement) {
        this.alreadyAchieved.push(requirement);
        Save.save();
        await asyncWait(500);
        Sound.get().playSound(Sound.ACHIEVEMENT1);
        createToast('🏆 Nouveau Trophée', requirement.name, requirement.hint);
    }
}