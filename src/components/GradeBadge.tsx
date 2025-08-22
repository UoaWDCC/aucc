type GradeProps = {
  grade: number
}

const GRADE_COLOURS = [
  'bg-[#66989f]/70',
  'bg-[#659d88]',
  'bg-[#7f9f66]',
  'bg-[#a1b04b]',
  'bg-[#cbab44]',
  'bg-[#c98541]',
]

export function GradeBadge({ grade }: GradeProps) {
  let colour: string
  // If grade is less than 1 or more than 6, use colour 1 or 6
  if (grade < 1) {
    colour = GRADE_COLOURS[0]
  } else if (grade > 6) {
    colour = GRADE_COLOURS[5]
  } else {
    colour = GRADE_COLOURS[grade - 1]
  }

  return (
    <div
      className={`text-cream ${colour} flex h-6 items-center justify-center rounded-2xl px-3 text-sm font-medium`}
    >
      Grade {grade}
    </div>
  )
}
