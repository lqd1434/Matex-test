import * as path from 'path';

const isDev = process.env.NODE_ENV === 'development';

export const rootDir = process.cwd();
export const appDir = __dirname;
export const resolvePath = (_path: string) => path.resolve(appDir, _path);

export const resourcesPath = process.resourcesPath;
export const loadingPath = isDev
  ? `file://${path.join(rootDir, '.')}/loading.html`
  : `file://${path.join(__dirname, '..')}/render/loading.html`;

export const preloadPath = isDev
  ? path.resolve(process.cwd(), './electron/scripts/preload.js')
  : `${path.resolve(__dirname, './preload.js')}`;

export const mainPath = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '..')}/render/index.html`;
