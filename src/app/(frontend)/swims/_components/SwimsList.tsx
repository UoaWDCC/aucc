export type SwimRecordDTO = {
  id: string
  date: string
  trip: string
  river: string
  memberName: string
}

type SwimsListProps = {
  swims: SwimRecordDTO[]
}

export function SwimsList({ swims }: SwimsListProps) {
  if (swims.length === 0) {
    return (
      <div data-testid="swims-empty-state" className="py-8 text-center">
        No swims logged yet
      </div>
    )
  }

  return (
    <table className="w-full text-left" data-testid="swims-table">
      <thead>
        <tr>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Trip</th>
          <th className="px-4 py-2">River</th>
          <th className="px-4 py-2">Member</th>
        </tr>
      </thead>
      <tbody>
        {swims.map((swim) => (
          <tr key={swim.id}>
            <td className="px-4 py-2">
              {new Date(swim.date).toLocaleDateString()}
            </td>
            <td className="px-4 py-2">{swim.trip}</td>
            <td className="px-4 py-2">{swim.river}</td>
            <td className="px-4 py-2">{swim.memberName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
