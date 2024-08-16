import { useMutation } from "@tanstack/react-query";
import { mcdbServices } from "../../../api";
import { Game, MobyPlatform, GameGenre } from "../../../models";

const createGame = async (game: Game) => {
    await mcdbServices.createGame(game);
}

const useCreateGame = (options: object) => {
    return useMutation({
        mutationKey: ['createGame'],
        mutationFn: createGame,
        ...options
    });
}

export default useCreateGame;