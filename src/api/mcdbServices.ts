import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MCDBSERVICEURL, GAMESSERVICE, PLATFORMSERVICE } from './apiConfig';

const mcdbServices = {
    gamesList: async () => {
        return await axios.get(`${MCDBSERVICEURL}/${GAMESSERVICE}`).then((response) => 
            response.data
        ).catch((error) => {
            toast.error(`Error retrieving games list.\n${error}`)
        });
    }
}

export default mcdbServices;