import { Game } from '../../models';
import LandingPageTileImg from './LandingPageTileImg';

type TileProps = {
    tileTitle: string;
    mediaType: string;
    mediaList: any[];
};

const LandingPageTile = ({ tileTitle, mediaType, mediaList }: TileProps) => {
    const renderImgTiles = () => {
        if (mediaList.length > 0) {
            return mediaList.map((item: Game, index: number) => {
                return (
                    <LandingPageTileImg
                        key={`image-${item.title}-${index}`}
                        itemType="item"
                        itemId={item.id}
                        coverUrl={item.coverUrl}
                        title={item.title}
                        platform={
                            item.ownedPlatforms.length > 0
                                ? item.ownedPlatforms[0]
                                : ''
                        }
                    />
                );
            });
        } else {
            return (
                <div className="landing-img-container">
                    <div className="landing-img" style={{ height: '10rem' }}>
                        No items yet
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="landing-tile">
            <div className="landing-recently-added-tile">{tileTitle}</div>
            {renderImgTiles()}
        </div>
    );
};

export default LandingPageTile;
