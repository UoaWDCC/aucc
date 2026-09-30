export function MembershipBenefits({ content }: { content: string }) {
  return (
    <section className="text-cream bg-[#89ACAD] px-5 py-14 sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading mb-4 text-2xl">Benefits</h2>
        <p className="text-abyss/80 max-w-2xl text-base leading-7">{content}</p>
      </div>
    </section>
  )
}
