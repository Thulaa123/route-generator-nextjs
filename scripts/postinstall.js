const fs = require('fs-extra');
const path = require('path');

// Get the path to the project's package.json
const projectPackageJsonPath = path.join(process.cwd(), 'package.json');

try {
    // Read the project's package.json
    const projectPackageJson = fs.readJsonSync(projectPackageJsonPath);

    // Add the generate-route script if it doesn't exist
    if (!projectPackageJson.scripts) {
        projectPackageJson.scripts = {};
    }

    if (!projectPackageJson.scripts['generate-route']) {
        projectPackageJson.scripts['generate-route'] = 'route-generator-nextjs';
    }

    // Write the updated package.json back to disk
    fs.writeJsonSync(projectPackageJsonPath, projectPackageJson, { spaces: 2 });

    console.log('Added "generate-route" script to package.json');
} catch (err) {
    console.error('Error updating package.json:', err);
}
