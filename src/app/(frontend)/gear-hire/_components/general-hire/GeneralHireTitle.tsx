function AgendaArrow() {
  return (
    <div>
      {' '}
      <svg
        width="78"
        height="76"
        viewBox="0 0 78 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.0299 69.4245C18.9548 70.4676 19.8798 71.5107 20.8047 72.5538C21.0815 72.866 22.3649 74.823 22.4763 74.1383C22.6374 73.1477 23.5858 72.1907 24.085 71.3143C24.3937 70.7724 25.898 69.3743 25.7565 68.8617"
          stroke="#EFEFE1"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M66.0505 11.8497C56.8585 8.80166 48.8876 8.10642 41.7402 12.2428C38.6922 14.945 32.5584 20.1149 32.431 24.5614C32.1232 35.298 51.5235 46.4451 49.8035 28.9609C49.0098 20.8922 43.1977 22.9192 39.6257 22.5979C33.0971 22.0106 19.3642 32.9483 17.4354 39.7905C15.5066 46.6327 15.6201 53.8894 17.5335 60.8189C18.3617 63.8185 22.7301 70.7454 21.7594 73.2188"
          stroke="#EFEFE1"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export function GeneralHireTitle() {
  return (
    <div className="font-heading text-cream text-4xl leading-15 md:text-5xl lg:pr-15">
      <h1 className="hidden justify-self-end lg:block">General</h1>
      <div className="hidden justify-self-end lg:block">
        <div className="flex flex-row">
          <AgendaArrow />
          <h2>Hire</h2>
        </div>
      </div>
      <div className="block lg:hidden">
        <h2 className="flex justify-center self-center pt-10 text-center">
          General Hire
        </h2>
      </div>
    </div>
  )
}
