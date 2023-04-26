import m from 'mithril';

export async function render (Component) {
  const container = document.body.children[0];

  m.redraw = () => {
    m.render(container, Component);
  };

  m.redraw();

  function findByText (text) {
    const elements = Array.from(
      container.querySelectorAll('*')
    );

    return elements.filter(
      element => {
        return element.textContent === text;
      }
    )[0];
  }

  return {
    findByText: findByText,
    container: container
  };
}

export default render;
