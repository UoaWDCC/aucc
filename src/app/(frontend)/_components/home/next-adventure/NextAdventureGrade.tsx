type GradeProps = {
  children: React.ReactNode
}

export function NextAdventureGrade({ children }: GradeProps) {
  return (
    <div className="text-algae bg-algae/30 rounded-2xl px-3 py-1.5 text-sm font-bold md:px-1.5 md:py-1 md:text-[8px] lg:px-3 lg:py-1.5 lg:text-xs">
      Grade {children}
    </div>
  )
}
