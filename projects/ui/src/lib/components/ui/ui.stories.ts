import type { Meta, StoryObj } from '@storybook/angular';
import { UiComponent } from './ui.component';

const meta: Meta<UiComponent> = {
  title: 'UI Components/UiComponent',
  component: UiComponent,
  render: (args: UiComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<UiComponent>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
