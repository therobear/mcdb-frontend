import axios from 'axios';
import { Game, Platform } from '../models';
import { toast } from 'react-hot-toast';
import { MCDBSERVICEURL, GAMESSERVICE, PLATFORMSERVICE } from './apiConfig';

const mcdbServices = {
    gamesList: async () => {
        return await axios.get(`${MCDBSERVICEURL}/${GAMESSERVICE}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving games list.\n${error}`);
        });
    },
    gameInfo: async (gameId: string) => {
        return await axios.get(`${MCDBSERVICEURL}/${GAMESSERVICE}/${gameId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving game information.\n${error}`);
        });
    },
    createGame: async (game: Game) => {
        return await axios.post(`${MCDBSERVICEURL}/${GAMESSERVICE}`, game).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error creating game.\n${error}`);
        });
    },
    updateGame: async (game: Game) => {
        return await axios.put(`${MCDBSERVICEURL}/${GAMESSERVICE}/${game.id.toString()}`, game).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error updating game.\n${error}`);
        });
    },
    deleteGame: async (gameId: string) => {
        return await axios.delete(`${MCDBSERVICEURL}/${GAMESSERVICE}/${gameId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error deleting game.\n${error}`);
        });
    },
    platformList: async () => {
        return await axios.get(`${MCDBSERVICEURL}/${PLATFORMSERVICE}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving platforms list.\n${error}`);
        });
    },
    platformInfo: async (platformId: string) => {
        return await axios.get(`${MCDBSERVICEURL}/${PLATFORMSERVICE}/${platformId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving game information.\n${error}`);
        });
    },
    createPlatform: async (platform: Platform) => {
        return await axios.post(`${MCDBSERVICEURL}/${PLATFORMSERVICE}`, platform).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error creating platform.\n${error}`);
        });
    },
    updatePlatform: async (platform: Platform) => {
        return await axios.put(`${MCDBSERVICEURL}/${PLATFORMSERVICE}/${platform.id.toString()}`, platform).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error updating platform.\n${error}`);
        });
    },
    deletePlatform: async (platformId: string) => {
        return await axios.delete(`${MCDBSERVICEURL}/${PLATFORMSERVICE}/${platformId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error deleting platform.\n${error}`);
        });
    }
}

export default mcdbServices;