import { Button } from '../ui';

type SearchResultsProps = {
    title: string;
    description: string;
    coverUrl: string;
};

const SearchResultTile = ({
    title,
    description,
    coverUrl,
}: SearchResultsProps) => {
    return (
        <div className="search-tile-main">
            <div className="row">
                <div className="col-lg-2">
                    <img className="search-result-cover" src={coverUrl} />
                </div>
                <div className="col-lg-10">
                    <div className="row search-result-title-div">{title}</div>
                    <div
                        className="row search-result-desc-div"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                    <div className="row end-lg bottom-lg search-result-button-div">
                        <Button
                            callback={() => console.log('Clicked You')}
                            buttonType="standard"
                        >
                            Add Game
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultTile;
