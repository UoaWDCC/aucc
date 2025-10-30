export default function NavArrow(props: {
  left?: boolean
  onClick: (e: React.MouseEvent) => void
}) {
  const baseClasses =
    'w-[30px] h-[30px] absolute top-1/2 -translate-y-1/2 fill-white cursor-pointer transition'
  const sideClass = props.left ? 'left-[250px]' : 'right-[250px]'

  return (
    <svg
      onClick={props.onClick}
      className={`${baseClasses} ${sideClass}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
