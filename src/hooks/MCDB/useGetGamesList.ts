import { useQuery } from "@tanstack/react-query";
import { mcdbServices } from "../../api";

const getGamesList = async () => {
    return await mcdbServices.gamesList();
}

const useGetGamesList = (options: object) => {
    return useQuery({
        queryKey: ['gamesList'],
        queryFn: () => getGamesList().then((data) => data),
        refetchOnWindowFocus: false,
        ...options,
    })
}

export default useGetGamesList;