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

export function getFieldValue(block: Element, fieldName: string): string {
  assertElementIsBlock(block);

  const fieldNode = Array.from(block.childNodes)
    .find(node => {
      const element = node as Element;
      return element.tagName === 'field' && element.getAttribute('name') === fieldName;
    });

  if (!fieldNode) {
    throw new Error(`Block has no field with name ${fieldName}`);
  }

  const fieldChildText = fieldNode.firstChild;
  if (!fieldChildText) {
    throw new Error(`Block's ${fieldName} field is missing a value`);
  }

  return fieldChildText.nodeValue || '';
}

export function getNestedValue(block: Element, valueName: string): Element | null {
  assertElementIsBlock(block);

  const valueNode = Array.from(block.childNodes)
    .find(node => {
      const element = node as Element;
      return element.tagName === 'value' && element.getAttribute('name') === valueName;
    });

  if (!valueNode) {
    return null;
  }

  const nestedBlock = Array.from(valueNode.childNodes)
    .find(node => {
      const element = node as Element;
      return element.tagName === 'block';
    });
  if (!nestedBlock) {
    throw new Error(`Block has a value ${valueName} but no nested block`);
  }

  return nestedBlock as Element;
}

export function getNestedStatement(block: Element, statementName: string): Element | null {
  assertElementIsBlock(block);

  const statementNode = Array.from(block.childNodes)
    .find(node => {
      const element = node as Element;
      return element.tagName === 'statement' && element.getAttribute('name') === statementName;
    });

  if (!statementNode) {
    return null;
  }

  const nestedBlock = Array.from(statementNode.childNodes)
    .find(node => {
      const element = node as Element;
      return element.tagName === 'block';
    });
  if (!nestedBlock) {
    throw new Error(`Block has a value ${statementName} but no nested block`);
  }

  return nestedBlock as Element;
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
