'use strict';
import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import { quote } from './quotes';

export function activate(context: vscode.ExtensionContext) {

    console.log('GTHubIpsum is active!')
    let disposable = vscode.commands.registerCommand("extension.gthubsum",() => {
        const editor = vscode.window.activeTextEditor;
        let quotes = quote();
        let text: string = '';
        let last: string = '';
        while (text.split(' ').length < 50) {
            let quote: string = quotes[Math.floor(Math.random() * quotes.length)]
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
