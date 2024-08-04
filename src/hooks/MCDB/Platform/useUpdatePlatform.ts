import { useMutation } from "@tanstack/react-query";
import { mcdbServices } from "../../../api";
import { Platform } from "../../../models";

const updatePlatform = async (platform: Platform) => {
    await mcdbServices.updatePlatform(platform);
}

const useUpdatePlatform = (options: object) => {
    return useMutation({
        mutationKey: ['updatePlatform'],
        mutationFn: updatePlatform,
        ...options
    });
}

export default useUpdatePlatform;