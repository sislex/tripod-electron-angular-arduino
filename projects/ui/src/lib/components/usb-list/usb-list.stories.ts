import {componentWrapperDecorator, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {UsbListComponent} from './usb-list.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

const meta: Meta<UsbListComponent> = {
  title: 'UI Components/UsbListComponent',
  component: UsbListComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule],
    }),
    componentWrapperDecorator(
      (story) => `<div>${story}</div>`
    ),
  ],
  render: (args: UsbListComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<UsbListComponent>;

export const Primary: Story = {
  args: {
    usbList: [
      '/dev/tty.Buds2ProAlexey',
      '/dev/tty.Bluetooth-Incoming-Port',
    ],
  },
};
