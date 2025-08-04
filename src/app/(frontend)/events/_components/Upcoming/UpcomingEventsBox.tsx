export function UpcomingEventsBox() {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-lg border border-[#9AA687] bg-transparent p-6 text-left md:mx-0 md:mt-2">
      <h3 className="font-heading text-grass mb-4 text-center text-base text-lg tracking-tighter">
        PETROL COSTS
      </h3>
      <ul className="font-body text-grass list-disc space-y-3 pl-5 text-sm italic">
        <li>
          We rely on carpooling to get our members to and from event trip
          locations. Passengers will have to pay a contribution to petrol for
          the driver.
        </li>
        <li>
          The club policy is for passengers to contribute 2 parts passenger cost
          to 1 part driver cost (passenger : driver).
        </li>
        <li>
          eg. for a car with 3 passengers, 1 driver, and a $140 total petrol
          cost; the passengers each pay $40 and the driver pays $20. Ratio
          2:2:2:1, (passenger 40 : passenger 40 : passenger 40 : driver 20)
        </li>
      </ul>
    </div>
  )
}
