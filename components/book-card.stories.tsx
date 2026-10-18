import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import type { BookWithRating } from '@/lib/queries';

import { BookCard } from './book-card';

const meta: Meta<typeof BookCard> = {
  title: 'Components/BookCard',
  component: BookCard,
  // The card has no intrinsic width (the app grid sizes it), so constrain it
  // here — otherwise the card shrink-wraps to its title's max-content width.
  decorators: [(Story) => <div className="w-56"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BookCard>;

const dracula: BookWithRating = {
  id: 1,
  title: 'Dracula',
  author: 'Bram Stoker',
  year: 1897,
  description: 'The classic Gothic vampire novel.',
  coverUrl: '/covers/dracula.svg',
  gutenbergId: 345,
  gutenbergUrl: 'https://www.gutenberg.org/ebooks/345',
  avgRating: 4.3,
  reviewCount: 12,
};

const frankenstein: BookWithRating = {
  ...dracula,
  id: 2,
  title: 'Frankenstein; Or, The Modern Prometheus',
  author: 'Mary Wollstonecraft Shelley',
  year: 1818,
  coverUrl: '/covers/frankenstein.svg',
  avgRating: null,
  reviewCount: 0,
};

export const WithReviews: Story = {
  args: { book: dracula },
};

export const Unreviewed: Story = {
  args: { book: frankenstein },
};

export const Favorite: Story = {
  args: { book: dracula, isFavorite: true },
};
