
require('dotenv').config()

const port = 21
const host = "0.0.0.0"
/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
const options = {
    appId: "com.my.app",
    artifactName: "${productName}-${buildVersion}-${arch}.${ext}",
    files: [
        "out",
        "index.html"
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
        provider: 's3',
        bucket: "test-bucket",
        endpoint: process.platform === 'win32' ? "http://192.168.86.26:9000" : "http://localhost:9000"
    },
    // publish: { provider: "ftp", host, port, user: "user", password: "123" },
    // publish: {
    //     provider: 'github',
    //     repo: 'electron-builder-test',
    //     owner: 'mmaietta'
    // },
    directories: {
        buildResources: 'build'
    },
    win: {
        target: [{
            target: 'nsis',
            arch: 'x64'
        }],
        // sign: undefined
        certificateFile: 'Foo Bar.pfx',
        publisherName: "Foo Bar",
    },
    nsis: {
        runAfterFinish: false,
        deleteAppDataOnUninstall: true,
        differentialPackage: false
    },
    mac: {
        icon: "icon.icns",
        target: [{
            target: 'zip',
            arch: 'x64'
        }],
        extendInfo: {
            NSAppleEventsUsageDescription: 'The app wants to enable auto launch on login.',
            NSCameraUsageDescription: 'The app wants to use the camera.',
        },
        // notarize: true
        // identity: null
    },
    pkg: {
        scripts: null
    },
    linux: {
        icon: "icon.icns",


        desktop: {
            StartupNotify: "false",
            Encoding: "UTF-8",

        },

        target: ["deb", "AppImage"]
    },
};

module.exports = options;
