import { useEffect, useState } from 'react';
import { Button, Checkbox, LandingPageTileImg } from '../../components/ui';
import { FilePlus, Pencil, Trash2 } from 'lucide-react';
import {
    useGetGamesList,
    useGetPlatformList,
    useGetGameGenreList,
} from '../../hooks';
import { Game, Platform, GameGenre } from '../../models';
import { useNavigate } from 'react-router-dom';

const Games = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [gamesList, setGamesList] = useState<Game[]>([]);
    const [platformList, setPlatformList] = useState<Platform[]>([]);
    const [platformFilterOptions, setPlaformFilterOptions] = useState<any>();
    const [genreList, setGenreList] = useState<GameGenre[]>([]);
    const [genreFilterOptions, setGenreFilterOptions] = useState<any>();

    const navigate = useNavigate();

    const {
        data: games,
        error: errorGamesList,
        isLoading: isLoadingGamesList,
    } = useGetGamesList({});

    const {
        data: platforms,
        error: errorPlatformList,
        isLoading: isLoadingPlatformList,
    } = useGetPlatformList({});

    const {
        data: genres,
        error: errorGenreList,
        isLoading: isLoadingGenreList,
    } = useGetGameGenreList({});

    useEffect(() => {
        setGamesList(games);
        setPlatformList(platforms);
        setGenreList(genres);

        let pChecked: any = {};

        if (!isLoadingPlatformList) {
            platforms.map((platform: Platform, index: number) => {
                pChecked[platform.name] = false;
            });

            setPlaformFilterOptions(pChecked);
        }

        let gChecked: any = {};

        if (!isLoadingGenreList) {
            genres.map((genre: GameGenre, index: number) => {
                gChecked[genre.name] = false;
            });

            setGenreFilterOptions(gChecked);
        }
    }, [isLoadingGamesList, isLoadingPlatformList, isLoadingGenreList]);

    const onCheckboxChange = (type: string, keyName: string) => {
        let filterList: any = {};

        switch (type) {
            case 'platform':
                filterList = { ...platformFilterOptions };
                filterList[keyName] = !platformFilterOptions[keyName];
                setPlaformFilterOptions(filterList);
                break;

            case 'genres':
                filterList = { ...genreFilterOptions };
                filterList[keyName] = !genreFilterOptions[keyName];
                setGenreFilterOptions(filterList);
                break;
        }
    };

    const renderPlatformList = () => {
        if (!isLoadingPlatformList && platformList.length > 0) {
            return platformList.map((platform: Platform, index: number) => (
                <Checkbox
                    key={`checkbox-${platform.name}-${index}`}
                    label={platform.name}
                    checked={platformFilterOptions[platform.name]}
                    onChange={() => onCheckboxChange('platform', platform.name)}
                />
            ));
        } else {
            return <div>No platforms entered.</div>;
        }
    };

    const renderGenreList = () => {
        if (!isLoadingGenreList && genreList.length > 0) {
            return genreList.map((genre: GameGenre, index: number) => (
                <Checkbox
                    key={`checkbox-${genre.name}-${index}`}
                    label={genre.name}
                    checked={genreFilterOptions[genre.name]}
                    onChange={() => onCheckboxChange('genres', genre.name)}
                />
            ));
        } else {
            return <div style={{ margin: '0.5rem 0' }}>No genres entered.</div>;
        }
    };

    const renderGamesList = () => {
        if (!isLoadingGamesList && gamesList.length > 0) {
            return gamesList.map((game: Game, index: number) => (
                <LandingPageTileImg
                    key={`game-${game.title}-${index}`}
                    itemType="games"
                    itemId={game._id!}
                    coverUrl={game.coverUrl}
                    title={game.title}
                    platform={
                        game.ownedPlatforms.length > 0
                            ? game.ownedPlatforms[0]
                            : ''
                    }
                />
            ));
        } else {
            return <div>No games entered.</div>;
        }
    };

    if (errorGamesList) {
        return <div>Error Loading Games</div>;
    }

    if (isLoadingGamesList || !gamesList) {
        return <div>Loading Games</div>;
    }

    return (
        <div>
            <div className="landing-title">Games</div>
            <Button
                buttonType="standard"
                callback={() => navigate('/createGame')}
            >
                <FilePlus className="button-icon" /> Create New Game
            </Button>
            <div className="row">
                <div className="col-lg-2">
                    <div className="landing-list-filter-title">
                        Filter Options
                    </div>
                    <div className="landing-container-scroll">
                        <div className="landing-list-filter-section">
                            Platforms
                        </div>
                        <div>{renderPlatformList()}</div>
                        <div className="landing-list-filter-section">
                            Genres
                        </div>
                        <div>{renderGenreList()}</div>
                        <div className="landing-list-filter-section">
                            Release Year
                        </div>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className="landing-container-scroll">
                        <div className="landing-list-container">
                            {renderGamesList()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Games;
