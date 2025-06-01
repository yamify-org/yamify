self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/api-docs/data-models": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/api-docs/data-models.js"
    ],
    "/api-docs/overview": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/api-docs/overview.js"
    ],
    "/architecture/project-structure": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/architecture/project-structure.js"
    ],
    "/getting-started": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/getting-started.js"
    ],
    "/getting-started/installation": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/getting-started/installation.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];