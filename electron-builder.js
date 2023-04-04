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
        provider: 'github',
        repo: 'electron-builder-test',
        owner: 'mmaietta'
    },
    win: {
        // sign: undefined
    },
    mac: {
        icon: "icon.icns",
        target: [{
            target: 'dir',
            // eslint-disable-next-line no-undef
            arch: 'x64'
        }],
        extendInfo: {
            NSAppleEventsUsageDescription: 'The app wants to enable auto launch on login.',
            NSCameraUsageDescription: 'The app wants to use the camera.',
        }
    },

    snap: {
        publish: {
            provider: "snapStore",
            channels: "edge",
            repo: "electron-builder-test"
        }
    },


    linux: {
        icon: "icon.icns",


        desktop: {
            StartupNotify: "false",
            Encoding: "UTF-8",

        },

        target: ["deb"] //, "AppImage", "rpm"]
    },
};

module.exports = options;
