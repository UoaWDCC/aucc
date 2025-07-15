function FlareIcon({ className }: { className?: string }) {
  return (
    <svg
      width="27"
      height="80"
      viewBox="0 0 27 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25.3742 9.15649C24.1801 7.41013 24.0727 5.10787 22.7908 3.42981"
        stroke="#EFEFE1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13.1833 15.282C11.4206 15.0116 10.0856 13.6039 8.66617 12.6587C7.89977 12.1484 6.41536 11.5567 6.10571 10.6427"
        stroke="#EFEFE1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M2.46411 28.7404L8.49955 29.6662"
        stroke="#EFEFE1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LatestReportsHeader() {
  return (
    <div className="flex items-center justify-center whitespace-nowrap">
      <h2 className="text-cream font-heading relative mb-3 text-center text-2xl tracking-tighter">
        LATEST REPORTS
        <FlareIcon className="absolute -top-4 -left-5" />
      </h2>
    </div>
  )
}
