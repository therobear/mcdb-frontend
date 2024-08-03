import { useQuery } from "@tanstack/react-query";
import { mcdbServices } from "../../api";

const getGameInfo = async (id: string) => {
    return await mcdbServices.gameInfo(id);
}

const useGetGameInfo = (id: string, options: object) => {
    return useQuery({
        queryKey: [`gameInfo-${id}`],
        queryFn: () => getGameInfo(id).then((data) => data),
        refetchOnWindowFocus: false,
        ...options,
    });
}

export default useGetGameInfo;