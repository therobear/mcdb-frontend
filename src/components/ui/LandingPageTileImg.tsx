import { Link } from 'react-router-dom';

type TileProps = {
    itemType: string;
    itemId: string;
    coverUrl: string;
    title: string;
    platform: string;
};

const LandingPageTileImg = ({
    itemType,
    itemId,
    coverUrl,
    title,
    platform,
}: TileProps) => {
    return (
        <Link to={`${itemType}/${itemId}`}>
            <div className="landing-img-container">
                <img className="landing-img" src={`${coverUrl}`} alt="" />
                <div className="landing-img-hover">
                    <div className="landing-img-hover-text">
                        {title}
                        <br></br>
                        {platform !== '' ? platform : null}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LandingPageTileImg;
