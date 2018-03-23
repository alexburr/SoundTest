var metronome = null;
function init() {
    try {
        sounds.audioInit();
        var metronomeConfig = {
            soundSelectBox: document.getElementById("soundSelect"),
            startButton: document.getElementById("startButton"),
            stopButton: document.getElementById("stopButton"),
            timeoutInput: document.getElementById("timeoutInput")
        };
        metronome = new Metronome(metronomeConfig);
        metronome.init();
    }
    catch (error) {
        onError("Web Audio API is not supported in this browser");
    }
}
function onError(error) {
    console.log(error);
}
window.addEventListener("load", init, false);
