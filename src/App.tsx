import React, { useEffect, useState, FormEvent } from 'react';
import { SideMenu, SearchResultTile } from './components/ui';
import { useGetGamesList, useMobyGameSearch } from './hooks';
import { MobyGameDTO } from './models';

const App: React.FC = () => {
    const [enableCall, setEnableCall] = useState(false);
    const [title, setTitle] = useState<any>(null);
    const [enableSearch, setEnableSearch] = useState(false);
    const [searchResults, setSearcResults] = useState([]);

    const { data: gameListData, isLoading: isLoadingGameList } =
        useGetGamesList({
            enabled: !!enableCall,
        });

    const { data: searchData, isLoading: isSearching } = useMobyGameSearch(
        title,
        {
            enabled: !!enableSearch,
        }
    );

    useEffect(() => {
        if (!isSearching) {
            setEnableSearch(false);
            setSearcResults(searchData);
        }
    }, [isSearching]);

    const performSearch = (e: FormEvent) => {
        e.preventDefault();

        setEnableSearch(true);
    };

    const renderGameList = () => {
        if (!isLoadingGameList) {
            return (
                <div>
                    {gameListData?.map((game: MobyGameDTO, index: number) => (
                        <div key={`${game.title}-${index}`}>
                            <div>{game.title}</div>
                            <div>{game.description}</div>
                            <div>
                                <img src={`${game.coverUrl}`} />
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    };

    const renderSearchResults = () => {
        if (!isSearching) {
            return searchResults?.map((result: MobyGameDTO, index: Number) => (
                <SearchResultTile
                    key={`search-${result.title}-${index}`}
                    title={result.title}
                    description={result.description}
                    coverUrl={result.coverUrl}
                />
            ));
        }
    };

    return (
        <div className="row" style={{ height: '100vh' }}>
            <div className="col-lg-1 sidebar-main">
                <SideMenu />
            </div>
            <div className="col-lg-11">
                <button onClick={() => setEnableCall(!enableCall)}>Dude</button>
                {renderGameList()}
                <div>
                    <form onSubmit={performSearch}>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button type="submit" disabled={isSearching}>
                            Submit
                        </button>
                    </form>
                </div>
                {renderSearchResults()}
            </div>
        </div>
    );
};

export default App;
