import path from 'path';

import setup from './lib/setup.js';
import layoutHandler from './lib/layoutHandler.js';

const __basedir = import.meta.dirname;

const PATH_TEMPLATE_BUILD = `${__basedir}/../new-template-bundle`;
const PATH_PROJECT_DATA = `${__basedir}/../project-1`;
const PATH_TEMPLATES = `${__basedir}/../templates`;
const PATH_OUTPUTS = `${__basedir}/../outputs`;

const PATH_ROOT = path.join(__basedir, '..');

class build {
	constructor(){
		const self = this;

		self.init();
	}

	async init(){
		const self = this;

		const outputPath = await setup.createTmpDir(PATH_OUTPUTS, PATH_TEMPLATE_BUILD);

		const templates = await setup.loadTemplates(PATH_TEMPLATES);
		//console.log(JSON.stringify(templates, null, 2));
		
		await setup.handleLibraries({ templates, outputPath });

		await layoutHandler.init({
			outputPath,
			templates
		});
		
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
	}
}

new build();
