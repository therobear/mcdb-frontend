import { MobyPlatform } from "./MobyPlatform";
import { GameGenre } from "./GameGenre";

export class Game {
    constructor(public _id: string | undefined, private _title: string, private _description: string, private _coverUrl: string, private _platforms: MobyPlatform[], private _screenshots: string[], private _ownedPlatforms: string[], private _genres: GameGenre[], private _createdDate: Date, private _modifiedDate: Date) {
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

    public set platforms(value: MobyPlatform[]) {
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

    public get genres() {
        return this._genres;
    }

    public set genres(value: GameGenre[]) {
        this._genres = value;
    }

    public get createdDate() {
        return this._createdDate;
    }

    public get modifiedDate() {
        return this._modifiedDate;
    }
}