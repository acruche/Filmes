import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieProvider {
    private baseApiPath = "https://api.themoviedb.org/3";
    private apiKey = "cdd3d065ad8c88d222eabfcf61af6cdf";

    constructor(public http: HttpClient) {
        console.log('Hello MovieProvider Provider');
    }

    getLastestMovies(page = 1) {
        return this.http.get(this.baseApiPath + `/movie/popular?page=${page}&api_key=` + this.apiKey + "&language=pt-BR");
    }

    getMovieDetails(filmeid) {
        return this.http.get(this.baseApiPath + `/movie/${filmeid}?api_key=` + this.apiKey + "&language=pt-BR");
    }
}
