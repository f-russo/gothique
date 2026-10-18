import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LoginForm } from './login-form';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
