#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;
const __basedir = path.join(__dirname, '..');

class listingPageForRoute{
	constructor(){
		this.main();
	}

	async main(){
		const self = this;

		const dirSouces = [
			'pages'
		]

		let pages = []

		for(let source of dirSouces){
			// get list of components
			const componentPath = path.join(__basedir, `/src/${source}`);

			pages = await self.getListDir(componentPath);
		}

		const generateRoute = await self.generateRoute(pages);

		// replace current route to main.js
		const mainFileJS = path.join(__basedir, "/src/main.js");
		const replaceMainJS = await self.replaceMainJS(mainFileJS, generateRoute);
	}

	async replaceMainJS(filepath, newTexts){
		const self = this;

		// delete current import text
		const deleteResult = await self.deleteLine(filepath, '/* generated routes */', '/* end of generated routes */');
		if(!deleteResult.status){
			console.log(deleteResult.error);
			return deleteResult;
		}
		
		// add new import text
		const wrappedText = await self.addIndent(newTexts, deleteResult.data.indent);
		const addResult = await self.addLine(filepath, wrappedText, deleteResult.data.firstLine);
		if(!addResult.status){
			console.log(addResult.error);
			return addResult;
		}

		return { status: true };
	}

	toKebabCase(str) {
  		return str
    		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')     // aaaB => aaa-B
    		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')   // JSONData => JSON-Data
    		.replace(/([a-zA-Z])([0-9])/g, '$1-$2')      // Page404 => Page-404
    		.replace(/([0-9])([a-zA-Z])/g, '$1-$2')      // 404Page => 404-Page (rare case)
    		.toLowerCase();
	}

	async generateRoute(dirs){
		const self = this;

		// example :
		// '/login': { component: 'page-login' },
		
		let texts = '/* generated routes */\n';
		for(let file of dirs){
			const componentName = self.toKebabCase(file);
			const pathName = componentName.replace('page-', '');
			texts += `'/${pathName}': { component: '${componentName}' },\n`
		}
		texts += '/* end of generated routes */\n';


		return texts;
	}

	async deleteLine(fileName, firstKeyword, lastKeyword){
		return new Promise((resolve) => {
			fs.readFile(fileName, 'utf8', (err, data) => {

				const lines = data.split('\n');
				let newTexts = data;
				let currentLine = 0;
				let firstFoundLine = 0;
				let indent = '';

				let step = 0; // 1 = firstKeyword found, 2 = lastKeyword found

				for(let line of lines){

					currentLine++;

					if(line.includes(firstKeyword)){
						const indentMatch = line.match(/^(.*?)\/\*/);
						if(indentMatch?.length > 1){
							indent = indentMatch[1];
						}

						firstFoundLine = currentLine - 1;
						step = 1;
					}

					if(step == 1){
						newTexts = newTexts.replace(`${line}\n`, '');
					}

					if(line.includes(lastKeyword)){
						step = 2;
						break;
					}
				}

				if(step != 2){
					return resolve({
						status: false,
						error: "please don't update css & js import comment at index.html"
					})
				}

				fs.writeFile(fileName, newTexts, 'utf-8', (err, data) => {
					return resolve({
						status: true,
						data: { fileName, newTexts, firstLine: firstFoundLine, indent }
					});
				})
			})
		})
		.catch(err => {
			return {
				status: false,
				error: err
			}
		})
	}

	prependToEachLineExceptLast(input, prefix) {
  		const lines = input.split('\n');
  		return lines
    		.map((line, idx) => idx === lines.length - 1 ? line : prefix + line)
    		.join('\n');
	}

	async addIndent(collected, indent){
		const self = this;

		return self.prependToEachLineExceptLast(collected, indent);
	}

	async addLine(fileName, newText, insertedLine){
		const self = this;

		return new Promise((resolve) => {
			fs.readFile(fileName, 'utf8', (err, data) => {

				let __lines = data.split('\n');
				let lines = __lines.map((line, index) => index < __lines.length - 1 ? `${line}\n` : line);

				lines.splice(insertedLine, 0, newText);
				const newTexts = lines.join('');

				fs.writeFile(fileName, newTexts, 'utf-8', (err, data) => {
					return resolve({
						status: true,
						data: { fileName, newTexts }
					});
				})

			})
		})
		.catch(err => {
			return {
				status: false,
				error: err
			}
		})
	}

	async getListDir(__path) {
		const self = this;

    	const dirs = [];

    	fs.readdirSync(__path)
        	.forEach( async (file) => {

				const stats = fs.statSync(path.join(__path, file));
				if(stats.isDirectory()){
        			dirs.push(file);
        		}
        	});

    	return dirs;
	};

	
}

new listingPageForRoute();
