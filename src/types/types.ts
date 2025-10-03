//тип для краткой инф-ии о фильме (поиск)
export interface MovieShort {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

//тип для полной инф-ии о фильме
export interface MovieFull extends MovieShort {
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
    Response: string;
}