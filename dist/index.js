"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function convert(md) {
    let html = md;
    html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
    html = html.split('\n\n').map(b => b.startsWith('<') ? b : '<p>' + b.replace(/\n/g, ' ') + '</p>').join('\n');
    return html;
}
const file = process.argv[2];
const md = file ? fs_1.default.readFileSync(file, 'utf8') : fs_1.default.readFileSync(0, 'utf8');
console.log(convert(md));
