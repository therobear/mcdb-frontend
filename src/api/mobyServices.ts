import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MCDBSERVICEURL, MOBYBASE, MOBYGAMES, MOBYPLATFORMS, MOBYSCREENSHOTS, MOBYCOVERS, MOBYGENRES, MOBYSEARCHGAMES, MOBYSEARCHGROUP } from './apiConfig';

const mobyServices = {
    getGameInfo: async (gameId: String) => {
        return await axios.get(`${MOBYBASE}/${MOBYGAMES}/${gameId}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving game information from Moby Game.\n${error}`);
        });
    },
    searchGames: async (title: String) => {
        return await axios.get(`${MCDBSERVICEURL}/${MOBYBASE}/${MOBYSEARCHGAMES}?title=${title}`).then((response) =>
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving search results from Moby Game.\n${error}`);
        });
    }
}

export default mobyServices;