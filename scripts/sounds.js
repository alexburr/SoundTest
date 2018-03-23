var sounds;
(function (sounds) {
    var _defaultTime = 0;
    var audioContext = null;
    var audioBuffer = null;
    function audioInit() {
        window["AudioContext"] = window["AudioContext"] || window["webkitAudioContext"];
        audioContext = new AudioContext();
    }
    sounds.audioInit = audioInit;
    function loadSound(soundName, callback) {
        if (callback === void 0) { callback = null; }
        var url = samples.buildSamplePath(soundName);
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        request.onload = function (event) {
            audioContext.decodeAudioData(request.response, function (decodedData) {
                audioBuffer = decodedData;
                if (callback !== null) {
                    callback();
                }
            }, function (error) {
                onError(error);
            });
        };
        request.send();
    }
    sounds.loadSound = loadSound;
    function playSound() {
        playSoundFromBuffer(audioBuffer);
    }
    sounds.playSound = playSound;
    function playSoundFromBuffer(buffer, time) {
        if (time === void 0) { time = _defaultTime; }
        var source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0, time);
    }
})(sounds || (sounds = {}));
