require("dotenv").config();

// localhost minio server
process.env["AWS_ACCESS_KEY_ID"] = "kKAzgBodTWWtT8R1Nrc1";
process.env["AWS_SECRET_ACCESS_KEY"] = "kKAzgBodTWWtT8R1Nrc1";

const port = 21;
const host = "0.0.0.0";
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
  appId: "com.my.app",
  artifactName: "${productName}-${buildVersion}-${arch}.${ext}",
  files: ["out", "index.html", "README*"],
  electronLanguages: ["en"],
  // asarUnpack: [
  //     "**.*node",
  //     "node_modules/argparse"
  // ],
  // publish: {
  //     provider: 'generic',
  //     url: "test.test.com"
  // },
  // electronDownload: {
  // mirror: "https://npmmirror.com/mirrors/electron/"
  // },
  publish: {
    provider: "s3",
    bucket: "test-bucket",
    endpoint:
      process.platform === "win32"
        ? "http://192.168.86.26:9000"
        : "https://127.0.0.1:9000",
  },
  // publish: { provider: "ftp", host, port, user: "user", password: "123" },
  // publish: {
  //     provider: 'github',
  //     repo: 'electron-builder-test',
  //     owner: 'mmaietta'
  // },
  directories: {
    buildResources: "build",
  },
  win: {
    target: ["arm64", "x64", "ia32"].map((arch) => ({
      target: "nsis",
      arch,
    })),
    signtoolOptions: {
      // certificateFile: 'Foo Bar.pfx',
      // publisherName: "Foo Bar",
    },
    // azureSignOptions: {
    //     endpoint: "https://weu.codesigning.azure.net/",
    //     certificateProfileName: "profilenamehere",
    //     codeSigningAccountName: "temp"
    // },
    // forceCodeSigning: true
  },
  nsis: {
    include: "./installer.nsh",
    // packElevateHelper: true,
    runAfterFinish: true,
    perMachine: true,
    deleteAppDataOnUninstall: false,
    differentialPackage: false,

    // allowElevation: true,
    // buildUniversalInstaller: false,
  },
  mac: {
    icon: "icon.icns",
    target: [
      {
        target: "zip",
        arch: "universal",
      },
    ],
    extendInfo: {
      NSAppleEventsUsageDescription:
        "The app wants to enable auto launch on login.",
      NSCameraUsageDescription: "The app wants to use the camera.",
    },
    // notarize: true
    identity: null,
  },
  // dmg: {
  //   title: "${productName} Setup",
  //   artifactName: "${productName}-${buildVersion}.${ext}",
  // },
  pkg: {
    scripts: null,
  },
  linux: {
    icon: "icon.icns",

    desktop: {
      entry: {
        StartupNotify: "false",
        Encoding: "UTF-8",
      },
    },

    target: ["deb", "AppImage"],
  },
};

module.exports = options;
