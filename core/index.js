import path from 'path';

import setup from './lib/setup.js';
import layoutHandler from './lib/layoutHandler.js';
import pageHandler from './lib/pageHandler.js';

const __basedir = import.meta.dirname;

const PATH_TEMPLATE_BUILD = `${__basedir}/../empty-bundle`;
const PATH_PROJECT_DATA = `${__basedir}/../project-1`;
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

		const project = await setup.loadTemplates(PATH_PROJECT_DATA);
		//console.log(JSON.stringify(project.material.libraries, null, 2));
		
		await setup.handleLibraries({ project: project, outputPath, projectPath: PATH_PROJECT_DATA });

		/*await layoutHandler.init({
			outputPath,
			templates
		});

		await pageHandler.init({
			outputPath,
			templates,
			project
		})*/
	}
}

new build();
