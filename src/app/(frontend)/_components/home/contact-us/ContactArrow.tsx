import { cn } from '@/lib/utils/cn'

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="104"
      height="51"
      viewBox="0 0 104 51"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.7654 43.9506C3.51403 45.9942 4.34775 47.1957 6.27904 48.4027C8.92468 50.0563 7.37177 47.2458 6.28782 45.9398C5.093 44.5003 3.5869 43.2271 2.43407 41.8856C2.02899 41.4142 3.92405 40.3557 4.25868 39.8203C4.54842 39.3568 8.25843 36.4724 6.30118 37.1894"
        stroke="#EFEFE1"
        strokeLinecap="round"
      />
      <path
        d="M95.3096 1.49402C96.0599 1.50013 98.9104 8.24934 99.3205 9.29347C100.732 12.8871 101.974 17.2775 101.399 21.194C100.196 29.3797 92.41 38.4206 84.071 39.9817C80.9822 40.56 77.5119 41.2445 74.9401 38.9807C72.9787 37.2543 72.1124 32.5557 71.7765 30.0776C71.0388 24.635 71.9813 17.6522 78.3915 16.9039C82.608 16.4117 82.8636 22.3811 81.8105 25.2892C79.6926 31.1375 78.3915 33.3699 68 38.9807C55 46 46.2486 44.6941 34 46C26.3404 46.8166 11.3502 44.1523 4.27306 40.5414"
        stroke="#EFEFE1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ContactArrow({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <Arrow className="w-14 stroke-[5px] md:w-24 md:stroke-3" />
      <div className="font-handwritten text-algae absolute -top-3 -right-14 rotate-[8deg] text-lg whitespace-nowrap md:-top-7">
        find us here!
      </div>
    </div>
  )
}
