// MCDB Hooks
import { default as useGetGamesList } from './MCDB/Games/useGetGamesList';
import { default as useGetGameInfo } from './MCDB/Games/useGetGameInfo';
import { default as useGetPlatformList } from './MCDB/Platform/useGetPlatformList';
import { default as useCreatePlatform } from './MCDB/Platform/useCreatePlatform';
import { default as useUpdatePlatform } from './MCDB/Platform/useUpdatePlatform';
import { default as useDeletePlatform } from './MCDB/Platform/useDeletePlatform';
import { default as useGetGameGenreList } from './MCDB/GameGenres/useGetGameGenreList';
import { default as useCreateGameGenre } from './MCDB/GameGenres/useCreateGameGenre';
import { default as useUpdateGameGenre } from './MCDB/GameGenres/useUpdateGameGenre';
import { default as useDeleteGameGenre } from './MCDB/GameGenres/useDeleteGameGenre';

// Moby Games Hooks
import { default as useMobyGameSearch } from './Moby/useMobyGameSearch';

export {
    useGetGamesList,
    useGetGameInfo,
    useMobyGameSearch,
    useGetPlatformList,
    useCreatePlatform,
    useUpdatePlatform,
    useDeletePlatform,
    useGetGameGenreList,
    useCreateGameGenre,
    useUpdateGameGenre,
    useDeleteGameGenre
}