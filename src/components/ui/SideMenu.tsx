import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Gamepad2,
    Clapperboard,
    Disc3,
    BookText,
    CircleHelp,
    TableProperties,
} from 'lucide-react';

const SideMenu = () => {
    const [activeLink, setActiveLink] = useState('');

    const setLIClass = (listEl: string) => {
        if (activeLink === listEl) {
            return 'sidbar-list-active';
        } else {
            return '';
        }
    };

    return (
        <Fragment>
            <div className="sidebar-title">
                <Link to="/" onClick={() => setActiveLink('')}>
                    mcdb
                </Link>
            </div>
            <Fragment>
                <ul className="sidebar-nav">
                    <li className={`${setLIClass('games')}`}>
                        <Link
                            to="games"
                            className="sidebar-nav-links"
                            onClick={() => setActiveLink('games')}
                        >
                            <Gamepad2 /> Games
                        </Link>
                    </li>
                    <li className={`${setLIClass('movies')}`}>
                        <Link
                            to="movies"
                            className="sidebar-nav-links"
                            onClick={() => setActiveLink('movies')}
                        >
                            <Clapperboard /> Movies
                        </Link>
                    </li>
                    <li className={`${setLIClass('music')}`}>
                        <Link
                            to="music"
                            className="sidebar-nav-links"
                            onClick={() => setActiveLink('music')}
                        >
                            <Disc3 /> Music
                        </Link>
                    </li>
                    <li className={`${setLIClass('books')}`}>
                        <Link
                            to="books"
                            className="sidebar-nav-links"
                            onClick={() => setActiveLink('books')}
                        >
                            <BookText /> Books
                        </Link>
                    </li>
                    <li className={`${setLIClass('platforms')}`}>
                        <Link
                            to="platforms"
                            className="sidebar-nav-links"
                            onClick={() => setActiveLink('platforms')}
                        >
                            <TableProperties /> Platforms
                        </Link>
                    </li>
                    <li className={`${setLIClass('gamegenres')}`}>
                        <Link
                            to="gameGenres"
                            className="sidebar-nav-links"
                            onClick={() => setActiveLink('gamegenres')}
                        >
                            <Gamepad2 /> Genres
                        </Link>
                    </li>
                    <li className={`${setLIClass('about')}`}>
                        <Link
                            to="about"
                            className="sidebar-nav-links"
                            onClick={() => setActiveLink('about')}
                        >
                            <CircleHelp /> About
                        </Link>
                    </li>
                </ul>
            </Fragment>
        </Fragment>
    );
};

export default SideMenu;
