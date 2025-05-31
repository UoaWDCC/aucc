import dynamic from 'next/dynamic'

export const MapComponent = dynamic(() => import('./Map'), {
  ssr: false,
})
