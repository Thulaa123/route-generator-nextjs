#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

// Parse command-line options
program
  .requiredOption('-n, --name <name>', 'Name of the page')
  .requiredOption('-r, --route <route>', 'Route path')
  .requiredOption('-p, --path <path>', 'Path to create the route under')
  .option('-l, --layout <layout>', 'Name of the layout file to create (optional)')
  .parse(process.argv);

const options = program.opts();
const { name, route, path: basePath, layout } = options;

// Convert names to PascalCase
const toPascalCase = str => str.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s+/g, '');

const pascalCaseName = toPascalCase(name);
const pascalCaseLayout = layout ? toPascalCase(layout) : null;

const isTypeScript = fs.existsSync(path.join(basePath, 'tsconfig.json'));

const pageFileName = `page.${isTypeScript ? 'tsx' : 'jsx'}`;
const layoutFileName = `layout.${isTypeScript ? 'tsx' : 'jsx'}`;
const routePath = path.join(basePath, route.replace(/^\//, '').replace(/\//g, path.sep));

// Create the page component content
const pageContent = isTypeScript
  ? `import React from 'react';

const ${pascalCaseName}: React.FC = () => {
  return (
    <div>
      <h1>${pascalCaseName}</h1>
    </div>
  );
};

export default ${pascalCaseName};
`
  : `import React from 'react';

const ${pascalCaseName} = () => {
  return (
    <div>
      <h1>${pascalCaseName}</h1>
    </div>
  );
};

export default ${pascalCaseName};
`;

// Ensure the directory exists and write the page component
fs.ensureDirSync(routePath);
fs.writeFileSync(path.join(routePath, pageFileName), pageContent);

// Create the layout file in the specified path, if provided
if (layout) {
  const layoutPath = path.join(routePath, layoutFileName);

  const layoutContent = isTypeScript
    ? `import React from 'react';

const ${pascalCaseName}: React.FC = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default ${pascalCaseName};
`
    : `import React from 'react';

const ${pascalCaseName} = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default ${pascalCaseName};
`;

  fs.writeFileSync(layoutPath, layoutContent);

  console.log(`✅ Layout created at ${layoutPath}`);
}

console.log(`✅ Route created at ${path.join(routePath, pageFileName)}`);