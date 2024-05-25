import { shortcuts } from '$lib/actions/shortcut';
import { tick } from 'svelte';
import type { Action } from 'svelte/action';

interface Options {
  container: HTMLElement;
  activeId: string | undefined;
  selectionChanged?: (newId: string, newIndex: number) => void;
  openDropdown: () => void;
  closeDropdown: () => void;
}

export const listNavigationV2: Action<HTMLElement, Options> = (node, options: Options) => {
  const getCurrentElement = () => {
    const { container, activeId } = options;
    return container.querySelector(`#${activeId}`) as HTMLElement | null;
  };

  const moveSelection = async (direction: 'up' | 'down') => {
    const { selectionChanged, container, openDropdown } = options;
    openDropdown();

    await tick();

    const children = Array.from(container?.children);
    if (children.length === 0) {
      return;
    }

    const currentEl = getCurrentElement();
    const currentIndex = currentEl ? children.indexOf(currentEl) : -1;
    const directionFactor = (direction === 'up' ? -1 : 1) + (direction === 'up' && currentIndex === -1 ? 1 : 0);
    const newIndex = (currentIndex + directionFactor + children.length) % children.length;

    if (selectionChanged) {
      selectionChanged(children[newIndex].id, newIndex);
    }
  };

  const onEnter = () => {
    const { closeDropdown } = options;
    const currentEl = getCurrentElement();
    if (currentEl) {
      console.log('clicking');
      currentEl.click();
    }

    closeDropdown();
  };

  const onEscape = (event: KeyboardEvent) => {
    const { closeDropdown } = options;
    event.stopPropagation();
    closeDropdown();
  };

  const { destroy } = shortcuts(node, [
    { shortcut: { key: 'ArrowUp' }, onShortcut: () => moveSelection('up'), ignoreInputFields: false },
    { shortcut: { key: 'ArrowDown' }, onShortcut: () => moveSelection('down'), ignoreInputFields: false },
    { shortcut: { key: 'Enter' }, onShortcut: () => onEnter(), ignoreInputFields: false },
    { shortcut: { key: 'Escape' }, onShortcut: (event) => onEscape(event), ignoreInputFields: false },
  ]);

  return {
    update(newOptions) {
      options = newOptions;
    },
    destroy,
  };
};
