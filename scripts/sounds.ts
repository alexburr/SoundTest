module sounds {
    // ================================================================
    // Thanks to https://www.html5rocks.com/en/tutorials/webaudio/intro/
    // ================================================================

    // from app.ts
    declare function onError(e: any): void;

    const _defaultTime: number = 0;
    
    var audioContext: AudioContext = null;
    var audioBuffer: AudioBuffer = null;

    // ================================================================
    // Public methods
    // ================================================================
    export function audioInit(): void {
        // Fix up prefixing
        window["AudioContext"] = window["AudioContext"] || window["webkitAudioContext"];
        audioContext = new AudioContext();
    }

    // ----------------------------------------------------------------
    export function loadSound(soundName: string, callback: Function = null): void {

        var url: string = samples.buildSamplePath(soundName);

        var request: XMLHttpRequest = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        // Decode asynchronously
        request.onload = (event: Event) => {
            audioContext.decodeAudioData(request.response,
                function (decodedData: AudioBuffer) { // success
                    audioBuffer = decodedData;
                    if (callback !== null) {
                        callback();
                    }
                },
                function (error: DOMException) { // error
                    onError(error);
                });
        }
        request.send();
    }

    ////Severity	Code	Description	Project	File	Line	Suppression State
    //Error	TS2345(TS) Argument of type '(errorCallback?: DecodeErrorCallback) => void' is not assignable to parameter of type 'DecodeErrorCallback'.
    //Types of parameters 'errorCallback' and 'error' are incompatible.
    //    Type 'DOMException' is not assignable to type 'DecodeErrorCallback'.
    //        Type 'DOMException' provides no match for the signature '(error: DOMException): void'.SoundTest	C: \Users\aburr\Documents\Visual Studio 2015\Projects\soundTest\SoundTest\scripts\sounds.ts	40	Active


    // ----------------------------------------------------------------
    export function playSound(): void {
        playSoundFromBuffer(audioBuffer);
    }

    // ================================================================
    // Protected methods
    // ================================================================
    function playSoundFromBuffer(buffer: AudioBuffer, time: number = _defaultTime) {

        // creates a sound source
        var source: AudioBufferSourceNode = audioContext.createBufferSource(); 

        // tell the source which sound to play
        source.buffer = buffer; 

        // connect the source to the context's destination (the speakers)
        source.connect(audioContext.destination); 

        // play the source now
        // note: on older systems, may have to use deprecated noteOn(time);
        source.start(0, time); 
    }
}