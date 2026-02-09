import fs from "fs/promises";
import crypto from "crypto";
import path from 'path';

import replaceContent from './replaceContent.js';

class setup {

	async createTmpDir(PATH_OUTPUTS, PATH_TEMPLATE_BUILD){
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

	async handleLibraries({ project, outputPath, projectPath }){
		const self = this;

		const librariesLinks = { css: [], js: [] };

		for(const libraryId in project?.material?.libraries){
			const dirContent = project.material.libraries[libraryId];
			const schema = dirContent['schema.json'];

			const librariesFiles = {};

			if(schema?.selectedFiles?.length){
				for(const filePath of schema.selectedFiles){
					const splitPath = filePath.split('/');
					const fileName = splitPath[splitPath.length - 1];
					const fileActualPath = path.join(projectPath, 'material', 'libraries', libraryId, filePath);

					librariesFiles[fileName] = fileActualPath;
				}
			}else{
				for(const fileId in dirContent){
					if(fileId != 'schema.json'){
						librariesFiles[fileId] = dirContent[fileId];
					}
				}
			}

			// if library is file, then put it into public/vendor

			if(Object.keys(librariesFiles)?.length){
				await self.addLibrariesToVendor({files: librariesFiles, outputPath, templateId: libraryId});
			}

			if(schema?.urls){
				if(schema.urls?.css?.length){
					librariesLinks.css.push(...schema.urls.css);
				}

				if(schema.urls?.js.length){
					librariesLinks.js.push(...schema.urls.js);
				}
			}
		}

		// if library is link, then put it directly into index.html
		await self.addLibraryLinkToIndexHTML(librariesLinks, outputPath);
	}

}

export default new setup()
