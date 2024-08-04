import { useQuery } from "@tanstack/react-query";
import { mcdbServices } from "../../api";

const getPlatformList = async () => {
    return await mcdbServices.platformList();
}

const useGetPlatformList = (options: object) => {
    return useQuery({
        queryKey: ['platformList'],
        queryFn: () => getPlatformList().then((data) => data),
        refetchOnWindowFocus: false,
        ...options
    })
}

export default useGetPlatformList;