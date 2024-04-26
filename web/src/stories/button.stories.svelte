<script context="module">
  import Button from '../lib/components/elements/buttons/button.svelte';

  export const meta = {
    title: 'immich/Elements/Button',
    component: Button,
    argTypes: {
      type: {
        control: 'select',
        options: ['button', 'submit', 'reset'],
      },
      color: {
        control: 'select',
        options: [
          'primary',
          'secondary',
          'transparent-primary',
          'text-primary',
          'light-red',
          'red',
          'green',
          'gray',
          'transparent-gray',
          'dark-gray',
          'overlay-primary',
        ],
      },
      size: {
        control: 'select',
        options: ['tiny', 'icon', 'link', 'sm', 'base', 'lg'],
      },
      rounded: {
        control: 'select',
        options: ['lg', '3xl', 'full', false],
      },
      shadow: {
        control: 'select',
        options: ['md', false],
      },
      slot: {
        control: 'text',
      },
    },
    args: {
      type: 'button',
      color: 'primary',
      size: 'lg',
      rounded: 'lg',
      shadow: 'md',
      disabled: false,
      fullwidth: false,
      border: false,
      title: '',
      form: undefined,
      slot: 'Button text',
    },
  };
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <Button {...args}>{args.slot}</Button>
</Template>

<Story name="Default" />
