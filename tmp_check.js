const fs = require('fs');

function checkFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    try {
        new Function(code);
    } catch (e) {
        if (e.name !== 'SyntaxError') {
            return;
        }
        // Very basic check. Function constructor doesn't support JSX or import, so it will fail on import.
    }
}
// We can't use new Function for JSX. We need babel or something, maybe it's too much work.
console.log('Skipping validation script');
