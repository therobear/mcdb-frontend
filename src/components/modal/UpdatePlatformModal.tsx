import { useEffect, useState, ChangeEvent } from 'react';
import { Platform } from '../../models';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdatePlatform } from '../../hooks';
import { Button } from '../ui';
import { CircleCheck, CircleX } from 'lucide-react';

type UpdatePlatformModalType = {
    platform: Platform;
    callback: Function;
};

const UpdatePlatformModal = ({
    platform,
    callback,
}: UpdatePlatformModalType) => {
    const [selectedPlatform, setSelectedPlatform] = useState<any>({
        _id: '',
        name: '',
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        setSelectedPlatform({ ...platform });
    }, [platform]);

    const { mutate: mutateUpdatePlatform } = useUpdatePlatform({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['platformList'],
            });

            callback();
        },
    });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedPlatform({ _id: platform._id, name: e.target.value });
    };

    const handleSubmit = () => {
        const submittedPlatform = new Platform(
            selectedPlatform._id,
            selectedPlatform.name
        );

        mutateUpdatePlatform(submittedPlatform);
    };

    const closeModal = () => {
        setSelectedPlatform(undefined);

        callback();
    };

    return (
        <div className="modal-container">
            <div className="modal-title">Upate Platform</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="modal-content">
                    <div>
                        <b>Platform Name</b>
                    </div>
                    <input
                        type="text"
                        onChange={handleTextChange}
                        value={selectedPlatform?.name}
                    />
                </div>
                <div className="row end-lg modal-buttons-div">
                    <Button
                        buttonType="standard"
                        disabled={selectedPlatform?.name === ''}
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

export default UpdatePlatformModal;
