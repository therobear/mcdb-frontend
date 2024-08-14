import { useState } from 'react';
import { useGetGameInfo } from '../../hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { MobyPlatform, GameGenre } from '../../models';
import { dateFormatter } from '../../utilities';
import { Button, Modal, Badge } from '../../components/ui';
import { ArrowBigLeft, Pencil } from 'lucide-react';

const ViewGame = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const params = useParams();
    const navigate = useNavigate();

    const {
        data: gameInfo,
        error: gameError,
        isLoading: isLoadingGameInfo,
    } = useGetGameInfo(params.id!, {});

    const modalState = (state: string, image: string = '') => {
        setSelectedImage(image);

        switch (state) {
            case 'show':
                setShowModal(true);
                break;

            case 'hide':
                setShowModal(false);
                break;
        }
    };

    if (gameError) {
        return <div>Error Loading Game</div>;
    }

    if (isLoadingGameInfo) {
        return <div>Loading Game info</div>;
    }

    return (
        <div className="row center-lg ">
            <div className="row view-page-container">
                <div className="row">
                    <div className="col-lg-3">
                        <img
                            className="view-page-cover-img view-page-img-hover"
                            src={`${gameInfo.coverUrl}`}
                            onClick={() =>
                                modalState('show', gameInfo.coverUrl)
                            }
                        />
                    </div>
                    <div className="col-lg-9">
                        <div className="view-page-title">{gameInfo.title}</div>
                        <div>
                            Released On
                            <ul className="view-page-li">
                                {gameInfo.platforms.map(
                                    (platform: MobyPlatform, index: number) => (
                                        <li key={`platform-${index}`}>
                                            {platform.platformName} -{' '}
                                            {dateFormatter(
                                                platform.releaseDate
                                            )}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="view-page-sub-section-title">
                                Owned Platforms
                            </div>
                            <div
                                className="row"
                                style={{ marginBottom: '2rem' }}
                            >
                                {gameInfo.ownedPlatforms.map(
                                    (platform: string, index: number) => (
                                        <Badge
                                            key={`platform-${index}`}
                                            label={platform}
                                        />
                                    )
                                )}
                            </div>
                            <div className="view-page-sub-section-title">
                                Genres
                            </div>
                            <div
                                className="row"
                                style={{ marginBottom: '2rem' }}
                            >
                                {gameInfo.genres.map(
                                    (genre: GameGenre, index: number) => (
                                        <Badge
                                            key={`genre-${index}`}
                                            label={genre.name}
                                        />
                                    )
                                )}
                            </div>
                            <div className="view-page-sub-section-title">
                                Description
                            </div>
                            <div className="row">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: gameInfo.description,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row center-lg view-page-screenshot-row">
                        {gameInfo.screenshots.map(
                            (screenshot: string, index: number) => (
                                <img
                                    key={`screenshot-${index}`}
                                    className="view-page-screenshot-img view-page-img-hover"
                                    src={`${screenshot}`}
                                    onClick={() =>
                                        modalState('show', screenshot)
                                    }
                                />
                            )
                        )}
                    </div>
                    <div className="row view-page-buttons end-lg">
                        <Button
                            callback={() => navigate('/games')}
                            buttonType="standard"
                        >
                            <ArrowBigLeft className="button-icon" /> Go Back
                        </Button>
                        <Button callback={() => {}} buttonType="warning">
                            <Pencil size={20} className="button-icon" /> Edit
                            Game
                        </Button>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => modalState('hide')}>
                    <img src={`${selectedImage}`} />
                </Modal>
            )}
        </div>
    );
};

export default ViewGame;
