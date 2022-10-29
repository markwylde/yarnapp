import fs from 'fs';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

export async function load (specifier, context, nextResolve) {
  if (specifier.endsWith('.jsx')) {
    const pathname = fileURLToPath(specifier);
    const contents = fs.readFileSync(pathname, 'utf8');

    const result = await esbuild.transform(contents, {
      loader: 'jsx',
      jsxFactory: 'm',
      jsxFragment: '"["'
    });

    return nextResolve(specifier, {
      ...context,
      format: 'module',
      source: result.code
    });
  }

  return nextResolve(specifier, context, nextResolve);
}
