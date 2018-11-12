'use strict';
import * as vscode from 'vscode';
import * as https from 'https';
import { readFile, readFileSync } from 'fs';
import { resolve } from 'path';

export function activate(context: vscode.ExtensionContext) {

    console.log('GTHubIpsum is active!')
    let disposable = vscode.commands.registerCommand("extension.gthubsum",() => {
        const editor = vscode.window.activeTextEditor;
        let quotes = JSON.parse(readFileSync(__dirname.split("\\out")[0] + "/src/quotes.json", 'utf8'));
        let text: string = '';
        let last: string = '';
        while (text.split(' ').length < 50) {
            let quote: string = quotes.arr[Math.floor(Math.random() * quotes.arr.length)]
            if (last != quote) {
                last = quote;
                text += ', ' + quote;
            }
        } 

        editor.edit(eb => {
            eb.insert(editor.selection.active, text.substring(2));
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}


/**/