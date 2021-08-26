/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
const options = {
    appId: "com.my.app",
    artifactName: "${productName}-${buildVersion}-${arch}.${ext}",
    files: [
        "dist",
        "index.html"
    ],
    publish: {
        provider: 'github',
        repo: 'electron-builder-test',
        owner: 'mmaietta',
        private: true
    },
    win: {
        sign: undefined
    },
    mac: {
        identity: null,
        icon: "icon.icns",
        target: 'zip',
        extendInfo: {
            NSAppleEventsUsageDescription: 'The app wants to enable auto launch on login.',
            NSCameraUsageDescription: 'The app wants to use the camera.',
        }
    },


    linux: {
        icon: "icon.icns",


        desktop: {
            StartupNotify: "false",
            Encoding: "UTF-8",

        },

        target: ["AppImage"]
    },
};

module.exports = options;
