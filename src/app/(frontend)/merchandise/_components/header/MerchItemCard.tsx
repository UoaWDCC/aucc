type MerchItemCardProps = {
  title: string
  price?: string
  image?: string
}

export function MerchItemCard({ title, price, image }: MerchItemCardProps) {
  return (
    <div className="rounded-xl border p-4">
      {image && (
        <img
          src={image}
          alt={title}
          className="mb-4 h-64 w-full rounded-lg object-cover"
        />
      )}

      <h3 className="text-xl font-bold">{title}</h3>

      {price && <p className="text-gray-400">{price}</p>}
    </div>
  )
}
