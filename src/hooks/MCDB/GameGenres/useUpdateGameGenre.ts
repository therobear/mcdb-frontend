import { useMutation } from "@tanstack/react-query";
import { mcdbServices } from "../../../api";
import { GameGenre } from '../../../models';

const updateGameGenre = async (genre: GameGenre) => {
    await mcdbServices.updateGameGenre(genre);
}

const useUpdateGameGenre = (options: object) => {
    return useMutation({
        mutationKey: ['updateGameGenre'],
        mutationFn: updateGameGenre,
        ...options
    });
}

export default useUpdateGameGenre;