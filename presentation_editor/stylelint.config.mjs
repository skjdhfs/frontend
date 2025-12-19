/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message:
          'Имена классов должны быть в стиле camelCase (например, myClass), а не kebab-case или PascalCase',
      },
    ],
  },
};
