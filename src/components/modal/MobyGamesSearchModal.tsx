import { useEffect, useState, FormEvent } from 'react';
import { MobyGameDTO } from '../../models';
import { useMobyGameSearch } from '../../hooks';
import { Button, SearchResultTile } from '../ui';
import { CircleX } from 'lucide-react';

type SearchProps = {
    callback: Function;
};

const MobyGamesSearchModal = ({ callback }: SearchProps) => {
    const [searchText, setSearchText] = useState<any>();
    const [enableSearch, setEnableSearch] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState([]);

    const {
        data: searchData,
        error: searchError,
        isLoading: isLoadingSearch,
    } = useMobyGameSearch(searchText, {
        enabled: !!enableSearch,
    });

    useEffect(() => {
        if (!isLoadingSearch) {
            setEnableSearch(false);
            setSearchResults(searchData);
        }
    }, [isLoadingSearch]);

    const performSearch = (e: FormEvent) => {
        e.preventDefault();

        setEnableSearch(true);
    };

    const renderSearchResults = () => {
        if (!isLoadingSearch && searchResults) {
            return searchResults.map((result: MobyGameDTO, index: number) => (
                <SearchResultTile
                    key={`search-${result.title}-${index}`}
                    title={result.title}
                    description={result.description}
                    coverUrl={result.coverUrl}
                    callback={() => callback(searchResults[index])}
                />
            ));
        }
    };

    return (
        <div className="modal-search-container">
            <div className="modal-title">Search Moby Games</div>
            <div className="modal-content">
                <form onSubmit={performSearch} style={{ width: '100%' }}>
                    <div className="row center-lg middle-lg">
                        <div className="col-lg-11">
                            <input
                                type="text"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="col-lg-1">
                            <Button
                                buttonType="standard"
                                actionType="submit"
                                callback={() => {}}
                            >
                                Search
                            </Button>
                        </div>
                    </div>
                    <div className="search-results-container">
                        {renderSearchResults()}
                    </div>
                    <div className="row end-lg search-result-button-div">
                        <Button
                            buttonType="warning"
                            callback={() => callback(undefined)}
                        >
                            <CircleX className="button-icon" /> Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MobyGamesSearchModal;
