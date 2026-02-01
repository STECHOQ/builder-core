import fs from "fs/promises";
import crypto from "crypto";

import path from 'path';

import replaceContent from './lib/replaceContent.js';

const __basedir = import.meta.dirname;

const PATH_TEMPLATE_BUILD = `${__basedir}/../new-template-bundle`;
const PATH_PROJECT_DATA = `${__basedir}/../project-1`;
const PATH_TEMPLATES = `${__basedir}/../templates`;
const PATH_OUTPUTS = `${__basedir}/../outputs`;

const PATH_ROOT = path.join(__basedir, '..');

class build {
	constructor(){
		const self = this;

		self.start();
	}

	async createTmpDir(){
		const self = this;

		// create uuid for tmp name
		const uuid = crypto.randomUUID();

		// copy everything inside PATH_TEMPLATE_BUILD to tmp dir
		const outputPath = path.join(PATH_OUTPUTS, uuid);
		await fs.cp(PATH_TEMPLATE_BUILD, outputPath, { recursive: true, force: true });

		return outputPath;
	}

	async loadTemplates(dirPath){
		const self = this;

		// listing templates, layouts & libraries from PATH_TEMPLATES

		const result = {};

		const contents = await fs.readdir(dirPath, { withFileTypes: true });

		for(const content of contents){
			const contentPath = path.join(dirPath, content.name);

			if(content.isDirectory()){
				result[content.name] = await self.loadTemplates(contentPath);
			}else if(content.isFile()){

				if(content.name == 'schema.json'){
					const { default: schemaContent } = await import(contentPath, {
						with: { type: 'json' }
					})

					result[content.name] = schemaContent;
				}else{
					result[content.name] = contentPath;
				}
			}
		}

		return result;
	}

	async addLibraryLinkToIndexHTML(librariesLink, outputPath){
		const self = this;

		// some libraries doesn't has .css or .js extension on its url
		// like https://cdn.jsdelivr.net/npm/daisyui@5

		const cssFiles = librariesLink?.css || [];
		const jsFiles = librariesLink?.js || [];

		const indexHtml = path.join(outputPath, "/index.html");

		const configurations = {
			js: {
				files: jsFiles,
				start: '<!-- JS URL -->',
				end: '<!-- End of JS URL -->',
				content: `<script vite-ignore src="{{CONTENT}}"></script>`,
				filepath: indexHtml,
			},
			css: {
				files: cssFiles,
				start: '<!-- CSS URL -->',
				end: '<!-- End of CSS URL -->',
				content: `<link rel="stylesheet" href="{{CONTENT}}">`,
				filepath: indexHtml,
			}
		}

		for(const type in configurations){
			const item = configurations[type];

			await replaceContent.generateAndReplaceImportComment(item);
		}
	}

	async addLibrariesToVendor({files, outputPath, templateId}){
		const self = this;

		const templatePath = path.join(outputPath, 'public', 'vendor', templateId);

		await fs.mkdir(templatePath, { recursive: true });

		for(const fileName in files){
			const filePath = files[fileName];
			const destPath = path.join(templatePath, fileName)

			await fs.cp(filePath, destPath, { recursive: true, force: true });
		}
	}

	async start(){
		const self = this;

		const outputPath = await self.createTmpDir();

		const templates = await self.loadTemplates(PATH_TEMPLATES);
		//console.log(JSON.stringify(templates, null, 2));

		for(const templateId in templates){
			const template = templates[templateId];

			// if library is link, then put it directly into index.html
			const librariesLink = template["schema.json"]?.libraries;
			if(librariesLink){
				self.addLibraryLinkToIndexHTML(librariesLink, outputPath);
			}

			// if library is file, then put it into public/vendor
			const librariesFiles = template.libraries;
			if(Object.keys(librariesFiles)?.length){
				self.addLibrariesToVendor({files: librariesFiles, outputPath, templateId});
			}
		}

		// generate layout at src/layouts
   			// get list of its components
   			// add its components into array of components (below one)
   			// copy LayoutTemplate and rename the name
   			// replace LIST_COMPONENTS with generated gridstack-formatted component
   			// add script import at /* import script */ ... /* end of import script */
   			// add script call at /* call script */ ... /* end of call script */
   			// replace TOTAL_COMPONENTS with total components
   			// put js script at same directory as page.js

		// generate component at public/components
   			// get html & css from component's template
   			// fill the empty attribut of html
   			// put filled html & css to component's directory 
   			// add componenId at the front of each .css syntax
   			// call css from root index.html 

		// generate page from PageTemplate at src/pages
   			// copy PageTemplate and rename the name
   			// replace LIST_COMPONENTS with generated gridstack-formatted component
   			// add script import at /* import script */ ... /* end of import script */
   			// add script call at /* call script */ ... /* end of call script */
   			// replace TOTAL_COMPONENTS with total components
   			// put js script at same directory as page.js
   			// add script import of layout
   			// add script merge layout items & totalComponents
   			// add script to load layout script

		// replace DEFAULT_PAGE in main.js 
		// delete PageTemplate 
		// delete LayoutTemplate
	}
}

new build();
