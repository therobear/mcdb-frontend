import { useDeletePlatform } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui';
import { CircleCheck, CircleX } from 'lucide-react';

type DeletePlatformModalType = {
    id?: string;
    callback: Function;
};

const DeletePlatformModal = ({ id, callback }: DeletePlatformModalType) => {
    const queryClient = useQueryClient();

    const { mutate: mutateDeletePlatform } = useDeletePlatform({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['platformList'],
            });

            callback();
        },
    });

    return (
        <div className="modal-container">
            <div className="modal-title">Delete Platform</div>
            <div className="modal-content">
                Are you sure you want to delete this platform?
            </div>
            <div className="row end-lg modal-buttons-div">
                <Button
                    buttonType="standard"
                    callback={() => mutateDeletePlatform(id!)}
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

export default DeletePlatformModal;
