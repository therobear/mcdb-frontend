import { useEffect, useState, ChangeEvent } from 'react';
import { GameGenre } from '../../models';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateGameGenre } from '../../hooks';
import { Button } from '../ui';
import { CircleCheck, CircleX } from 'lucide-react';

type UpdateGameGenreModalType = {
    genre: GameGenre;
    callback: Function;
};

const UpdateGameGenreModal = ({
    genre,
    callback,
}: UpdateGameGenreModalType) => {
    const [genreName, setGenreName] = useState<string>('');
    const [genreAbbrev, setGenreAbbrev] = useState<string>('');
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    const queryClient = useQueryClient();

    useEffect(() => {
        setGenreName(genre.name);
        setGenreAbbrev(genre.abbreviation);
    }, [genre]);

    useEffect(() => {
        handleDisableButton();
    }, [genreName, genreAbbrev]);

    const { mutate: mutateUpdateGameGenre } = useUpdateGameGenre({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['gameGenreList'],
            });

            callback();
        },
    });

    const handleDisableButton = () => {
        if (genreName !== '' && genreAbbrev !== '') {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    };

    const handleSubmit = () => {
        const submittedPlatform = new GameGenre(
            genre._id,
            genreName,
            genreAbbrev
        );

        mutateUpdateGameGenre(submittedPlatform);
    };

    const closeModal = () => {
        setGenreName('');
        setGenreAbbrev('');

        callback();
    };

    return (
        <div className="modal-container">
            <div className="modal-title">Upate Game Genre</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="modal-content">
                    <div>
                        <b>Genre Name</b>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setGenreName(e.target.value)}
                        value={genreName || ''}
                    />
                    <div>
                        <b>Genre Abbreviation</b>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setGenreAbbrev(e.target.value)}
                        value={genreAbbrev || ''}
                    />
                </div>
                <div className="row end-lg modal-buttons-div">
                    <Button
                        buttonType="standard"
                        disabled={false}
                        callback={() => {}}
                        actionType="submit"
                    >
                        <CircleCheck className="button-icon" /> Submit
                    </Button>
                    <Button buttonType="warning" callback={() => closeModal()}>
                        <CircleX className="button-icon" /> Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdateGameGenreModal;
