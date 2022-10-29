import m from 'mithril';
import routemeup from 'routemeup';

import HomePage from 'src/pages/HomePage.jsx';
import context from 'src/context.js';

const guestPages = {
  '/#/login': () => HomePage,
  '/#/register': () => HomePage,
  '/#/': () => '/#/login'
};

const authedPages = {
  '/#/login': () => '/#/',
  '/#/register': () => '/#/',
  '/#/': () => '/#/accounts',
  '/#/test': () => HomePage,
};

const navigate = () => {
  context.hash = location.hash || '/#/';

  const pages = context.session ? authedPages : guestPages;

  const route = routemeup(pages, { url: context.hash }) || {};

  context.controller = route.controller;
  context.tokens = route.tokens || {};
  context.page = context.controller ? context.controller() : NotFoundPage;

  if (typeof context.page === 'string') {
    window.location.href = context.page;
    return;
  }

  m.redraw();
};

const container = document.querySelector('#app');

m.redraw = () => {
  m.render(container, m(context.page, context));
};

window.addEventListener('hashchange', navigate);
navigate();
