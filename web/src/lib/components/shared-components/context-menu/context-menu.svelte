<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { clickOutside } from '$lib/actions/click-outside';
  import { listNavigationV2 } from '$lib/actions/list-navigation-v2';
  import { getContextMenuPosition } from '$lib/utils/context-menu';
  import { focusOutside } from '$lib/actions/focus-outside';

  export let direction: 'left' | 'right' = 'right';
  export let x = 0;
  export let y = 0;

  export let menuElement: HTMLDivElement | undefined = undefined;

  let itemContainer: HTMLUListElement;
  let left: number;
  let top: number;
  let activeId: string | undefined = undefined;
  let isVisible = false;

  // We need to bind clientHeight since the bounding box may return a height
  // of zero when starting the 'slide' animation.
  let height: number;

  $: {
    if (menuElement) {
      const rect = menuElement.getBoundingClientRect();
      const directionWidth = direction === 'left' ? rect.width : 0;
      const menuHeight = Math.min(menuElement.clientHeight, height) || 0;

      left = Math.min(window.innerWidth - rect.width, x - directionWidth);
      top = Math.min(window.innerHeight - menuHeight, y);
    }
  }
</script>

<div use:focusOutside={{ onFocusOut: () => (isVisible = false) }}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    use:listNavigationV2={{
      container: itemContainer,
      activeId,
      selectionChanged: (id, _) => {
        activeId = id;
      },
      openDropdown: (event) => {
        // @ts-expect-error test
        const position = getContextMenuPosition(event, 'top-right');
        x = position.x;
        y = position.y;
        isVisible = true;
      },
      closeDropdown: () => {
        isVisible = false;
      },
    }}
    on:click={(_) => {
      isVisible = !isVisible;
    }}
  >
    <slot name="menu-button" />
  </div>
  <div
    bind:this={menuElement}
    bind:clientHeight={height}
    class="absolute z-10 min-w-[200px] w-max max-w-[300px] overflow-hidden rounded-lg shadow-lg"
    style:top="{top}px"
    style:left="{left}px"
    role="menu"
    use:clickOutside={{
      onOutclick: () => {
        isVisible = false;
        activeId = undefined;
      },
    }}
    on:outclick
    on:escape
  >
    <ul
      bind:this={itemContainer}
      class="flex flex-col rounded-lg transition-all duration-300 ease-in-out"
      class:max-h-0={!isVisible}
      class:max-h-[100vh]={isVisible}
      role="menu"
      aria-activedescendant={activeId}
      tabindex="-1"
      transition:slide={{ duration: 250, easing: quintOut }}
    >
      <slot />
    </ul>
  </div>
</div>
