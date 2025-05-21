import type { Field } from 'payload'

type CustomUploadFieldArgs = {
  name: string
  label?: string
  required?: boolean
  hasMany?: boolean
  mimeType: string
  admin?: {
    className?: string
    [key: string]: any
  }
}

export const customUploadField = ({
  name,
  label = 'Image Upload',
  required = false,
  hasMany = false,
  mimeType,
  admin,
}: CustomUploadFieldArgs): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  required,
  hasMany,
  admin,
  filterOptions: {
    mimeType: { contains: mimeType },
  },
  hooks: {
    beforeChange: [
      async ({ value, req }) => {
        if (!value) return value

        const ids = Array.isArray(value) ? value : [value]

        for (const id of ids) {
          const media = await req.payload.findByID({
            collection: 'media',
            id,
          })

          const mime = media?.mimeType
          if (!mime || !mime.includes(mimeType)) {
            return `Only files of type "${mimeType}" are allowed.`
          }
        }

        return value
      },
    ],
  },
})
