import { useQuery } from "@tanstack/react-query";
import { mcdbServices } from "../../../api/";

const getGameGenreList = async () => {
    return await mcdbServices.gameGenreList();
}

const useGetGameGenreList = (options: object) => {
    return useQuery({
        queryKey: ['gameGenreList'],
        queryFn: () => getGameGenreList().then((data) => data),
        refetchOnWindowFocus: false,
        ...options 
    })
}

export default useGetGameGenreList;