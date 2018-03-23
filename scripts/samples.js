var samples;
(function (samples) {
    var _path = "sounds/";
    var _extension = ".wav";
    var Sample = (function () {
        function Sample() {
        }
        return Sample;
    }());
    samples.Sample = Sample;
    samples.samplesList = [
        { name: "Kick", value: "kick" },
        { name: "Snare", value: "snare" },
        { name: "SQ50 High", value: "sq50_high" },
        { name: "SQ50 Low", value: "sq50_low" },
        { name: "Sticks", value: "sticks" },
        { name: "Tick", value: "tick" }
    ];
    function buildSamplePath(sampleValue) {
        var sample = getSample(sampleValue);
        return _path + sample.value + _extension;
    }
    samples.buildSamplePath = buildSamplePath;
    function getSample(sampleValue) {
        return samples.samplesList.filter(function (sample) { return sample.value == sampleValue; })[0];
    }
    samples.getSample = getSample;
})(samples || (samples = {}));
