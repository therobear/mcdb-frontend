export class MobyPlatform {
    constructor(private _releaseDate: string, private _platformId: string, private _platformName: string){}

    public get releaseDate(): string {
        return this._releaseDate;
    }

    public get platformId(): string {
        return this._platformId;
    }

    public get platformName(): string {
        return this._platformName;
    }
}