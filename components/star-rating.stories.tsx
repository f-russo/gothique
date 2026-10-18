import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { StarRating } from './star-rating';

const meta: Meta<typeof StarRating> = {
  title: 'Components/StarRating',
  component: StarRating,
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Full: Story = {
  args: { value: 5 },
};

export const Partial: Story = {
  args: { value: 3.6 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const AllValues: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <div key={v} className="flex items-center gap-3">
          <StarRating value={v} />
          <span className="text-xs text-muted-foreground">{v}.0</span>
        </div>
      ))}
    </div>
  ),
};
