import { useMutation } from "@tanstack/react-query";
import { mcdbServices } from "../../../api";
import { Platform } from "../../../models";

const createPlatform = async (platform: Platform) => {
    await mcdbServices.createPlatform(platform);
}

const useCreatePlatform = (options: object) => {
    return useMutation({
        mutationKey: ['createPlatform'],
        mutationFn: createPlatform,
        ...options
    });
}

export default useCreatePlatform;