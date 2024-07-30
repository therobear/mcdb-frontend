import { SideMenu } from './components/ui';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
    LandingPage,
    CreateGame,
    CreateMovie,
    CreateMusic,
    CreateBook,
    About,
    Books,
    Games,
    Movies,
    Music,
    SearchResults,
} from './pages';

const App = () => {
    return (
        <BrowserRouter>
            <div className="row main-row">
                <div className="col-lg-1 sidebar-main">
                    <SideMenu />
                </div>
                <div className="col-lg-11 display-container">
                    <Routes>
                        <Route element={<LandingPage />} path="/" />
                        <Route element={<CreateGame />} path="createGame" />
                        <Route element={<CreateGame />} path="editGame/:id" />
                        <Route element={<CreateMovie />} path="createMovie" />
                        <Route element={<CreateMovie />} path="editMovie/:id" />
                        <Route element={<CreateMusic />} path="createMusic" />
                        <Route element={<CreateMusic />} path="editMusic/:id" />
                        <Route element={<CreateBook />} path="createBook" />
                        <Route element={<CreateBook />} path="editBook/:id" />
                        <Route element={<About />} path="about" />
                        <Route element={<Books />} path="books" />
                        <Route element={<Games />} path="games" />
                        <Route element={<Movies />} path="movies" />
                        <Route element={<Music />} path="music" />
                        <Route
                            element={<SearchResults />}
                            path="searchResults"
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
