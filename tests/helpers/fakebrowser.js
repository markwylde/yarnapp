import { parseHTML } from 'linkedom';

const dom = parseHTML(`
<!doctype html><html lang="en"><head></head><body>
    <app></app>
</body></html>
`);

global.window = dom.window;
global.document = dom.document;
