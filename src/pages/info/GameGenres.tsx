import { useEffect, useState } from 'react';
import { Button } from '../../components/ui';
import { FilePlus, Pencil, Trash2 } from 'lucide-react';
import { Modal } from '../../components/ui';
import { GameGenre } from '../../models';
import { useGetGameGenreList } from '../../hooks';
import {
    CreateGameGenreModal,
    DeleteGameGenreModal,
    UpdateGameGenreModal,
} from '../../components/modal';

const GameGenres = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalDisplay, setModalDistplay] = useState<string>('');
    const [gameGenreList, setGameGenreList] = useState<GameGenre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GameGenre>();

    const {
        data: gameGenres,
        error: errorGameGenres,
        isLoading: isLoadingGameGenres,
    } = useGetGameGenreList({});

    useEffect(() => {
        setGameGenreList(gameGenres);
    }, [gameGenres]);

    const setModalContent = () => {
        switch (modalDisplay) {
            case 'CREATEGAME':
                return (
                    <CreateGameGenreModal
                        callback={() => setShowModal(!showModal)}
                    />
                );

            case 'DELETEGAME':
                return (
                    <DeleteGameGenreModal
                        id={selectedGenre?._id}
                        callback={() => setShowModal(!showModal)}
                    />
                );

            case 'UPDATEGAME':
                return (
                    <UpdateGameGenreModal
                        genre={selectedGenre!}
                        callback={() => setShowModal(!showModal)}
                    />
                );
        }
    };

    if (errorGameGenres) {
        return <div>Error Loading Game Genre List</div>;
    }

    if (isLoadingGameGenres || !gameGenreList) {
        return <div>Loading Game Genre List</div>;
    }

    const renderList = () => {
        if (gameGenreList && gameGenreList.length === 0) {
            return (
                <tr>
                    <td>No game genres entered.</td>
                    <td></td>
                </tr>
            );
        } else
            return gameGenreList.map((genre: GameGenre, index: number) => (
                <tr key={`genre-${genre.name}-${index}`}>
                    <td>{genre.name}</td>
                    <td>{genre.abbreviation}</td>
                    <td className="row center-lg">
                        <Button
                            buttonType="standard"
                            callback={() => {
                                setModalDistplay('UPDATEGAME');
                                setShowModal(true);
                                setSelectedGenre(genre);
                            }}
                        >
                            <Pencil size={20} className="button-icon" /> Edit
                        </Button>
                        <Button
                            buttonType="warning"
                            callback={() => {
                                setModalDistplay('DELETEGAME');
                                setShowModal(true);
                                setSelectedGenre(genre);
                            }}
                        >
                            <Trash2 className="button-icon" /> Delete
                        </Button>
                    </td>
                </tr>
            ));
    };

    return (
        <div>
            <div className="landing-title">Game Genres</div>
            <div className="row center-lg">
                <div className="landing-container">
                    <div>
                        <Button
                            buttonType="standard"
                            callback={() => {
                                setModalDistplay('CREATEGAME');
                                setShowModal(true);
                            }}
                        >
                            <FilePlus className="button-icon" /> Create New Game
                            Genre
                        </Button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '40%' }}>Name</th>
                                    <th style={{ width: '40%' }}>
                                        Abbreviation
                                    </th>
                                    <th
                                        style={{
                                            width: '20%',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{renderList()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal
                    allowCloseOnClick={false}
                    onClose={() => {
                        setModalDistplay('');
                        setShowModal(false);
                    }}
                >
                    {setModalContent()}
                </Modal>
            )}
        </div>
    );
};

export default GameGenres;
