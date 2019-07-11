// .babelrc.js
module.exports = {
  "presets": [
    //  "es2017",
    // "es2015",
    [
      "@babel/preset-env", {
        "loose": true, "exclude": ["transform-async-to-generator", "transform-regenerator"]
      }
    ],
    // "stage-3",
    //["env", { "modules": false }],
    // { "targets": { "node": "6.10", "esmodules": true } }
  ],
  "plugins": [
    ["module:fast-async", { "spec": true }],
    "@babel/plugin-proposal-object-rest-spread",
    //"external-helpers",
    // "syntax-dynamic-import",
    //"transform-async-to-generator",
    '@babel/plugin-transform-runtime',
    "@babel/plugin-syntax-dynamic-import",
  ]
}
