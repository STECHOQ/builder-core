import fs from "fs/promises";
import path from 'path';
import postcss from 'postcss';

import stringFormatter from './stringFormatter.js';

class componentHandler {

	async setAll({components, outputPath, framework}){
		const self = this;

		// collect all components & flaten it 
		//const flatComponents = await self.flattenComponents(structuredClone(components));

		console.log(JSON.stringify(components, null, 2))
		return;

		await self.createComponentsDir(components, cTemplates, outputPath);

		const gridstackStructure = await self.formatToGridstack({ components, arrangements }, cTemplates);

		return gridstackStructure;
	}

	async createComponentsDir({ components, outputPath }){
		const self = this;

		for(const componentId in components){
			const component = components[componentId];

			const componentPath = path.join(outputPath, 'public', 'components', componentId);

			await fs.mkdir(componentPath, { recursive: true });

			const componentAttributes = component.attributes;

			if(component.assets){
				for(const assetName in component.assets){

					const asset = component.assets[assetName];

					const srcContent = await fs.readFile(asset, 'utf8');

					let replacedContent = srcContent;
					for(const attributeId in componentAttributes){

						const attributeValue = componentAttributes[attributeId];

						const attributeKey = new RegExp(`{{${attributeId}}}`, 'g');

						replacedContent = replacedContent.replace(
							attributeKey,
							attributeValue
						)
					};

					if(assetName.match(/\.css$/)){

						replacedContent = await self.addPrefixOnCSS({
							prefix: componentId,
							cssInput: replacedContent
						})
					}

					const destinationPath = path.join(componentPath, assetName);

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

					const tmpArrangement = {};
					tmpArrangement[child] = null;

					const { structures, totalComponents } = await self.formatToGridstack({ components, arrangements: tmpArrangement }, cTemplates);
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

	async prepareComponents({ project, outputPath }){
		const self = this;

		const components = await self.loadComponents(project);

		// flatten list components 
		const copyComponents = structuredClone(components);

		const flatComponents = await self.flatComponents(copyComponents);
		const inheritComponents = await self.inheritComponents(flatComponents);

		const pageComponents = await self.getPageComponents(inheritComponents);

		const frameworkComponents = await self.setFrameworkComponents({
			components: pageComponents,
			project: project
		})

		const valueComponents = await self.setComponentValue(pageComponents);

		await self.createComponentsDir({
			components: valueComponents, 
			outputPath,
		});

		return {
			raw: copyComponents,
			inheritComponents
		}
	}

	async setComponentValue(rawComponents){
		const self = this;

		const components = structuredClone(rawComponents);

		for(const componentId in components){
			const component = components[componentId];

			const componentAttributes = {'ID': { value: componentId, type: 'string' }};
			Object.assign(component.attributes, componentAttributes);

			for(const componentId in components){

				for(const attrId in components[componentId].attributes){
					const attr = components[componentId].attributes[attrId];

					if(typeof attr !== 'object') continue;

					let value = attr.value ?? attr.default;

					switch(attr.type){
						case 'string': {
						}; break;

						case 'select': {
							const optionValue = attr.options[attr.value];
							value = optionValue;
						}; break;

						default: {
						}; break;
					}

					components[componentId].attributes[attrId] = value;
				}
			}
		}

		return components
	}

	async getPageComponents(components){
		const self = this;

		const result = {};

		for(const componentId in components){
			const component = components[componentId];

			if(component.pageId){
				result[componentId] = component;
			}
		}

		return result;
	}

	async setFrameworkComponents({ components, project }){
		const self = this;

		const projectFramework = project.framework;

		for(const pageId in project.pages){
			const page = project.pages[pageId];
			const pageFramework = page.framework;

			for(const componentId in components){
				const component = components[componentId];

				if(component.pageId == pageId){
					const value = component.attributes.FRAMEWORK_ATTRIBUTES.value;
					const defaultValue = component.attributes.FRAMEWORK_ATTRIBUTES.default;

					if(!value){
						component.attributes.FRAMEWORK_ATTRIBUTES.value = 
							pageFramework ||
							projectFramework ||
							defaultValue;
					}
				}
			}
		}

		return components;
	}

	async loadComponents(project){
		const self = this;

		const components = {};

		// load components inside material
		for(const componentId in project.material.components){
			const component = project.material.components[componentId];

			components[componentId] = component["schema.json"];
			components[componentId].assets = {};

			for(const attr in component){
				if(attr == "schema.json") continue;

				components[componentId].assets[attr] = component[attr];
			}
		}

		// load component inside page
		for(const pageId in project.pages){
			const page = project.pages[pageId];

			const pageComponents = structuredClone(page["schema.json"]?.components || {});

			for(const componentId in pageComponents){
				const component = pageComponents[componentId];

				Object.assign(component, {
					pageId
				});
			}

			Object.assign(components, pageComponents);
		}

		return components;
	}

	async flatComponents(components, pageId){
		const self = this;

		const flatComponents = {};

		for(const componentId in components){
			const component = components[componentId];

			const children = component?.children;

			if(pageId){
				component.pageId = pageId;
			}

			if(children){
				const parentPageId = component.pageId;
				const childComponents = await self.flatComponents(children, parentPageId);
				delete component.children;

				Object.assign(flatComponents, childComponents);
			}
		}

		Object.assign(flatComponents, components);

		return flatComponents;
	}

	async inheritComponents(flatComponents){
		const self = this;

		const inheritComponents = {};

		for(const componentId in flatComponents){
			const component = await self.findParentAttribute(flatComponents, componentId);
			inheritComponents[componentId] = component;
		}

		return structuredClone(inheritComponents);

	}

	async findParentAttribute(components, componentId){
		const self = this;

		let component = components[componentId]
		const templateId = component.templateId;

		if(templateId){
			const parentAttrs = await self.findParentAttribute(components, templateId)

			for(const attr in parentAttrs){
				const parentValue = parentAttrs[attr];

				if(component[attr] === undefined){
					component[attr] = parentValue;
				}
			}

			const options = {nonEnum:true, symbols:true, descriptors: true, proto:true};
			component = self.deepAssign(options)(component, parentAttrs);
		}

		return component;
	}

	// Source - https://stackoverflow.com/a/48579540
	// Posted by RaphaMex, modified by community. See post 'Timeline' for change history
	// Retrieved 2026-02-09, License - CC BY-SA 3.0
	toType(a) {
    	return ({}).toString.call(a).match(/([a-z]+)(:?\])/i)[1];
	}

	isDeepObject(obj) {
		const self = this;

    	// Choose which types require we look deeper into (object, array, string...)
    	return "Object" === self.toType(obj);
	}

	deepAssign(options) {
		const self = this;
    	return function deepAssignWithOptions (target, ...sources) {
        	sources.forEach( (source) => {

            	if (!self.isDeepObject(source) || !self.isDeepObject(target))
                	return;

            	// Copy source's own properties into target's own properties
            	function copyProperty(property) {
                	const descriptor = Object.getOwnPropertyDescriptor(source, property);
                	//default: omit non-enumerable properties
                	if (descriptor.enumerable || options.nonEnum) {
                    	// Copy in-depth first
                    	if (self.isDeepObject(source[property]) && self.isDeepObject(target[property]))
                        	descriptor.value = self.deepAssign(options)(target[property], source[property]);
                    	//default: omit descriptors
                    	if (options.descriptors)
                        	Object.defineProperty(target, property, descriptor); // shallow copy descriptor
                    	else
                        	target[property] = descriptor.value; // shallow copy value only
                	}
            	}

            	// Copy string-keyed properties
            	Object.getOwnPropertyNames(source).forEach(copyProperty);

            	//default: omit symbol-keyed properties
            	if (options.symbols)
                	Object.getOwnPropertySymbols(source).forEach(copyProperty);

            	//default: omit prototype's own properties
            	if (options.proto)
                	// Copy souce prototype's own properties into target prototype's own properties
                	self.deepAssign(Object.assign({},options,{proto:false})) (// Prevent deeper copy of the prototype chain
                    	Object.getPrototypeOf(target),
                    	Object.getPrototypeOf(source)
                	);

        	});
        	return target;
    	}
	}
}

export default new componentHandler();
