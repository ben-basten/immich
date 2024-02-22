<script lang="ts">
  import { mdiInformationOutline } from '@mdi/js';
  import Icon from './icon.svelte';

  export let position: 'left' | 'right' = 'left';

  const tooltipId = `tooltip-${crypto.randomUUID()}`;

  let tooltipVisible = false;

  const showTooltip = () => {
    tooltipVisible = true;
  };

  const hideTooltip = () => {
    tooltipVisible = false;
  };

  const toggleTooltip = () => {
    tooltipVisible = !tooltipVisible;
  };

  const handleKeypress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape': {
        hideTooltip();
        return;
      }
    }
  };

  const getPosition = () => {
    switch (position) {
      case 'left': {
        return 'right-6 top-0';
      }
      case 'right': {
        return 'left-6 top-0';
      }
    }
  };
</script>

<div class="absolute" role="presentation" on:mouseenter={showTooltip} on:mouseleave={hideTooltip}>
  <button
    type="button"
    aria-label="More info"
    aria-describedby={tooltipId}
    on:focus={showTooltip}
    on:blur={hideTooltip}
    on:click={toggleTooltip}
    on:keydown={handleKeypress}
    class="hover:cursor-help p-2"
  >
    <Icon path={mdiInformationOutline} ariaHidden={true} class="text-gray-600 dark:text-gray-400" />
  </button>
  <div
    id={tooltipId}
    role="tooltip"
    class="{tooltipVisible
      ? 'visible'
      : 'hidden'} absolute {getPosition()} flex place-content-center place-items-center whitespace-nowrap rounded-3xl border bg-immich-bg px-6 py-3 text-xs text-immich-fg shadow-lg dark:border-immich-dark-gray dark:bg-gray-600 dark:text-immich-dark-fg"
  >
    <slot />
  </div>
</div>

<style>
  [role='tooltip'] {
    min-width: max-content;
    max-width: 10em;
  }
</style>
