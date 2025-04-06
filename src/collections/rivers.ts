import type { CollectionConfig } from 'payload'

export const Rivers: CollectionConfig = {
    slug: 'rivers',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'grade'],
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'grade',
            type: 'select',
            options: [
                { label: 'Grade 1 (Easy)', value: '1' },
                { label: 'Grade 2 (Novice)', value: '2' },
                { label: 'Grade 3 (Intermediate)', value: '3' },
                { label: 'Grade 4 (Advanced)', value: '4' },
                { label: 'Grade 5 (Expert)', value: '5' },
              ],
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ],
};
