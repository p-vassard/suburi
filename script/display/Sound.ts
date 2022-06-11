class Sound
{
    private static instance: Sound;

    hasSound: boolean = true;

    public static readonly SOUND1 = 'beep1.wav';
    public static readonly SOUND2 = 'beep2.wav';
    public static readonly END1 = 'end1.wav';
    public static readonly END2 = 'end2.wav';
    public static readonly END3 = 'end3.wav';
    public static readonly END4 = 'end4.wav';
    public static readonly START1 = 'start1.wav';
    public static readonly ACHIEVEMENT1 = 'achievement1.wav';


    public static get(): Sound {
        if (!Sound.instance) {
            Sound.instance = new Sound();
        }
        return Sound.instance;
    }

    public playSound(sound: string = Sound.SOUND1) {
        if (!this.hasSound) {
            return;
        }
        const audio = new Audio(`assets/sounds/${sound}`);
        audio.play();
    }

    public toggle(status: boolean) {
        this.hasSound = status;
    }
}