import { Platform } from "./Platform";

export class Game {
    constructor(private _id: string, private _title: string, private _description: string, private _coverUrl: string, private _platforms: Platform[], private _screenshots: string[], private _ownedPlatforms: string[]) {
    }

    public get id() {
        return this._id;
    }

    public get title() {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get description() {
        return this._description;
    }

    public set description(value: string) {
        this._description = value;
    }

    public get coverUrl() {
        return this._coverUrl;
    }

    public set coverUrl(value: string) {
        this._coverUrl = value;
    }

    public get platforms() {
        return this._platforms;
    }

    public set platforms(value: Platform[]) {
        this._platforms = value;
    }

    public get screenshots() {
        return this._screenshots;
    }

    public set screenshots(value: string[]) {
        this._screenshots = value;
    }

    public get ownedPlatforms() {
        return this._ownedPlatforms;
    }

    public set ownedPlatforms(value: string[]) {
        this._ownedPlatforms = value;
    }
}