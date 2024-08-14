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
    const [platformName, setPlatformName] = useState<string>('');
    const [platformAbbrev, setPlatformAbbrev] = useState<string>('');
    const [disabledButton, setDisabledButton] = useState<boolean>(true);

    const queryClient = useQueryClient();

    useEffect(() => {
        setPlatformName(platform.name);
        setPlatformAbbrev(platform.abbreviation);
    }, [platform]);

    const { mutate: mutateUpdatePlatform } = useUpdatePlatform({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['platformList'],
            });

            callback();
        },
    });

    const handleDisableButton = () => {
        if (platformName !== '' && platformAbbrev !== '') {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    };

    const handleSubmit = () => {
        const submittedPlatform = new Platform(
            platform._id,
            platformName,
            platformAbbrev
        );

        mutateUpdatePlatform(submittedPlatform);
    };

    const closeModal = () => {
        setPlatformName('');
        setPlatformAbbrev('');

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
                        onChange={(e) => setPlatformName(e.target.value)}
                        onBlur={() => handleDisableButton()}
                        value={platformName || ''}
                    />
                    <div>
                        <b>Platform Abbreviation</b>
                    </div>
                    <input
                        type="text"
                        onChange={(e) => setPlatformAbbrev(e.target.value)}
                        onBlur={() => handleDisableButton()}
                        value={platformAbbrev || ''}
                    />
                </div>
                <div className="row end-lg modal-buttons-div">
                    <Button
                        buttonType="standard"
                        disabled={disabledButton}
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
