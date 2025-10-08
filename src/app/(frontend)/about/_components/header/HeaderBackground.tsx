import { HeaderImage } from './HeaderImage'

export function HeaderBackground() {
  return (
    <div className="w-full">
      <div className="relative h-full w-full">
        <HeaderImage />
      </div>

      <div className="w-full -translate-y-29 transform">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 491"
          className="h-auto w-full"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-8 31.9354C464.723 195.898 966.47 -67.7185 1310 17.3953V491H-8V31.9354Z"
            fill="#EFEFE1"
          />
        </svg>
      </div>
    </div>
  )
}
