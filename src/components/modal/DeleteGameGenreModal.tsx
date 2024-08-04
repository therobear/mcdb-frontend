import { useDeleteGameGenre } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui';
import { CircleCheck, CircleX } from 'lucide-react';

type DeleteGameGenreModalType = {
    id?: string;
    callback: Function;
};

const DeleteGameGenreModal = ({ id, callback }: DeleteGameGenreModalType) => {
    const queryClient = useQueryClient();

    const { mutate: mutateDeleteGameGenre } = useDeleteGameGenre({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['gameGenreList'],
            });

            callback();
        },
    });

    return (
        <div className="modal-container">
            <div className="modal-title">Delete Game Genre</div>
            <div className="modal-content">
                Are you sure you want to delete this platform?
            </div>
            <div className="row end-lg modal-buttons-div">
                <Button
                    buttonType="standard"
                    callback={() => mutateDeleteGameGenre(id!)}
                >
                    <CircleCheck className="button-icon" /> Ok
                </Button>
                <Button buttonType="warning" callback={() => callback()}>
                    <CircleX className="button-icon" /> Cancel
                </Button>
            </div>
        </div>
    );
};

export default DeleteGameGenreModal;
