import { LandingPageTile } from '../../components/ui';

const LandingPage = () => {
    return (
        <div>
            <div className="landing-title">Welcome to MCDB!</div>
            <div className="row center-lg">
                <LandingPageTile
                    tileTitle="Games Recently Added"
                    mediaType="game"
                    mediaList={[]}
                />
                <LandingPageTile
                    tileTitle="Movies Recently Added"
                    mediaType="movie"
                    mediaList={[]}
                />
                <LandingPageTile
                    tileTitle="Music Recently Added"
                    mediaType="music"
                    mediaList={[]}
                />
                <LandingPageTile
                    tileTitle="Books Recently Added"
                    mediaType="book"
                    mediaList={[]}
                />
            </div>
        </div>
    );
};

export default LandingPage;
