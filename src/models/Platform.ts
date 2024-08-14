export class Platform {
    constructor(public _id: string | undefined, private _name: string, private _abbreviation: string) {
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get abbreviation(): string {
        return this._abbreviation;
    }

    public set abbreviation(value: string) {
        this._abbreviation = value;
    }
}