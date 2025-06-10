type GradeProps = {
  children: React.ReactNode
}

export function NextAdventureGrade({ children }: GradeProps) {
  return (
    <div className="text-algae bg-algae/30 rounded-2xl px-3 py-1.5 text-sm font-bold">
      Grade {children}
    </div>
  )
}
