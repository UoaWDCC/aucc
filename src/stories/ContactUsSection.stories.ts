import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ContactUsSection } from '@/app/(frontend)/home/_components/contact-us/ContactUsSection'

const meta = {
  title: 'LookingForUsSection',
  component: ContactUsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContactUsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
