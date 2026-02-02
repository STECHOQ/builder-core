import fs from "fs/promises";
import path from 'path';
import postcss from 'postcss';

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

					if(cTemplateFile.match(/\.css$/)){

						replacedContent = await self.addPrefixOnCSS({
							prefix: componentId,
							cssInput: replacedContent
						})
					}

					const destinationPath = path.join(componentPath, cTemplateFile);

					await fs.writeFile(destinationPath, replacedContent, 'utf8');
				}
			}
		}
	}

	async addPrefixOnCSS({ prefix, cssInput }){
		const self = this;

		const prefixPlugin = () => {
  			return {
    			postcssPlugin: 'postcss-prefixer',
    			Once(root) {
    				// Create the empty "prefix {}" at the top 
    				const wrapper = postcss.rule({ selector: prefix });
    				root.prepend(wrapper);
    			},
    			Rule(rule) {
      				// Check if the rule is inside an @keyframes block
      				if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') {
        				return;
      				}

      				// Ignore Global At-Rules (@font-face, @import, etc.)
      				// Note: We ALLOW @media and @supports because we WANT to prefix rules inside them
      				if (rule.parent?.type === 'atrule' && !['media', 'supports'].includes(rule.parent.name)) {
        				return;
      				}

      				// Handle :root, html, and body
      				// We often want to turn these INTO the prefix itself, or just skip them
      				rule.selectors = rule.selectors.map(sel => {
        				if (sel === ':root' || sel === 'html' || sel === 'body') {
          					return sel; // Keep as is, or return prefix if you want to scope globals
        				}
        				if (sel === prefix) return sel;

        				return `${prefix} ${sel}`;
      				});
    			},
  			};
		};

		const result = await postcss([prefixPlugin()]).process(cssInput, { from: undefined });

		return result.css;
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
