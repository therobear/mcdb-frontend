import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, Modal } from '../../components/ui';
import {
    Game,
    GameGenre,
    Platform,
    MobyGameDTO,
    MobyPlatform,
} from '../../models';
import {
    useGetGameGenreList,
    useGetPlatformList,
    useCreateGame,
} from '../../hooks';
import { CircleCheck, CircleX, Plus, Trash2 } from 'lucide-react';
import { MobyGamesSearchModal } from '../../components/modal';
import { tableGenerator } from '../../utilities';

const CreateGame = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [platformList, setPlatformList] = useState<Platform[]>();
    const [gamePlatforms, setGamePlatforms] = useState<MobyPlatform[]>();
    const [genreList, setGenreList] = useState<GameGenre[]>();
    const [formValues, setFormValues] = useState<any>({});

    const queryClient = useQueryClient();
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

    const { mutate: mutateCreateGame } = useCreateGame({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gamesList'] });
            navigate('/games');
        },
    });

    useEffect(() => {
        if (!isLoadingGenres) {
            setGenreList(genres);
        }

        if (!isLoadingPlatforms) {
            setPlatformList(platforms);
        }
    }, [isLoadingPlatforms, isLoadingGenres]);

    const renderOptions = (type: string) => {
        let tableContent = [];
        let tableInfo: any[] = [];

        if (platformList && genreList) {
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
                                            checked={
                                                formValues[
                                                    `platform_${info.abbreviation}`
                                                ] || false
                                            }
                                            name={`platform_${info.abbreviation}`}
                                            onChange={handleCheckboxChange}
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
                                            checked={
                                                formValues[
                                                    `genre_${info.abbreviation}`
                                                ] || false
                                            }
                                            name={`genre_${info.abbreviation}`}
                                            onChange={handleCheckboxChange}
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
                                            checked={
                                                formValues[
                                                    `owned_${info.abbreviation}`
                                                ] || false
                                            }
                                            name={`owned_${info.abbreviation}`}
                                            onChange={handleCheckboxChange}
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
        let list: string[] = [];
        let indexList: number[] = [];
        let index: number;

        for (let key in formValues) {
            if (key.includes('screenshot_')) {
                list.push(formValues[key]);
                indexList.push(parseInt(key.toString().slice(11)));
            }
        }

        indexList.includes(list.length)
            ? (index = Math.max(...indexList) + 1)
            : (index = list.length);

        setFormValues((values: object) => ({
            ...values,
            [`screenshot_${index}`]: '',
        }));
    };

    const removeFromScreenshotList = (index: number) => {
        let values = { ...formValues };

        delete values[`screenshot_${index}`];

        setFormValues(values);
    };

    const fillFormValues = (selectedGame: MobyGameDTO) => {
        let values: any = {};
        let gPlatforms: MobyPlatform[] = [];

        if (selectedGame) {
            values.title = selectedGame.title;
            values.description = selectedGame.description;
            values.coverUrl = selectedGame.coverUrl;

            selectedGame.screenshots.map(
                (screenshot: string, index: number) => {
                    values[`screenshot_${index}`] = screenshot;
                }
            );

            selectedGame.platforms.map((platform: any, index: number) => {
                let foundPlatform = platformList?.find(
                    (item: Platform, index: number) => {
                        if (item.name === platform.platform_name) {
                            let p = new MobyPlatform(
                                platform.first_release_date,
                                platform.platform_id,
                                platform.platform_name
                            );

                            gPlatforms.push(p);

                            return item;
                        }
                    }
                );

                if (foundPlatform)
                    values[`platform_${foundPlatform?.abbreviation}`] = 'on';
            });

            setGamePlatforms(gPlatforms);

            selectedGame.genres.map((genre: any, index: number) => {
                let foundGenre = genreList?.find(
                    (item: GameGenre, index: number) => {
                        if (item.name === genre.genre_name) return item;
                    }
                );

                if (foundGenre)
                    values[`genre_${foundGenre.abbreviation}`] = 'on';
            });
        }

        setFormValues(values);
    };

    const modalClose = (selectedGame: MobyGameDTO) => {
        fillFormValues(selectedGame);

        setShowModal(false);
    };

    const renderScreenshotList = () => {
        let list: any[] = [];

        for (let key in formValues) {
            if (key.includes('screenshot_')) {
                list.push({ name: key.toString(), value: formValues[key] });
            }
        }

        if (list.length > 0)
            return list.map((item: any, index: number) => (
                <div
                    key={`screenshot-${index}`}
                    className="row middle-lg"
                    style={{
                        height: '4.5rem',
                    }}
                >
                    <div className="2">
                        <img
                            src={formValues[`screenshot_${index}`]}
                            style={{ maxWidth: '5rem' }}
                        />
                    </div>
                    <div className="col-lg-8">
                        <input
                            type="text"
                            name={item.name}
                            value={item.value! || ''}
                            onChange={handleInputchange}
                        />
                    </div>
                    <div className="col-lg-2">
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

        let screenshots: string[] = [];
        let ownedPlatforms: string[] = [];
        let genres: GameGenre[] = [];

        for (let key in formValues) {
            if (key.includes('screenshot_')) {
                screenshots.push(formValues[key]);
            }

            if (key.includes('owned_')) {
                let abbrev = key.slice(6);

                platformList?.find((platform: Platform, index: number) => {
                    if (platform.abbreviation === abbrev)
                        ownedPlatforms.push(platform.name);
                });
            }

            if (key.includes('genre_')) {
                let abbrev = key.slice(6);

                genreList?.find((genre: GameGenre, index: number) => {
                    if (genre.abbreviation === abbrev) genres.push(genre);
                });
            }
        }

        let submittedGame = new Game(
            undefined,
            formValues.title,
            formValues.description,
            formValues.coverUrl,
            gamePlatforms!,
            screenshots,
            ownedPlatforms,
            genres,
            undefined,
            undefined
        );

        console.log(submittedGame);

        mutateCreateGame(submittedGame);
    };

    const handleInputchange = (e: any) => {
        const name: string = e.target.name;
        const value: any = e.target.value;

        setFormValues((values: object) => ({ ...values, [name]: value }));
    };

    const handleCheckboxChange = (e: any) => {
        let values = { ...formValues };

        values.hasOwnProperty(e.target.name)
            ? delete values[e.target.name]
            : (values = { ...values, [e.target.name]: e.target.value });

        setFormValues(values);
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
                                        value={formValues?.title || ''}
                                        onChange={handleInputchange}
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
                                        value={formValues?.description || ''}
                                        onChange={(e) => {}}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <img
                                        src={formValues?.coverUrl}
                                        className="landing-img"
                                    />
                                </div>
                                <div className="col-lg-9">
                                    <div>
                                        <b> Cover URL</b>
                                    </div>
                                    <input
                                        type="text"
                                        name="coverUrl"
                                        value={formValues?.coverUrl || ''}
                                        onChange={(e) => {}}
                                        onBlur={handleInputchange}
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
