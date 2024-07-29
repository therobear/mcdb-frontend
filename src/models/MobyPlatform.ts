export class MobyPlatform {
    constructor(private _firstReleaseDate: String, private _platformId: String, private _platformName: String){}

    public get firstReleaseDate(): String {
        return this._firstReleaseDate;
    }

    public get platformId(): String {
        return this._platformId;
    }

    public get platformName(): String {
        return this._platformName;
    }
}