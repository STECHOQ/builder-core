import fs from 'fs';
import path from 'path';

class replaceContent {

	async generateAndReplaceImportComment({ files, start, end, content, filepath }){
		const self = this;

		const generated = await self.generateImportComment({ files, start, end, content });	
		await self.replaceImportComment({ filepath, newTexts: generated, start, end });
	}

	async replaceImportComment({ filepath, newTexts, start, end }){
		const self = this;

		// delete current import text
		const deleteResult = await self.deleteLine(filepath, start, end);
		if(!deleteResult.status){
			console.log(deleteResult.error);
			return deleteResult;
		}
		
		// add new import text
		const wrappedText = await self.addIndent(newTexts, deleteResult.data.indent);
		const addResult = await self.addLine(filepath, wrappedText, deleteResult.data.firstLine);
		if(!addResult.status){
			console.log(addResult.error);
			return addResult;
		}

		return { status: true };
	}

	async generateImportComment({ files, start, end, content }){

		let texts = start + '\n';
		for(let file of files){
			const formattedContent = content.replace(/{{CONTENT}}/g, file) + '\n';
			texts += formattedContent;
		}
		texts += end + '\n';

		return texts;
	}

	async deleteLine(fileName, firstKeyword, lastKeyword){
		return new Promise(async (resolve) => {
			await fs.readFile(fileName, 'utf8', (err, data) => {

				const lines = data.split('\n');
				let newTexts = data;
				let currentLine = 0;
				let firstFoundLine = 0;
				let indent = '';

				let step = 0; // 1 = firstKeyword found, 2 = lastKeyword found

				for(let line of lines){

					currentLine++;

					if(line.includes(firstKeyword)){
						const indentMatch = line.match(/^(.*?)\<\!\-\-/);
						if(indentMatch?.length > 1){
							indent = indentMatch[1];
						}

						firstFoundLine = currentLine - 1;
						step = 1;
					}

					if(step == 1){
						newTexts = newTexts.replace(`${line}\n`, '');
					}

					if(line.includes(lastKeyword)){
						step = 2;
						break;
					}
				}

				if(step != 2){
					return resolve({
						status: false,
						error: "please don't update css & js import comment at index.html"
					})
				}

				fs.writeFile(fileName, newTexts, 'utf-8', (err, data) => {
					return resolve({
						status: true,
						data: { fileName, newTexts, firstLine: firstFoundLine, indent }
					});
				})
			})
		})
		.catch(err => {
			return {
				status: false,
				error: err
			}
		})
	}

	prependToEachLineExceptLast(input, prefix) {
  		const lines = input.split('\n');
  		return lines
    		.map((line, idx) => idx === lines.length - 1 ? line : prefix + line)
    		.join('\n');
	}

	async addIndent(collected, indent){
		const self = this;

		return self.prependToEachLineExceptLast(collected, indent);
	}

	async addLine(fileName, newText, insertedLine){
		const self = this;

		return new Promise((resolve) => {
			fs.readFile(fileName, 'utf8', (err, data) => {

				let __lines = data.split('\n');
				let lines = __lines.map((line, index) => index < __lines.length - 1 ? `${line}\n` : line);

				lines.splice(insertedLine, 0, newText);
				const newTexts = lines.join('');

				fs.writeFile(fileName, newTexts, 'utf-8', (err, data) => {
					return resolve({
						status: true,
						data: { fileName, newTexts }
					});
				})

			})
		})
		.catch(err => {
			return {
				status: false,
				error: err
			}
		})
	}
}

export default new replaceContent()
