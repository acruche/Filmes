import { Injectable } from '@angular/core';


@Injectable()
export class ConfigProvider {
	configGlobal = {
		fotoUrl: null
	}

	constructor() {
		// Recuperando os dados
		let dados = JSON.parse(localStorage.getItem("configGlobal"));
		if(dados != null) {
			this.configGlobal.fotoUrl = dados.fotoUrl;
		}
	}

	setConfigFotoUrl(path : string) {
		this.configGlobal.fotoUrl = path;
		localStorage.setItem("configGlobal", JSON.stringify(this.configGlobal));
	}

	getConfigFotoUrl() : any {
		return this.configGlobal.fotoUrl;
	}

	// Recuperando os dados do localstorage
	getConfigData(): any {
		return localStorage.getItem("config");
	}

	// Salvando os dados no localstorage
	setConfigData(showSlide?: boolean) {
		let config = {
			showSlide: false
		}

		if (showSlide)
			config.showSlide = showSlide;

		localStorage.setItem("config", JSON.stringify(config));
	}
}
