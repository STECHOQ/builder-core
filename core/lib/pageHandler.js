import fs from "fs/promises";
import path from 'path';

import replaceContent from './replaceContent.js';
import stringFormatter from './stringFormatter.js';
import componentHandler from './componentHandler.js';

class pageHandler {

	// generate page from PageTemplate at src/pages
	async init({
		outputPath,
		templates,
		project
	}){
		const self = this;

		const pageTemplatePath = path.join(outputPath, 'src', 'pages', 'PageTemplate');

		const cTemplates = await self.prepareComponentTemplates(templates)

		for(const pageId in project.pages){

			const page = project.pages[pageId];

			const { mainJsPath, newPagePath } = await self.preparePageDir(pageId, outputPath, pageTemplatePath);

			await replaceContent.handleScript(newPagePath, page, mainJsPath);

			await self.handleLayout(newPagePath, page, mainJsPath);

			const componentStructure = await componentHandler.setAll(page["schema.json"], outputPath, cTemplates);

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

	async prepareComponentTemplates(templates){
		const self = this;

		const results = {};

		for(const templateId in templates){
			const template = templates[templateId];

			const cTemplates = templates[templateId].templates;
			Object.assign(results, cTemplates);
		}

		return results;
	}

	async handleLayout(newPagePath, page, mainJsPath){
		const self = this;

		const layouts = page['schema.json']?.layouts || [];

		const layoutNames = [];

		for(const layoutId of layouts){

			const layoutName = 'Layout ' + layoutId;
			const capitalLayoutName = stringFormatter.capitalizeFirstLetter(layoutName);

			layoutNames.push(capitalLayoutName);
		}

		// add script import 
		await replaceContent.generateAndReplaceImportComment({
			files: layoutNames,
			start: '/* import layout */',
			end: '/* end of import layout */',
			content: `import * as {{CONTENT}} from '../../layouts/{{CONTENT}}';`,
			filepath: mainJsPath,
		});

		// add attribute
		await replaceContent.generateAndReplaceImportComment({
			files: layoutNames,
			start: '/* add layout attribute */',
			end: '/* end of add layout attribute */',
			content: `items.push(...{{CONTENT}}.items); self.totalComponent += {{CONTENT}}.totalComponent;`,
			filepath: mainJsPath,
		});

		// call layout
		await replaceContent.generateAndReplaceImportComment({
			files: layoutNames,
			start: '/* call layout script */',
			end: '/* end of call layout script */',
			content: `await {{CONTENT}}.load(self);`,
			filepath: mainJsPath,
		});
		
	}
}

export default new pageHandler()
