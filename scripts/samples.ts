module samples {

    const _path: string = "sounds/";
    const _extension: string = ".wav";

    export class Sample {
        name: string;
        value: string;
    }

    // ================================================================
    // Public properties
    // ================================================================
    export var samplesList: Sample[] = [
        { name: "Kick", value: "kick" },
        { name: "Snare", value: "snare" },
        { name: "SQ50 High", value: "sq50_high" },
        { name: "SQ50 Low", value: "sq50_low" },
        { name: "Sticks", value: "sticks" },
        { name: "Tick", value: "tick" }
    ];

    // ================================================================
    // Methods
    // ================================================================
    export function buildSamplePath(sampleValue: string): string {
        var sample: Sample = getSample(sampleValue);
        return _path + sample.value + _extension;
    }

    // ----------------------------------------------------------------
    export function getSample(sampleValue: string): Sample {
        return samplesList.filter(sample => sample.value == sampleValue)[0];
    }
}