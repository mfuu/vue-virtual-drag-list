module.exports = {
  root: true,
  env: {
    node: true
  },
//   extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    // 'no-console':
    //   /* process.env.NODE_ENV === 'production' ? 'error' : 'off', */ 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'vue/order-in-components': ['error'],
    // "vue/attributes-order": [
    //   "error",
    //   {
    //     order: [
    //       "DEFINITION",
    //       "LIST_RENDERING",
    //       "CONDITIONALS",
    //       "RENDER_MODIFIERS",
    //       "GLOBAL",
    //       "UNIQUE",
    //       "TWO_WAY_BINDING",
    //       "OTHER_DIRECTIVES",
    //       "OTHER_ATTR",
    //       "EVENTS",
    //       "CONTENT",
    //     ],
    //     alphabetical: false,
    //   },
    // ],
    // allow async-await
    'generator-star-spacing': 'off',
    // js语句结尾必须使用 ;
    // 'semi': ['off', 'always'],
    // semi: ['error', 'always'],
    // 三等号
    eqeqeq: 0,
    'prefer-const': 0,
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 0,
    // 关键字后面使用一致的空格
    'keyword-spacing': 0,
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 0,
    // 引号类型
    quotes: [0, 'single'],
    // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }]
  },
  parserOptions: {
    parser: 'babel-eslint',
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  parser: "vue-eslint-parser",
//   overrides: [
//     {
//       files: [
//         '**/__tests__/*.{j,t}s?(x)',
//         '**/tests/unit/**/*.spec.{j,t}s?(x)'
//       ],
//       env: {
//         jest: true
//       }
//     }
//   ]
};
