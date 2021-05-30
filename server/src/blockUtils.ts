export function getStartBlock(program: Document): Element {
  const xmlNode = program.firstChild;
  if (!xmlNode) {
    throw new Error('Could not find XML node');
  }

  const startBlock = Array.from(xmlNode.childNodes)
    .find(node => {
      const element = node as Element;
      return element.tagName === 'block' && element.getAttribute('type') === 'start';
    });
  if (!startBlock) {
    throw new Error('Could not find start block');
  }

  return startBlock as Element;
}

export function getNextBlock(block: Element): Element | null {
  const nextNode = Array.from(block.childNodes)
    .find(node => (node as Element).tagName === 'next');

  if (!nextNode) {
    return null;
  }

  const blockNode = Array.from(nextNode.childNodes)
    .find(node => (node as Element).tagName === 'block');

  return blockNode as Element || null;
}

export function getBlockId(block: Element): string {
  assertElementIsBlock(block);

  const id = block.getAttribute('id');
  if (!id) {
    throw new Error('element does not have an `id` attribute');
  }

  return id;
}

export function getBlockType(block: Element): string {
  assertElementIsBlock(block);

  const type = block.getAttribute('type');
  if (!type) {
    throw new Error('element does not have a `type` attribute');
  }

  return type;
}

export function stringifyBlock(block: Element): string {
  assertElementIsBlock(block);

  const attributes = Array.from(block.attributes)
    .map(attr => `${attr}`)
    .join('');

  const hasChildren = (block.childNodes.length > 0);

  if (hasChildren) {
    return `<block${attributes}> <!-- children --> </block>`;
  } else {
    return `<block${attributes} />`;
  }
}

function assertElementIsBlock(block: Element) {
  if (block.tagName !== 'block') {
    throw new TypeError('element is not a block');
  }
}
