import fs from 'fs';

function convert(md: string): string {
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
const md = file ? fs.readFileSync(file, 'utf8') : fs.readFileSync(0, 'utf8');
console.log(convert(md));
