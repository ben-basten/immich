<script lang="ts">
  import Icon from '$lib/components/elements/icon.svelte';
  type Color = 'transparent' | 'light' | 'dark' | 'gray' | 'primary';

  export let icon: string;
  export let color: Color = 'transparent';
  export let title: string;
  export let padding = '3';
  export let size = '24';
  export let isOpacity = false;
  export let forceDark = false;
  export let hideMobile = false;
  export let iconColor = 'currentColor';
  export let buttonSize: string | undefined = undefined;

  const colorClasses: Record<Color, { backgroundColor: string; hoverColor: string }> = {
    transparent: {
      backgroundColor: 'bg-transparent',
      hoverColor: 'bg-[#d3d3d3]',
    },
    light: {
      backgroundColor: 'bg-white',
      hoverColor: 'bg-[#d3d3d3]',
    },
    dark: {
      backgroundColor: 'bg-[#202123]',
      hoverColor: 'bg-[#d3d3d3]',
    },
    gray: {
      backgroundColor: 'bg-[#d3d3d3]',
      hoverColor: 'bg-[#e2e7e9]',
    },
    primary: {
      backgroundColor: 'bg-immich-primary',
      hoverColor: 'bg-immich-primary/75',
    },
  };

  $: backgroundColor = colorClasses[color].backgroundColor;
  $: hoverColor = `hover:${colorClasses[color].hoverColor}`;
</script>

<button
  {title}
  style:width={buttonSize ? buttonSize + 'px' : ''}
  style:height={buttonSize ? buttonSize + 'px' : ''}
  class:dark:text-immich-dark-fg={!forceDark}
  class="flex place-content-center place-items-center rounded-full {backgroundColor} p-{padding} transition-all
	{isOpacity ? 'hover:bg-immich-bg/30' : `hover:dark:text-immich-dark-gray ${hoverColor}`}
  {forceDark && 'hover:text-black'}
  {hideMobile && 'hidden sm:flex'}"
  on:click
>
  <Icon path={icon} {size} ariaLabel={title} color={iconColor} />
  <slot />
</button>
