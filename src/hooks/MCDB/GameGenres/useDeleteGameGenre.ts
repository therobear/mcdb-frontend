import { useMutation } from "@tanstack/react-query";
import { mcdbServices } from "../../../api";

const deleteGameGenre = async (id: string) => {
    await mcdbServices.deleteGameGenre(id);
}

const useDeleteGameGenre = (options: object) => {
    return useMutation({
        mutationKey: ['deleteGameGenre'],
        mutationFn: deleteGameGenre,
        ...options
    });
}

export default useDeleteGameGenre;