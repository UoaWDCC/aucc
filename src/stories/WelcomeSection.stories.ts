import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import WelcomeSection from '@/app/(frontend)/_components/sections/HomePage/Welcome/WelcomeSection'

const meta = {
  title: 'WelcomeSection',
  component: WelcomeSection,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof WelcomeSection>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
