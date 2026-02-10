import fs from "fs/promises";
import path from 'path';

import replaceContent from './replaceContent.js';
import stringFormatter from './stringFormatter.js';
import componentHandler from './componentHandler.js';

class pageHandler {

	// generate page from PageTemplate at src/pages
	async init({
		outputPath,
		project
	}){
		const self = this;

		const pageTemplatePath = path.join(outputPath, 'src', 'pages', 'PageTemplate');

		const { filledComponents } = await componentHandler.prepareComponents({ 
			project, 
			outputPath,
		});

		for(const pageId in project.pages){

			const page = project.pages[pageId];

			const rawComponents = page['schema.json'].components;

			const componentStructure = await componentHandler.generateGridstackStructure({ rawComponents, filledComponents });

			const { mainJsPath, newPagePath } = await self.preparePageDir(pageId, outputPath, pageTemplatePath);

			await replaceContent.handleScript(newPagePath, page, mainJsPath);

			await replaceContent.insertComponents(componentStructure, mainJsPath);

		}

		// replace DEFAULT_PAGE in main.js 
		const defaultPath = project['schema.json'].mainPageId;
		await self.replaceDefaultPageOnRoute(outputPath, defaultPath)

		// delete PageTemplate 
		await fs.rm(
			pageTemplatePath,
			{ recursive: true, force: true }
		);
	}

	async replaceDefaultPageOnRoute(outputPath, defaultPath){
		const self = this;

		const mainjsPath = path.join(outputPath, 'src', 'main.js');
		let contentMainjs = await fs.readFile(mainjsPath, "utf8");
    	contentMainjs = contentMainjs.replace(/DEFAULT_PAGE/g, `"/${defaultPath}"`);

		await fs.writeFile(mainjsPath, contentMainjs, "utf8");
	}

	async preparePageDir(pageId, outputPath, pageTemplatePath){
		const self = this;

		// copy PageTemplate and rename the name 
		const pageName = 'Page ' + pageId;
		const capitalPageName = stringFormatter.capitalizeFirstLetter(pageName);
		const kebabPageName = stringFormatter.toKebabCase(capitalPageName);

		const newPagePath = path.join(outputPath, 'src', 'pages', capitalPageName);
		await fs.cp(pageTemplatePath, newPagePath, { recursive: true, force: true });

		const mainJsPath = path.join(newPagePath, capitalPageName + '.js');
		await fs.rename(
			path.join(newPagePath, 'PageTemplate.js'),
			mainJsPath,
		);

    	let content = await fs.readFile(mainJsPath, "utf8");
    	content = content.replace(/PageTemplate/g, capitalPageName);
		content = content.replace(/page-template/g, kebabPageName);

		await fs.writeFile(mainJsPath, content, "utf8");

		return { mainJsPath, newPagePath };
	}
}

export default new pageHandler()
