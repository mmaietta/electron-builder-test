import * as builder from "electron-builder";
import { flipFuses, FuseVersion, FuseV1Options } from '@electron/fuses';
import * as path from 'path'

const options: builder.Configuration = {
  appId: "com.my.app",
  artifactName: "${productName}-${buildVersion}-${arch}.${ext}",
  //   npmRebuild: false,
  files: [
    "out",
    "index.html",
    "**/*.node",
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
  afterPack: async (context: builder.AfterPackContext) => {
    if (context.electronPlatformName !== 'darwin' || context.arch === builder.Arch.universal) {
      await addElectronFuses(context)
    }
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
          // "x64", 
          // "arm64",
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
    // identity: null
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

// Adapted from https://github.com/electron-userland/electron-builder/issues/6365#issue-1033809141
async function addElectronFuses(context: builder.AfterPackContext) {
  const { appOutDir, packager: { appInfo }, electronPlatformName, arch } = context
  const ext = {
    darwin: '.app',
    win32: '.exe',
    linux: [''],
  }[electronPlatformName];

  const electronBinaryPath = path.join(appOutDir, `${ appInfo.productFilename }${ ext }`);
  console.log('Flipping fuses for: ', electronBinaryPath)

  await flipFuses(electronBinaryPath, {
    version: FuseVersion.V1,
    resetAdHocDarwinSignature: electronPlatformName === 'darwin' && arch === builder.Arch.arm64, // necessary for building on Apple Silicon
    [FuseV1Options.RunAsNode]: false,
    [FuseV1Options.EnableCookieEncryption]: true,
    // [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    // [FuseV1Options.EnableNodeCliInspectArguments]: false,
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true
  });
}

export default options
