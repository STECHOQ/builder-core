import fs from "fs/promises";
import path from 'path';

import stringFormatter from './stringFormatter.js';

class componentHandler {

	async setAll({ components, arrangements }, outputPath, cTemplates){
		const self = this;

		await self.createComponentsDir(components, cTemplates, outputPath);

		const gridstackStructure = await self.formatToGridstack({ components, arrangements }, cTemplates);

		return gridstackStructure;
	}

	async createComponentsDir(components, cTemplates, outputPath){
		const self = this;

		for(const componentId in components){
			const component = components[componentId];
			const componentName = stringFormatter.capitalizeFirstLetter(componentId);
			const componentPath = path.join(outputPath, 'public', 'components', componentName);

			await fs.mkdir(componentPath, { recursive: true });

			const componentAttributes = Object.assign({'ID': componentId}, component.attributes);

			for(const cTemplateId in cTemplates){

				if(cTemplateId !== component.templateId) continue;

				for(const cTemplateFile in cTemplates[cTemplateId]){

					if(cTemplateFile == "schema.json") continue;

					const cTemplate = cTemplates[cTemplateId][cTemplateFile];

					const srcContent = await fs.readFile(cTemplate, 'utf8');

					let replacedContent = srcContent;
					for(const attributeId in componentAttributes){

						const attributeValue = componentAttributes[attributeId];
						const attributeKey = new RegExp(`{{${attributeId}}}`, 'g');

						replacedContent = replacedContent.replace(
							attributeKey,
							attributeValue
						)
					};

					const destinationPath = path.join(componentPath, cTemplateFile);

					await fs.writeFile(destinationPath, replacedContent, 'utf8');
				}
			}
		}
	}

	async formatToGridstack({ components, arrangements }, cTemplates){
		const self = this;

		const result = [];

		let formattedArrangement = {};
		if(Array.isArray(arrangements)){
			for(const componentId of arrangements){
				formattedArrangement[componentId] = null;
			}
		}else{
			formattedArrangement = arrangements;
		}

		let _totalComponents = 0;
		for(const componentId in formattedArrangement){
			const content = formattedArrangement[componentId];

			_totalComponents++;

			let templateGridstack = {};
			for(const cTemplateId in cTemplates){

				if(cTemplateId == components[componentId].templateId){
					templateGridstack = cTemplates[cTemplateId]['schema.json'].gridstack;
					break;
				}
			}

			const componentGridstack = Object.assign(
				structuredClone(templateGridstack),
				components[componentId].gridstack
			);

			const componentDetail = Object.assign({
				content: componentId
			}, componentGridstack);

			const hasChildren = Array.isArray(content);

			if(hasChildren){

				const childResults = {
					subGridOpts: {
						children: []
					}
				};

				for(const child of content){
					const { structures, totalComponents } = await self.formatToGridstack({ components, arrangements: content }, cTemplates);
					childResults.subGridOpts.children.push(...structures);
					_totalComponents += totalComponents;
				}

				Object.assign(componentDetail, childResults);
			}

			result.push(componentDetail);
		}

		return {
			structures: result,
			totalComponents: _totalComponents,
		};
	}
}

export default new componentHandler();
