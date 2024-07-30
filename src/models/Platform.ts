export class Platform {
    constructor(private _releaseDate: string, private _platformName: string) {
    }

    public get releaseDate(): string {
        return this._releaseDate;
    }

    public set releaseDate(value: string) {
        this._releaseDate = value;
    }

    public get platformName(): string {
        return this._platformName;
    }

    public set platformName(value: string) {
        this._platformName = value;
    }
}