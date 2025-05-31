import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { IntroSection } from '@/app/(frontend)/_components/home/intro/IntroSection'

const meta = {
  title: 'WelcomeSection',
  component: IntroSection,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof IntroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
