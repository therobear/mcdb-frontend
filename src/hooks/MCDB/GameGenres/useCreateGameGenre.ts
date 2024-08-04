import { useMutation } from "@tanstack/react-query";
import { mcdbServices } from "../../../api";
import { GameGenre } from "../../../models";

const createGameGenre = async (genre: GameGenre) => {
    await mcdbServices.createGameGenre(genre);
}

const useCreateGameGenre = (options: object) => {
    return useMutation({
        mutationKey: ['createGameGenre'],
        mutationFn: createGameGenre,
        ...options
    });
}

export default useCreateGameGenre;