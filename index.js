const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

program
  .requiredOption('-n, --name <name>', 'Name of the page')
  .requiredOption('-r, --route <route>', 'Route path')
  .requiredOption('-p, --path <path>', 'Path to create the route under')
  .option('-l, --layout <layout>', 'Name of the layout file to create (optional)')
  .parse(process.argv);

const options = program.opts();
const { name, route, path: basePath, layout } = options;

// Check if tsconfig.json exists to determine if it's a TypeScript project
const isTypeScript = fs.existsSync(path.join(basePath, 'tsconfig.json'));

// Convert name to kebab-case for Next.js file naming convention
const fileName = `${name.toLowerCase().replace(/\s+/g, '-')}.${isTypeScript ? 'tsx' : 'jsx'}`;
const routePath = path.join(basePath, route.replace(/^\//, '').replace(/\//g, path.sep));

// Generate page content based on the detected type
const pageContent = isTypeScript
  ? `import React from 'react';

const ${name}Page: React.FC = () => {
  return (
    <div>
      <h1>${name} Page</h1>
    </div>
  );
};

export default ${name}Page;
`
  : `import React from 'react';

const ${name}Page = () => {
  return (
    <div>
      <h1>${name} Page</h1>
    </div>
  );
};

export default ${name}Page;
`;

// Write the page file
fs.ensureDirSync(routePath);
fs.writeFileSync(path.join(routePath, fileName), pageContent);

// Optionally create a layout file if the layout option is provided
if (layout) {
  const layoutName = layout.toLowerCase().replace(/\s+/g, '-') + (isTypeScript ? '.tsx' : '.jsx');
  const layoutPath = path.join(basePath, 'components', layoutName);

  const layoutContent = isTypeScript
    ? `import React from 'react';

const ${layout}: React.FC = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default ${layout};
`
    : `import React from 'react';

const ${layout} = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default ${layout};
`;

  fs.ensureDirSync(path.dirname(layoutPath));
  fs.writeFileSync(layoutPath, layoutContent);
  
  console.log(`✅ Layout created at ${layoutPath}`);
}

console.log(`✅ Route created at ${path.join(routePath, fileName)}`);