"use strict"

const builder = require("electron-builder")
const Platform = builder.Platform

// Let's get that intellisense working
/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
const options = {
  protocols: {
    name: "Deeplink Example",
    // Don't forget to set `MimeType: "x-scheme-handler/deeplink"` for `linux.desktop` entry!
    schemes: [
      "deeplink"
    ]
  },

  // publish: {
  //   provider: "bitbucket",
  //   owner: 'mike-m',
  //   slug: 'electron-builder-test'
  // },

  // "store” | “normal” | "maximum". - For testing builds, use 'store' to reduce build time significantly.
  compression: "normal",
  removePackageScripts: true,

  directories: {
    output: "dist/artifacts/local",
    buildResources: "installer/resources"
  },
  files: [
    "out",
    "index.html"
  ],
  win: {
    target: 'nsis'
  },
  nsis: {
    deleteAppDataOnUninstall: true,
  },

  mac: {
    target: 'zip',
    hardenedRuntime: true,
    gatekeeperAssess: true,
    extendInfo: {
      NSAppleEventsUsageDescription: 'Let me use Apple Events.',
      NSCameraUsageDescription: 'Let me use the camera.',
      NSScreenCaptureDescription: 'Let me take screenshots.',
    }
  },
  linux: {
    desktop: {
      StartupNotify: "false",
      Encoding: "UTF-8",
      MimeType: "x-scheme-handler/deeplink"
    },
    target: ["AppImage"]
  }
};

// Promise is returned
builder.build({
  targets: Platform.WINDOWS.createTarget(),
  config: options
})