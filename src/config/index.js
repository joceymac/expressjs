
const config = {
    dev: {
        mode: 'dev',
        baseUrl: '/',
        minPasswordLength: 8,
        accessTokenSecret: 'j0c3ym@cTh3B3stXpr3ssd3v3l0p3r',
        sessionLifetimeSec: 1600
    },
    stage: {
        mode: 'stage',
        baseUrl: '/stage/',
        minPasswordLength: 8,
        accessTokenSecret: 'j0c3ym@cTh3B3stXpr3ssd3v3l0p3r',
        sessionLifetimeSec: 1800
    },
    prod: {
        mode: 'prod',
        baseUrl: '/',
        minPasswordLength: 8,
        accessTokenSecret: 'j0c3ym@cTh3B3stXpr3ssd3v3l0p3r',
        sessionLifetimeSec: 3600
    }
};


module.exports = function(mode) {
    return config[mode || process.argv[2] || 'dev'] || config.dev;
}