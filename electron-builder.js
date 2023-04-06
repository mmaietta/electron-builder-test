/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
  appId: "com.my.app",
  artifactName: "${productName}-${buildVersion}-${arch}.${ext}",
//   npmRebuild: false,
  files: [
    "out",
    "index.html",
    //  "!**/bin/**/*.node",
    //  "!**/nothing.target.mk",
    //  "!**/.forge-meta",
    //  "!node_modules/**/**.{mk,a,o,h}"
  ],
  // asarUnpack: [
  //     "**.*node",
  //     "node_modules/argparse"
  // ],
  // publish: {
  //     provider: 'generic',
  //     url: "test.test.com"
  // },
  publish: {
    provider: "github",
    repo: "electron-builder-test",
    owner: "mmaietta",
  },
  win: {
    // sign: undefined
  },
  mac: {
    icon: "icon.icns",
    target: [
      {
        target: "dir",
        arch: [
          // "x64", "arm64",
          "universal",
        ],
      },
    ],
    extendInfo: {
      NSAppleEventsUsageDescription:
        "The app wants to enable auto launch on login.",
      NSCameraUsageDescription: "The app wants to use the camera.",
    },
    hardenedRuntime: true,
    // gatekeeperAssess: true,
    identity: null
  },

  snap: {
    publish: {
      provider: "snapStore",
      channels: "edge",
      repo: "electron-builder-test",
    },
  },

  linux: {
    icon: "icon.icns",

    desktop: {
      StartupNotify: "false",
      Encoding: "UTF-8",
    },

    target: ["deb"], //, "AppImage", "rpm"]
  },
};

module.exports = options;
