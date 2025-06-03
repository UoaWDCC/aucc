'use client'

import type { Meta, StoryObj } from '@storybook/react'

import Map from '../components/Map/Map'

const meta: Meta<typeof Map> = {
  title: 'Components/Map',
  component: Map,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof Map>

export const TwoMarkers: Story = {
  args: {
    coordinates: [
      { latitude: -36.8485, longitude: 174.7633, label: 'Start of River' },
      { latitude: -36.86, longitude: 174.775, label: 'End of River' },
      { latitude: -36.868, longitude: 174.769 },
    ],
    className: 'h-[400px] w-[700px] rounded-xl border shadow',
  },
}
