export function ScrollCue() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <span className="italic text-sm opacity-80 mb-1">scroll to explore</span>
      <svg className="w-6 h-6 animate-bounce" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  );
}
