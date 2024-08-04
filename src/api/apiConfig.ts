// Initial Service Info
const SCHEME: string = 'http';
const MCDBSERVICEDOMAIN: string = 'localhost'
const MCDBSERVICEPORT: string = '3001';
const MCDBSERVICEURL: string = `${SCHEME}://${MCDBSERVICEDOMAIN}:${MCDBSERVICEPORT}/api`

// MCDB Services
const GAMESSERVICE: string = 'games';
const PLATFORMSERVICE: string = 'platforms'
const GAMEGENRESSERVICE: string = 'gameGenres';

// Moby Games Services
const MOBYBASE: string = 'moby';
const MOBYSEARCHGAMES: string = 'searchGame';
const MOBYSEARCHGROUP: string = 'searchGroup';
const MOBYCOVERS: string = 'covers';
const MOBYGAMES: string = 'games';
const MOBYGENRES: string = 'genres';
const MOBYPLATFORMS: string ='platforms';
const MOBYSCREENSHOTS: string = 'screenshots';

export {
    MCDBSERVICEURL,
    GAMESSERVICE,
    PLATFORMSERVICE,
    GAMEGENRESSERVICE,
    MOBYBASE,
    MOBYSEARCHGAMES,
    MOBYSEARCHGROUP,
    MOBYCOVERS,
    MOBYGAMES,
    MOBYGENRES,
    MOBYPLATFORMS,
    MOBYSCREENSHOTS
}