class Metronome {    

    config: MetronomeConfig;
    timeout: number = 500;
    timer: number = null;

    // ================================================================
    // Construction
    // ================================================================
    constructor(config: MetronomeConfig) {

        this.config = config;
    }

    // ================================================================
    // Public methods
    // ================================================================
    public init(): void {

        this.prepareSelectBox();
        this.loadSound();
        this.config.startButton.addEventListener("click", () => { this.start(); }, false);
        this.config.stopButton.addEventListener("click", () => { this.stop(); }, false);
        this.config.soundSelectBox.addEventListener("change", () => { this.reloadSound(); }, false);
    }

    // ================================================================
    // Private methods
    // ================================================================
    getSoundName(): string {
        return this.config.soundSelectBox.value;
    }

    // ----------------------------------------------------------------
    loadSound(): void {
        var soundName: string = this.getSoundName();
        sounds.loadSound(soundName, () => {
            this.disableInputs(false, false, true, false);
        });
    }

    // ----------------------------------------------------------------
    prepareSelectBox(): void {

        var soundSelectBox: HTMLSelectElement = this.config.soundSelectBox;

        for (var i = 0; i < samples.samplesList.length; i++) {

            var sample: samples.Sample = samples.samplesList[i];
            var option: HTMLOptionElement = document.createElement("option");
            option.text = sample.name;
            option.value = sample.value;
            soundSelectBox.appendChild(option);
        }
    }

    // ----------------------------------------------------------------
    reloadSound(): void {
        var soundName: string = this.getSoundName();
        this.disableInputs(true, true, true, true);
        sounds.loadSound(soundName, () => {
            this.disableInputs(false, false, true, false);
        });
    }

    // ----------------------------------------------------------------
    setTimeout(): void {
        var inputValue: number = this.config.timeoutInput.valueAsNumber;
        this.timeout = 60000 / inputValue;
    }

    // ----------------------------------------------------------------
    start(): void {

        this.stop();
        this.setTimeout();

        this.timer = setInterval(() => {
            sounds.playSound();
        }, this.timeout);

        this.disableInputs(true, true, false, true);
    }

    // ----------------------------------------------------------------
    stop(): void {

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.disableInputs(false, false, true, false);
    }

    // ----------------------------------------------------------------
    disableInputs(timeoutInputDisabled: boolean, soundSelectBoxDisabled: boolean, stopButtonDisabled: boolean, startButtonDisabled: boolean): void {
        this.config.timeoutInput.disabled = timeoutInputDisabled;
        this.config.stopButton.disabled = stopButtonDisabled;
        this.config.startButton.disabled = startButtonDisabled;
        this.config.soundSelectBox.disabled = soundSelectBoxDisabled;
    }
}