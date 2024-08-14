import { useState } from 'react';
import { Platform } from '../../models';
import { useQueryClient } from '@tanstack/react-query';
import { useCreatePlatform } from '../../hooks';
import { Button } from '../ui';
import { CircleCheck, CircleX } from 'lucide-react';

type CreatePlatformModalType = {
    callback: Function;
};

const CreatePlatformModal = ({ callback }: CreatePlatformModalType) => {
    const [platformName, setPlatformName] = useState<string>('');
    const [platformAbbrev, setPlatformAbbrev] = useState<string>('');

    const queryClient = useQueryClient();

    const { mutate: mutateCreatePlatform } = useCreatePlatform({
        onSuccess: () => {
            setPlatformName('');
            setPlatformAbbrev('');

            queryClient.invalidateQueries({
                queryKey: ['platformList'],
            });

            callback();
        },
    });

    const handleSubmit = async () => {
        const platform = new Platform(
            undefined,
            platformName!,
            platformAbbrev!
        );

        mutateCreatePlatform(platform);
    };

    const closeModal = () => {
        setPlatformName('');

        callback();
    };

    return (
        <div className="modal-container">
            <div className="modal-title">Create Platform</div>
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
                        onChange={(e) => setPlatformName(e.target.value)}
                    />
                    <div>
                        <b>Platform Abbreviation</b>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setPlatformAbbrev(e.target.value)}
                    />
                </div>
                <div className="row end-lg modal-buttons-div">
                    <Button
                        buttonType="standard"
                        disabled={platformName === ''}
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

export default CreatePlatformModal;
