'use client'

import type { Meta, StoryObj } from '@storybook/react'

import Map from '../app/(frontend)/_components/Map/Map'

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
    riverStart: [-36.8485, 174.7633],
    riverEnd: [-36.85, 174.765],
    zoom: 13,
  },
}
