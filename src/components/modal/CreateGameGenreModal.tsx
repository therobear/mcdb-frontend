import { useState } from 'react';
import { GameGenre } from '../../models';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateGameGenre } from '../../hooks';
import { Button } from '../ui';
import { CircleCheck, CircleX } from 'lucide-react';

type CreateGameGenreModalType = {
    callback: Function;
};

const CreateGameGenreModal = ({ callback }: CreateGameGenreModalType) => {
    const [genreName, setGenreName] = useState<string>('');

    const queryClient = useQueryClient();

    const { mutate: mutateCreateGameGenre } = useCreateGameGenre({
        onSuccess: () => {
            setGenreName('');

            queryClient.invalidateQueries({
                queryKey: ['gameGenreList'],
            });

            callback();
        },
    });

    const handleSubmit = async () => {
        const genre = new GameGenre(undefined, genreName!);

        mutateCreateGameGenre(genre);
    };

    const closeModal = () => {
        setGenreName('');

        callback();
    };

    return (
        <div className="modal-container">
            <div className="modal-title">Create Game Genre</div>
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
                    />
                </div>
                <div className="row end-lg modal-buttons-div">
                    <Button
                        buttonType="standard"
                        disabled={genreName === ''}
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

export default CreateGameGenreModal;
