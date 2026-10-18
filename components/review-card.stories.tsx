import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { ReviewWithAuthor } from '@/lib/queries';

import { ReviewCard } from './review-card';

const meta: Meta<typeof ReviewCard> = {
  title: 'Components/ReviewCard',
  component: ReviewCard,
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

const review: ReviewWithAuthor = {
  id: 1,
  rating: 4,
  text: 'A haunting descent into obsession. The epistolary form gives it an eerie, documentary quality that no adaptation has quite recaptured.',
  createdAt: new Date('2025-01-15T12:00:00Z'),
  updatedAt: new Date('2025-01-15T12:00:00Z'),
  userId: 'user-1',
  authorName: 'Mina Murray',
};

export const OtherReviewer: Story = {
  args: { review, isOwn: false },
};

export const OwnReview: Story = {
  args: { review, isOwn: true },
};
