import { FilmeDetalhesPage } from './../filme-detalhes/filme-detalhes';
import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [
		MovieProvider
	]
})
export class HomePage {
	private loader;
	public infiniteScroll;
	public refresher;
	public isRefreshing: boolean = false;
	public titulo: string = "Destaque";
	public page = 1;
	public listaFilmes = new Array<any>();

	constructor(public navCtrl: NavController, public movieProvider: MovieProvider, public loadingCtrl: LoadingController) {

	}

	ionViewDidEnter() {
		this.carregarFilmes();
	}

	doInfinite(infiniteScroll) {
		this.page++;
		this.infiniteScroll = infiniteScroll;
		this.carregarFilmes(true);
	}

	doRefresh(refresher) {
		this.refresher = refresher;
		this.isRefreshing = true;

		this.carregarFilmes();
	}

	carregarFilmes(newpage: boolean = false) {
		this.openLoading();

		this.movieProvider.getLastestMovies(this.page).subscribe(
			data => {
				const response = (data as any);

				if (newpage) {
					this.listaFilmes = this.listaFilmes.concat(response.results);
					this.infiniteScroll.complete();
				} else {
					this.listaFilmes = response.results;
				}

				this.closeLoadnig();

				// Refresh
				if (this.isRefreshing) {
					this.refresher.complete();
					this.isRefreshing = false;
				}

			}, error => {
				this.closeLoadnig();

				// Refresh
				if (this.isRefreshing) {
					this.refresher.complete();
					this.isRefreshing = false;
				}

				console.error(error);
			});
	}

	openLoading() {
		this.loader = this.loadingCtrl.create({
			content: "Carregando filmes..."
		});
		this.loader.present();
	}

	closeLoadnig() {
		this.loader.dismiss();
	}

	abrirDetalhes(filme) {
		this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
	}

	
}
