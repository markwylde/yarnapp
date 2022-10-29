import 'tests/helpers/fakebrowser.js';

import m from 'mithril';
import createTestSuite from 'just-tap';
import render from 'tests/helpers/render.jsx';
import HomePage from 'src/pages/HomePage.jsx';

const { test, run } = createTestSuite();

test('App - has header', async t => {
  t.plan(1);

  const { findByText } = await render(<HomePage />);

  await t.waitFor(() => {
    t.ok(findByText('Hi'));
  }, 500);
});

run();
