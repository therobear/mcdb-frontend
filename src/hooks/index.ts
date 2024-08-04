// MCDB Hooks
import { default as useGetGamesList } from './MCDB/useGetGamesList';
import { default as useGetGameInfo } from './MCDB//useGetGameInfo';
import { default as useGetPlatformList } from './MCDB/useGetPlatformList';
import { default as useCreatePlatform } from './MCDB/Platform/useCreatePlatform';
import { default as useUpdatePlatform } from './MCDB/Platform/useUpdatePlatform';
import { default as useDeletePlatform } from './MCDB/Platform/useDeletePlatform';

// Moby Games Hooks
import { default as useMobyGameSearch } from './Moby/useMobyGameSearch';

export {
    useGetGamesList,
    useGetGameInfo,
    useMobyGameSearch,
    useGetPlatformList,
    useCreatePlatform,
    useUpdatePlatform,
    useDeletePlatform
}