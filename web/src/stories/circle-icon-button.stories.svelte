<script context="module" lang="ts">
  import CircleIconButton from '../lib/components/elements/buttons/circle-icon-button.svelte';
  import { mdiInformation } from '@mdi/js';

  export const meta = {
    title: 'immich/Elements/Circle Icon Button',
    component: CircleIconButton,
    argTypes: {
      title: {
        control: 'text',
      },
      backgroundColor: {
        control: 'color',
      },
      hoverColor: {
        control: 'color',
      },
      padding: {
        control: 'number',
      },
      size: {
        control: 'number',
      },
      iconColor: {
        control: 'color',
      },
    },
    args: {
      icon: mdiInformation,
      hoverColor: '#e2e7e9',
      title: 'Information',
      padding: 3,
      size: 24,
      isOpacity: false,
      forceDark: false,
      hideMobile: false,
    },
  };
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <CircleIconButton {...args} />
</Template>

<Story name="Default" />
