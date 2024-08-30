# 🚀 Route Generator for Next.js

Welcome to the **Route Generator for Next.js**! 🎉 This npm package makes it easy to create Next.js routes with a single command.

## 🔧 Installation

To get started, install the package in your Next.js project:

```
npm install --save-dev route-generator-nextjs
```

Next add the command to your project ```scripts``` section on the ```package.json``` 

```
"generate-route": "route-generator-nextjs"
```

## 📜 Usage

After installation, you can use the generate-route script to quickly generate routes.

## Generating a Route

Run the following command to create a new route:

```
npm run generate-route -- -n "Page Name" -r "/page-route" -p "path/to/folder" -l "LayoutName"
```

## Options:

- `-n, --name <name>`: The name of the page component (e.g., "My New Page").
- `-r, --route <route>`: The route path (e.g., "/my-new-page").
- `-p, --path <path>`: The folder path where the route should be created (e.g., "src/pages").
- `-l, --layout <layout>`: Optional. The name of the layout file (e.g., "MainLayout").

## Example
Generate a page component with a layout:

```
npm run generate-route -- -n "My New Page" -r "/my-new-page" -p "src/pages" -l "MainLayout"
```

This will create:

- A page component at `src/pages/my-new-page/page.tsx` (or `.jsx`).
- A layout file at `src/pages/my-new-page/layout.tsx` (or `.jsx`).
