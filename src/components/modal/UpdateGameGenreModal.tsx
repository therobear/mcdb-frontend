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
    const [selectedGenre, setSelectedGenre] = useState<any>({
        _id: '',
        name: '',
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        setSelectedGenre({ ...genre });
    }, [genre]);

    const { mutate: mutateUpdateGameGenre } = useUpdateGameGenre({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['gameGenreList'],
            });

            callback();
        },
    });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedGenre({ _id: genre._id, name: e.target.value });
    };

    const handleSubmit = () => {
        const submittedPlatform = new GameGenre(
            selectedGenre._id,
            selectedGenre.name
        );

        mutateUpdateGameGenre(submittedPlatform);
    };

    const closeModal = () => {
        setSelectedGenre(undefined);

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
                        onChange={handleTextChange}
                        value={selectedGenre?.name}
                    />
                </div>
                <div className="row end-lg modal-buttons-div">
                    <Button
                        buttonType="standard"
                        disabled={selectedGenre?.name === ''}
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
