# Components Directory

This directory contains reusable React components used throughout the application.

## Structure

Components should be organized in a flat structure or in subdirectories based on functionality. Each component should:

- Have its own directory named in PascalCase (e.g., `Button/`)
- Include an `index.ts` file that exports the component
- Include a component file named the same as the directory (e.g., `Button.tsx`)
- Include any component-specific styles, types, or utilities
- Be properly typed with TypeScript
- Follow consistent naming conventions

## Best Practices

1. Keep components focused and single-responsibility
2. Use TypeScript for type safety
3. Implement proper prop validation
4. Follow the project's styling conventions using Tailwind CSS and the `cn` utility
5. Write clear component documentation
6. Consider component reusability
7. Implement proper error handling
8. Follow accessibility best practices
