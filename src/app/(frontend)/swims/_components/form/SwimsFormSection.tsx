import { SwimsLogForm } from './SwimsLogForm'

export function SwimsFormSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative bg-[#66989F] pt-6 pb-16 md:pt-12 md:pb-28">
        <p className="max-w-[18rem] px-6 text-center text-[10px] font-light text-[#EFEFE1] italic sm:max-w-md sm:pl-12 sm:text-sm md:max-w-xl md:pl-20 md:text-base">
          Record the details of your swim here! We&apos;d love to hear about
          your experience!
        </p>

        <div className="absolute bottom-0 z-1 w-full translate-y-0.5">
          <svg
            viewBox="0 0 1279 88"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="h-10 w-full fill-[#78ADAE] md:h-20"
          >
            <path d="M1279 30C900 92 420 -12 0 34V88H1279V30Z" />
          </svg>
        </div>
      </div>

      <div className="relative bg-[#78ADAE] pb-24 md:pb-32">
        <svg
          viewBox="0 0 1279 300"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[90%] w-full fill-[#EFEFE1]"
        >
          <path d="M0 60C300 34 600 92 1279 56V246C600 282 300 224 0 250Z" />
        </svg>

        <svg
          viewBox="0 0 1279 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full fill-[#89ACAD] md:h-72"
        >
          <path d="M0 58C300 38 700 74 1279 48V120H0V58Z" />
        </svg>

        <div className="relative z-10 flex -translate-x-8 -translate-y-14 justify-center md:-translate-x-16 md:-translate-y-20">
          <svg
            viewBox="0 0 100 130"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
            className="h-28 w-24 text-[#EFEFE1] md:h-40 md:w-32"
          >
            <path
              d="M6 14C14 13 24 9 34 9C46 9 61 13 66 35C70 45 65 56 55 57C43 59 36 50 39 41C43 30 58 30 71 39C77 42 86 66 84 82C83 93 80 100 80 108"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M71 94L80 110"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M80 110L89 96"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-md px-5 md:max-w-2xl">
          <SwimsLogForm />
        </div>
      </div>
    </section>
  )
}
