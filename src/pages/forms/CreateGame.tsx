import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button, Checkbox, Modal } from '../../components/ui';
import { Game, GameGenre, Platform, MobyGameDTO } from '../../models';
import { useGetGameGenreList, useGetPlatformList } from '../../hooks';
import { CircleCheck, CircleX, Plus, Trash2 } from 'lucide-react';
import { MobyGamesSearchModal } from '../../components/modal';
import { tableGenerator } from '../../utilities';
import { tab } from '@testing-library/user-event/dist/tab';

const CreateGame = () => {
    const [selectedMobyGame, setSelectedMobyGame] = useState<MobyGameDTO>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [gameValues, setGameValues] = useState<Game>();
    const [platformList, setPlatformList] = useState<Platform[]>();
    const [genreList, setGenreList] = useState<GameGenre[]>();
    const [coverUrl, setCoverUrl] = useState<string>();
    const [screenshotList, setScreenshotList] = useState<string[]>([]);

    const navigate = useNavigate();

    const {
        data: platforms,
        error: errorPlatforms,
        isLoading: isLoadingPlatforms,
    } = useGetPlatformList({});

    const {
        data: genres,
        error: errorGenres,
        isLoading: isLoadingGenres,
    } = useGetGameGenreList({});

    useEffect(() => {
        if (!isLoadingGenres) setGenreList(genres);

        if (!isLoadingPlatforms) setPlatformList(platforms);
    }, [isLoadingPlatforms, isLoadingGenres]);

    useEffect(() => {
        if (selectedMobyGame) {
            setCoverUrl(selectedMobyGame.coverUrl);
        }
    }, [selectedMobyGame]);

    const renderOptions = (type: string) => {
        let tableContent = [];
        let tableInfo: any[] = [];

        if (!isLoadingPlatforms && !isLoadingGenres) {
            switch (type) {
                case 'platforms':
                    tableContent = tableGenerator(platforms, 5);
                    tableInfo = tableContent.map(
                        (row: any[], index: number) => (
                            <tr key={`platform-row-${index}`}>
                                {row.map((info: Platform, index: number) => (
                                    <td
                                        key={`platform-${info.name}`}
                                        style={{ border: 'none' }}
                                    >
                                        <Checkbox
                                            label={info.name}
                                            name={`platform-${info.name}`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        )
                    );
                    break;

                case 'genres':
                    tableContent = tableGenerator(genres, 4);
                    tableInfo = tableContent.map(
                        (row: any[], index: number) => (
                            <tr key={`genre-row-${index}`}>
                                {row.map((info: GameGenre, index: number) => (
                                    <td
                                        key={`genre-${info.name}`}
                                        style={{ border: 'none' }}
                                    >
                                        <Checkbox
                                            label={info.name}
                                            name={`genre-${info.name}`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        )
                    );
                    break;

                case 'owned':
                    tableContent = tableGenerator(platforms, 5);
                    tableInfo = tableContent.map(
                        (row: any[], index: number) => (
                            <tr key={`owned-row-${index}`}>
                                {row.map((info: Platform, index: number) => (
                                    <td
                                        key={`owned-${info.name}`}
                                        style={{ border: 'none' }}
                                    >
                                        <Checkbox
                                            label={info.name}
                                            name={`owned-${info.name}`}
                                        />
                                    </td>
                                ))}
                            </tr>
                        )
                    );
                    break;
            }
            return tableInfo;
        }
    };

    const addToScreenshotList = () => {
        let list = [...screenshotList];

        list.push('');

        setScreenshotList(list);
    };

    const removeFromScreenshotList = (index: number) => {
        let list = [...screenshotList];

        list.splice(index, 1);

        setScreenshotList(list);
    };

    const onScreenshotChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        let list = [...screenshotList];

        list[index] = e.target.value;

        setScreenshotList(list);
    };

    const modalClose = (selectedGame: MobyGameDTO) => {
        setSelectedMobyGame(selectedGame);

        setScreenshotList(selectedGame.screenshots);

        setShowModal(false);
    };

    const fillInGameInfo = (prop: string) => {
        switch (prop) {
            case 'title':
                return selectedMobyGame
                    ? selectedMobyGame.title
                    : gameValues?.title;

            case 'desc':
                return selectedMobyGame
                    ? selectedMobyGame.description
                    : gameValues?.description;
        }
    };

    const renderScreenshotList = () => {
        let list = [...screenshotList];

        if (list.length > 0)
            return list.map((item: string, index: number) => (
                <div
                    key={`screenshot-${index}`}
                    className="row middle-lg"
                    style={{
                        height: '4.5rem',
                    }}
                >
                    <div className="col-lg-9">
                        <input
                            type="text"
                            value={item!}
                            onChange={(e) => onScreenshotChange(index, e)}
                        />
                    </div>
                    <div className="col-lg-3">
                        <Button
                            buttonType="warning"
                            callback={() => removeFromScreenshotList(index)}
                        >
                            <Trash2 className="button-icon" /> Delete
                        </Button>
                    </div>
                </div>
            ));
    };

    const submit = (e: any) => {
        e.preventDefault();
        console.log(e.target);
    };

    return (
        <div>
            <div className="landing-title">Create Game</div>
            <div className="row center-lg">
                <div className="landing-container">
                    <div>
                        <Button
                            buttonType="standard"
                            callback={() => setShowModal(!showModal)}
                        >
                            <Search className="button-icon" /> Search Moby Games
                        </Button>
                    </div>
                    <div className="view-page-container">
                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <b>Title</b>
                                    </div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={fillInGameInfo('title') || ''}
                                        onChange={(e) => {}}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <b>Description</b>
                                    </div>
                                    <textarea
                                        className="create-text-area"
                                        name="description"
                                        value={fillInGameInfo('desc') || ''}
                                        onChange={(e) => {}}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <img
                                        src={coverUrl}
                                        className="landing-img"
                                    />
                                </div>
                                <div className="col-lg-9">
                                    <div>
                                        <b> Cover URL</b>
                                    </div>
                                    <input
                                        type="text"
                                        value={coverUrl || ''}
                                        onChange={(e) => {}}
                                        onBlur={(e) =>
                                            setCoverUrl(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <b>Platforms</b>
                                    </div>
                                    <div>
                                        <table>
                                            <tbody>
                                                {renderOptions('platforms')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <b>Owned Platforms</b>
                                    </div>
                                    <div>
                                        <table>
                                            <tbody>
                                                {renderOptions('owned')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <b>Genres</b>
                                    </div>
                                    <div>
                                        <table>
                                            <tbody>
                                                {renderOptions('genres')}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <b>Screenshots</b>
                                    </div>
                                    <div className="row">
                                        {renderScreenshotList()}
                                    </div>
                                    <div className="row end-lg">
                                        <Button
                                            buttonType="standard"
                                            callback={() =>
                                                addToScreenshotList()
                                            }
                                        >
                                            <Plus className="button-icon" /> Add
                                            Screenshot
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="row end-lg">
                                <Button
                                    buttonType="warning"
                                    callback={() => navigate('/games')}
                                >
                                    <CircleX className="button-icon" />{' '}
                                    Nevermind
                                </Button>
                                <Button
                                    buttonType="standard"
                                    actionType="submit"
                                    callback={() => {}}
                                >
                                    <CircleCheck className="button-icon" />{' '}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal
                    allowCloseOnClick={false}
                    onClose={() => setShowModal(!showModal)}
                >
                    <MobyGamesSearchModal callback={modalClose} />
                </Modal>
            )}
        </div>
    );
};

export default CreateGame;
