
require('dotenv').config()
import { Configuration } from "app-builder-lib"
const port = 21
const host = "0.0.0.0"
/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
const options: Configuration = {
  appId: "com.my.app",
  // artifactName: "%2525SESSIONNAME%2525-${buildVersion}-${arch}.${ext}",
  files: [
    "out",
    "index.html",
    // "src/Hello.framework/**"
  ],
  // asarUnpack: [
  //     // "**/*.node",
  //     "**/*.framework/**",
  //     // "node_modules/argparse"
  // ],
  electronLanguages: ["en"],
  // publish: {
  //     provider: 'generic',
  //     url: "test.test.com"
  // },
  publish: {
      provider: 's3',
      bucket: "test-bucket",
      endpoint: process.platform === 'win32' ? "http://192.168.86.26:9000" : "https://127.0.0.1:9000"
  },
  // publish: { provider: "ftp", host, port, user: "user", password: "123" },
  // publish: {
  //   provider: 'github',
  //   repo: 'electron-builder-test',
  //   owner: 'mmaietta'
  // },
  // async afterPack(context: AfterPackContext) {
  //     const packager = context.packager
  //     const { platformSpecificBuildOptions, config } = packager

  //     const sources = [platformSpecificBuildOptions.icon, config.mac?.icon ?? config.icon].filter(str => !!str) as string[]

  //     // If no explicit sources are defined, fallback to buildResources directory, then default framework icon
  //     let fallbackSources = [packager.getDefaultFrameworkIcon()!]
  //     const buildResources = config.directories?.buildResources
  //     if (buildResources && existsSync(join(buildResources, "icons"))) {
  //         fallbackSources = [buildResources, ...fallbackSources]
  //     }

  //     const result = await packager.resolveIcon(sources, fallbackSources, "set")

  //     // do something with result. output is in config.directories.output dir
  // },
  win: {
    target: ["nsis-web"],
    // forceCodeSigning: true,
  //     // block signing
  //     sign: (_configuration: CustomWindowsSignTaskConfiguration, _packager: WinPackager | undefined) => {
  //         return Promise.resolve()
  //     }
  // signtoolOptions: {
  //   certificateFile: "CN=Foo Bar, O=Foo Bar.pfx"
  // }
  },
  nsis: {
    runAfterFinish: undefined,
    deleteAppDataOnUninstall: true,
    differentialPackage: undefined,
    perMachine: true
  },
  mac: {
    icon: "icon.icns",
    target: [{
      target: 'dir',
      arch: 'x64'
    }],
    extendInfo: {
      NSAppleEventsUsageDescription: 'The app wants to enable auto launch on login.',
      NSCameraUsageDescription: 'The app wants to use the camera.',
    },
    // notarize: true
    identity: null
  },
  pkg: {
    // extraPkgsDir: "extra-packages"
  },
  linux: {
    icon: "icon.icns",


    desktop: {
      entry: {
      StartupNotify: "undefined",
      Encoding: "UTF-8",
      }

    },

    "target": [
      {
        "target": "AppImage",
        "arch": [
          "x64"
        ]
      },
      {
        "target": "deb",
        "arch": [
          "x64"
        ]
      },
      {
        "target": "rpm",
        "arch": [
          "x64"
        ]
      },
      {
        "target": "pacman",
        "arch": [
          "x64"
        ]
      },
    ],
  },
};

export default options;
