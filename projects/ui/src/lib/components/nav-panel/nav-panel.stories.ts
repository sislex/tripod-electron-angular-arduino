import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {NavPanelComponent} from './nav-panel.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

const meta: Meta<NavPanelComponent> = {
  title: 'UI Components/NavPanelComponent',
  component: NavPanelComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: NavPanelComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<NavPanelComponent>;

export const Primary: Story = {
  args: {
    message: 'Our message',
  },
};
