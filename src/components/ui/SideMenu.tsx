import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

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
                        <Link to="games" onClick={() => setActiveLink('games')}>
                            Games
                        </Link>
                    </li>
                    <li className={`${setLIClass('movies')}`}>
                        <Link
                            to="movies"
                            onClick={() => setActiveLink('movies')}
                        >
                            Movies
                        </Link>
                    </li>
                    <li className={`${setLIClass('music')}`}>
                        <Link to="music" onClick={() => setActiveLink('music')}>
                            Music
                        </Link>
                    </li>
                    <li className={`${setLIClass('books')}`}>
                        <Link to="books" onClick={() => setActiveLink('books')}>
                            Books
                        </Link>
                    </li>
                    <li className={`${setLIClass('about')}`}>
                        <Link to="about" onClick={() => setActiveLink('about')}>
                            About
                        </Link>
                    </li>
                </ul>
            </Fragment>
        </Fragment>
    );
};

export default SideMenu;
