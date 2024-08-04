import axios from 'axios';
import { Game, Platform } from '../models';
import { toast } from 'react-hot-toast';
import { MCDBSERVICEURL, GAMESSERVICE, PLATFORMSERVICE } from './apiConfig';

const mcdbServices = {
    gamesList: async () => {
        return await axios.get(`${MCDBSERVICEURL}/${GAMESSERVICE}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving games list.\n${error.response.data}`);
        });
    },
    gameInfo: async (gameId: string) => {
        return await axios.get(`${MCDBSERVICEURL}/${GAMESSERVICE}/${gameId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving game information.\n${error.response.data}`);
        });
    },
    createGame: async (game: Game) => {
        return await axios.post(`${MCDBSERVICEURL}/${GAMESSERVICE}`, game).then((response) => {
            toast.success(`Platform ${game.title} was added successfuly.`);
            return response.data;
        }).catch((error) => {
            toast.error(`Error creating game.\n${error.response.data}`);
        });
    },
    updateGame: async (game: Game) => {
        return await axios.put(`${MCDBSERVICEURL}/${GAMESSERVICE}/${game.id.toString()}`, game).then((response) => {
            toast.success(`Platform ${game.title} was updated successfuly.`);
            return response.data;
        }).catch((error) => {
            toast.error(`Error updating game.\n${error.response.data}`);
        });
    },
    deleteGame: async (gameId: string) => {
        return await axios.delete(`${MCDBSERVICEURL}/${GAMESSERVICE}/${gameId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error deleting game.\n${error.response.data}`);
        });
    },
    platformList: async () => {
        return await axios.get(`${MCDBSERVICEURL}/${PLATFORMSERVICE}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving platforms list.\n${error.response.data}`);
        });
    },
    platformInfo: async (platformId: string) => {
        return await axios.get(`${MCDBSERVICEURL}/${PLATFORMSERVICE}/${platformId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving game information.\n${error.response.data}`);
        });
    },
    createPlatform: async (platform: Platform) => {
        const pData = {name: platform.name};

        return await axios.post(`${MCDBSERVICEURL}/${PLATFORMSERVICE}`, pData).then((response) => {
            toast.success(`Platform ${platform.name} was added successfuly.`);
            return response.data;
        }).catch((error) => {
            toast.error(`Error creating platform.\n${error.response.data}`);
        });
    },
    updatePlatform: async (platform: Platform) => {
        const pData = {name: platform.name}
        
        return await axios.put(`${MCDBSERVICEURL}/${PLATFORMSERVICE}/${platform._id!.toString()}`, pData).then((response) => {
            toast.success(`Platform was updated successfuly.`);
            return response.data;
        }).catch((error) => {
            toast.error(`Error updating platform.\n${error.response.data}`);
        });
    },
    deletePlatform: async (platformId: string) => {
        return await axios.delete(`${MCDBSERVICEURL}/${PLATFORMSERVICE}/${platformId}`).then((response) => {
            toast.success(`Platform was successfuly deleted.`);
            return response.data;
        }).catch((error) => {
            toast.error(`Error deleting platform.\n${error.response.data}`);
        });
    }
}

export default mcdbServices;