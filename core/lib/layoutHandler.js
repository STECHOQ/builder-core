import fs from "fs/promises";
import path from 'path';

import replaceContent from './replaceContent.js';
import stringFormatter from './stringFormatter.js';
import componentHandler from './componentHandler.js';

class layoutHandler {

	// generate layout at src/layouts
	async init({
		outputPath,
		templates
	}){
		const self = this;

		const layoutTemplatePath = path.join(outputPath, 'src', 'layouts', 'LayoutTemplate');

		for(const templateId in templates){
			const template = templates[templateId];

			const cTemplates = templates[templateId].templates;

			for(const layoutId in template.layouts){
				const layout = template.layouts[layoutId];

				const layoutName = 'Layout ' + layout['schema.json'].name;
				const capitalLayoutName = stringFormatter.capitalizeFirstLetter(layoutName);
				const kebabLayoutName = stringFormatter.toKebabCase(capitalLayoutName);

				// copy LayoutTemplate and rename the name		
				const newLayoutPath = path.join(outputPath, 'src', 'layouts', capitalLayoutName);
				await fs.cp(layoutTemplatePath, newLayoutPath, { recursive: true, force: true });

				const indexjsPath = path.join(newLayoutPath, 'index.js');

				await self.handleScript(newLayoutPath, layout, indexjsPath);

				const componentStructure = await componentHandler.setAll(layout["schema.json"], outputPath, cTemplates);
				await self.insertComponentToLayout(componentStructure, indexjsPath);
			}
		}

		// delete LayoutTemplate
		await fs.rm(
			layoutTemplatePath,
			{ recursive: true, force: true }
		);
	}

	async insertComponentToLayout({ structures, totalComponents }, indexjsPath){
		const self = this;

		const srcContent = await fs.readFile(indexjsPath, 'utf8');
		let replacedContent = srcContent;

		// replace LIST_COMPONENTS with generated gridstack-formatted component 
		replacedContent = replacedContent.replace(/LIST_COMPONENTS/g, JSON.stringify(structures, null, 4));

		// replace TOTAL_COMPONENTS with total components 
		replacedContent = replacedContent.replace(/TOTAL_COMPONENTS/g, totalComponents);
		
		await fs.writeFile(indexjsPath, replacedContent, 'utf8');
	}

	async handleScript(layoutPath, layout, indexjsPath){
		const self = this;

		if(!layout.scripts || typeof layout.scripts !== 'object') return {};

		const scriptNames = [];
		for(const scriptName in layout.scripts){
			const scriptPath = layout.scripts[scriptName];
			const destinationPath = path.join(layoutPath, 'scripts', scriptName);

			// put js script at same directory as page.js
			await fs.cp(scriptPath, destinationPath, { recursive: true, force: true });

			const cleanScriptName = scriptName.replace('.js', '');
			scriptNames.push(cleanScriptName);
		}

		// add script import at /* import script */ ... /* end of import script */ 
		await replaceContent.generateAndReplaceImportComment({
			files: scriptNames,
			start: '/* import js script */',
			end: '/* end of import js script */',
			content: `import {{CONTENT}} from './scripts/{{CONTENT}}.js';`,
			filepath: indexjsPath,
		});

		// add script call at /* call script */ ... /* end of call script */ 
		await replaceContent.generateAndReplaceImportComment({
			files: scriptNames,
			start: '/* call js script */',
			end: '/* end of call js script */',
			content: `await {{CONTENT}}(self);`,
			filepath: indexjsPath,
		});
	}
}

export default new layoutHandler()
