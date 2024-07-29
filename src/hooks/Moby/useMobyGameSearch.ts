import { useQuery } from "@tanstack/react-query";
import { mobyServices } from '../../api';

const mobyGameSearch = async (title: String) => {
    return await mobyServices.searchGames(title);
}

const useMobyGameSearch = (title: String, options: object) => {
    return useQuery({
        queryKey: [`mobyGameSearch-${title}`],
        queryFn: () => mobyGameSearch(title).then((data) => data),
        refetchOnWindowFocus: false,
        ...options
    });
}

export default useMobyGameSearch;