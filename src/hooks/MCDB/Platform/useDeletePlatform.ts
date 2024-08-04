import { useMutation } from "@tanstack/react-query";
import { mcdbServices } from "../../../api";

const deletePlatform = async (id: string) => {
    await mcdbServices.deletePlatform(id);
}

const useDeletePlatform = (options: object) => {
    return useMutation({
        mutationKey: [`deletePlatform`],
        mutationFn: deletePlatform,
        ...options
    })
}

export default useDeletePlatform;