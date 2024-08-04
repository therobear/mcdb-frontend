import { useEffect, useState } from 'react';
import { Button } from '../../components/ui';
import { FilePlus } from 'lucide-react';
import { Modal } from '../../components/ui';
import { Pencil, Trash2 } from 'lucide-react';
import { useGetPlatformList } from '../../hooks';
import {
    CreatePlaformModal,
    DeletePlatformModal,
    UpdatePlatformModal,
} from '../../components/modal';
import { Platform } from '../../models';

const Platforms = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalDisplay, setModalDistplay] = useState<string>('');
    const [platformList, setPlatformList] = useState<Platform[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>();

    const {
        data: platforms,
        error: errorPlatformList,
        isLoading: isLoadingPlatformList,
    } = useGetPlatformList({});

    useEffect(() => {
        setPlatformList(platforms);
    }, [platforms]);

    const setModalContent = () => {
        switch (modalDisplay) {
            case 'CREATE':
                return (
                    <CreatePlaformModal
                        callback={() => setShowModal(!showModal)}
                    />
                );

            case 'DELETE':
                return (
                    <DeletePlatformModal
                        id={selectedPlatform?._id}
                        callback={() => setShowModal(!showModal)}
                    />
                );

            case 'UPDATE':
                return (
                    <UpdatePlatformModal
                        platform={selectedPlatform!}
                        callback={() => setShowModal(!showModal)}
                    />
                );
        }
    };

    if (errorPlatformList) {
        return <div>Error Loading Platform List</div>;
    }

    if (isLoadingPlatformList) {
        return <div>Loading Platform List</div>;
    }

    const renderList = () => {
        if (platformList && platformList.length === 0) {
            return (
                <tr>
                    <td>No platforms entered.</td>
                    <td></td>
                </tr>
            );
        } else {
            return platformList.map((platform: Platform, index: number) => (
                <tr key={`platform-${platform.name}-${index}`}>
                    <td>{platform.name}</td>
                    <td className="row center-lg">
                        <Button
                            buttonType="standard"
                            callback={() => {
                                setModalDistplay('UPDATE');
                                setShowModal(true);
                                setSelectedPlatform(platform);
                            }}
                        >
                            <Pencil size={20} className="button-icon" /> Edit
                        </Button>
                        <Button
                            buttonType="warning"
                            callback={() => {
                                setModalDistplay('DELETE');
                                setShowModal(true);
                                setSelectedPlatform(platform);
                            }}
                        >
                            <Trash2 className="button-icon" /> Delete
                        </Button>
                    </td>
                </tr>
            ));
        }
    };

    return (
        <div>
            <div className="landing-title">Platforms</div>
            <div className="row center-lg">
                <div style={{ width: '75%' }}>
                    <div>
                        <Button
                            buttonType="standard"
                            callback={() => {
                                setModalDistplay('CREATE');
                                setShowModal(true);
                            }}
                        >
                            <FilePlus className="button-icon" /> Create New
                            Platform
                        </Button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '80%' }}>Name</th>
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

export default Platforms;
