var Metronome = (function () {
    function Metronome(config) {
        this.timeout = 500;
        this.timer = null;
        this.config = config;
    }
    Metronome.prototype.init = function () {
        var _this = this;
        this.prepareSelectBox();
        this.loadSound();
        this.config.startButton.addEventListener("click", function () { _this.start(); }, false);
        this.config.stopButton.addEventListener("click", function () { _this.stop(); }, false);
        this.config.soundSelectBox.addEventListener("change", function () { _this.reloadSound(); }, false);
    };
    Metronome.prototype.getSoundName = function () {
        return this.config.soundSelectBox.value;
    };
    Metronome.prototype.loadSound = function () {
        var _this = this;
        var soundName = this.getSoundName();
        sounds.loadSound(soundName, function () {
            _this.disableInputs(false, false, true, false);
        });
    };
    Metronome.prototype.prepareSelectBox = function () {
        var soundSelectBox = this.config.soundSelectBox;
        for (var i = 0; i < samples.samplesList.length; i++) {
            var sample = samples.samplesList[i];
            var option = document.createElement("option");
            option.text = sample.name;
            option.value = sample.value;
            soundSelectBox.appendChild(option);
        }
    };
    Metronome.prototype.reloadSound = function () {
        var _this = this;
        var soundName = this.getSoundName();
        this.disableInputs(true, true, true, true);
        sounds.loadSound(soundName, function () {
            _this.disableInputs(false, false, true, false);
        });
    };
    Metronome.prototype.setTimeout = function () {
        var inputValue = this.config.timeoutInput.valueAsNumber;
        this.timeout = 60000 / inputValue;
    };
    Metronome.prototype.start = function () {
        this.stop();
        this.setTimeout();
        this.timer = setInterval(function () {
            sounds.playSound();
        }, this.timeout);
        this.disableInputs(true, true, false, true);
    };
    Metronome.prototype.stop = function () {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.disableInputs(false, false, true, false);
    };
    Metronome.prototype.disableInputs = function (timeoutInputDisabled, soundSelectBoxDisabled, stopButtonDisabled, startButtonDisabled) {
        this.config.timeoutInput.disabled = timeoutInputDisabled;
        this.config.stopButton.disabled = stopButtonDisabled;
        this.config.startButton.disabled = startButtonDisabled;
        this.config.soundSelectBox.disabled = soundSelectBoxDisabled;
    };
    return Metronome;
}());
