type MerchItemCardProps = {
  title: string
  price?: string
  image?: string
}

export function MerchItemCard({ title, price, image }: MerchItemCardProps) {
  return (
    <article className="bg-[#f4f3ea] text-[#172926]">
      {image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="p-2">
        <h3 className="text-xs font-black tracking-wider uppercase">{title}</h3>
        {price && <p className="text-xs">{price}</p>}
      </div>
    </article>
  )
}
