const fs = require('fs');
const path = require('path');
const mustache = require('mustache');

// Function to render a Mustache template with data
const renderTemplate = (templateName, data) => {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.mustache`);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    return mustache.render(templateContent, data);
}

module.exports = { renderTemplate };
