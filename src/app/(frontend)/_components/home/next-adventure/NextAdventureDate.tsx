type DateProps = {
  startTime: string
  endTime: string
}

export function NextAdventureDate({ startTime, endTime }: DateProps) {
  return (
    <div className="flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M13.3333 1.66666V4.99999M6.66667 1.66666V4.99999M2.5 8.33332H17.5M4.16667 3.33332H15.8333C16.7538 3.33332 17.5 4.07952 17.5 4.99999V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V4.99999C2.5 4.07952 3.24619 3.33332 4.16667 3.33332Z"
          stroke="#EFEFE1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        <p>
          {new Date(startTime).getDate()}-{new Date(endTime).getDate()}{' '}
          {new Date(startTime)
            .toLocaleDateString('en-US', { month: 'long' })
            .toUpperCase()}{' '}
          {new Date(startTime).getFullYear()}
        </p>
      </div>
    </div>
  )
}
