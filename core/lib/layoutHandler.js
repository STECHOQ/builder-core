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

				const { indexjsPath, newLayoutPath } = await self.prepareLayoutDir(layoutId, outputPath, layoutTemplatePath);

				await replaceContent.handleScript(newLayoutPath, layout, indexjsPath);

				const componentStructure = await componentHandler.setAll(layout["schema.json"], outputPath, cTemplates);
				await replaceContent.insertComponents(componentStructure, indexjsPath);
			}
		}

		// delete LayoutTemplate
		await fs.rm(
			layoutTemplatePath,
			{ recursive: true, force: true }
		);
	}

	async prepareLayoutDir(layoutId, outputPath, layoutTemplatePath){
		const self = this;

		const layoutName = 'Layout ' + layoutId;
		const capitalLayoutName = stringFormatter.capitalizeFirstLetter(layoutName);
		const kebabLayoutName = stringFormatter.toKebabCase(capitalLayoutName);

		// copy LayoutTemplate and rename the name		
		const newLayoutPath = path.join(outputPath, 'src', 'layouts', capitalLayoutName);
		await fs.cp(layoutTemplatePath, newLayoutPath, { recursive: true, force: true });

		const indexjsPath = path.join(newLayoutPath, 'index.js');

		return { indexjsPath, newLayoutPath };
	}
}

export default new layoutHandler()
