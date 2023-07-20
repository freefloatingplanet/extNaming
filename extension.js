// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const axios = require('axios');
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "extnaming" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-naming.naming', async () => {
		// The code you place here will be executed every time your command is executed
		//const omikujiCandidates = ['大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶'];
		const searchWord = await vscode.window.showInputBox({
			title: '検索キーワード'
		});

		let searchResult = [];
		try {
			let url = 'http://localhost:8081/Naming/SearchName';
			const response = await axios.get(url, {
				params:{
					"keyword": searchWord
				}
			});
			searchResult = response.data.data.map((dt) => dt['物理名']);

		} catch (error) {
			vscode.window.showInformationMessage(error);
			return;
		}
//		const omikujiCandidates = response.data.data.filter((dt) => {
//			return dt['論理名'];
//		})

		if(searchResult.length === 0){
			vscode.window.showInformationMessage('検索結果0件');
			return;
		}
		const result = await vscode.window.showQuickPick(searchResult);
		// Display a message box to the user
		//vscode.window.showInformationMessage(`${searchWord}`);
		//vscode.window.showInformationMessage(`Got: ${result}`);
		const editor = vscode.window.activeTextEditor;
		// カーソル位置に選択した文字列を挿入する
		if(editor){

			editor.edit((editBuilder) => {
				editBuilder.insert(
					editor.selection.active,
					result
				)
			});
		}
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('vscode-metrics.metrics', async () => {


		let aaa = vscode.workspace.workspaceFile;

		// The code you place here will be executed every time your command is executed
		const searchWord = await vscode.window.showInputBox({
			title: '検索キーワード'
		});

		let searchResult = [];
		try {
			let url = 'http://localhost:8081/Naming/SearchName';
			const response = await axios.get(url, {
				params:{
					"keyword": searchWord
				}
			});
			searchResult = response.data.data.map((dt) => dt['物理名']);

		} catch (error) {
			vscode.window.showInformationMessage(error);
			return;
		}
//		const omikujiCandidates = response.data.data.filter((dt) => {
//			return dt['論理名'];
//		})

		if(searchResult.length === 0){
			vscode.window.showInformationMessage('検索結果0件');
			return;
		}
		const result = await vscode.window.showQuickPick(searchResult);
		// Display a message box to the user
		//vscode.window.showInformationMessage(`${searchWord}`);
		//vscode.window.showInformationMessage(`Got: ${result}`);
		const editor = vscode.window.activeTextEditor;
		// カーソル位置に選択した文字列を挿入する
		if(editor){

			editor.edit((editBuilder) => {
				editBuilder.insert(
					editor.selection.active,
					result
				)
			});
		}
	});

	context.subscriptions.push(disposable);
}




// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
