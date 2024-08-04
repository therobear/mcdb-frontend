export class Platform {
    constructor(public _id: string | undefined, private _name: string) {
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }
}