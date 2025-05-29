import type { Meta, StoryObj } from '@storybook/react'

import { IntroSectionBackground } from '@/app/(frontend)/_components/sections/HomePage/Intro/IntroSectionBackground'

const meta = {
  title: 'WelcomeSectionBackground',
  component: IntroSectionBackground,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof IntroSectionBackground>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  parameters: {},
}
