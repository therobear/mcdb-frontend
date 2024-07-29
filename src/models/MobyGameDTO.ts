import { MobyPlatform } from "./MobyPlatform";

export class MobyGameDTO {
    constructor(private _title: string, private _description: string, private _coverUrl: string, private _platforms: MobyPlatform[], private _screenshots: string[]){
    }

    public get title(): string {
        return this._title;
    }

    public get description(): string {
        return this._description;
    }

    public get coverUrl(): string {
        return this._coverUrl;
    }

    public get platforms(): MobyPlatform[] {
        return this._platforms;
    }

    public get screenshots(): string[] {
        return this._screenshots;
    }
}