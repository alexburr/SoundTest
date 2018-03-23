// ================================================================
// Setup
// ================================================================
var metronome: Metronome = null;

// ================================================================
// Methods
// ================================================================
function init() {
    try {
        sounds.audioInit();

        var metronomeConfig: MetronomeConfig = {
            soundSelectBox: <HTMLSelectElement>document.getElementById("soundSelect"),
            startButton: <HTMLButtonElement>document.getElementById("startButton"),
            stopButton: <HTMLButtonElement>document.getElementById("stopButton"),
            timeoutInput: <HTMLInputElement>document.getElementById("timeoutInput")
        };

        metronome = new Metronome(metronomeConfig);
        metronome.init();
    }
    catch (error) {
        onError("Web Audio API is not supported in this browser");
    }
}

// ----------------------------------------------------------------
function onError(error: any) {
    console.log(error);
}

// ================================================================
// Execution
// ================================================================
window.addEventListener("load", init, false);