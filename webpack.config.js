const path = require('path');

module.exports = env => {
    return {
        mode: env.NODE_ENV,
        entry: {
            main: getSourcePath('js/main.js'),
            docs: getSourcePath('js/docs.js')
        },
        output: {
            path: getPublicPath()
        }
    };
};

function getSourcePath() {
    return path.resolve(process.env.npm_package_config_path_src, ...arguments);
}

function getPublicPath() {
    return path.resolve(process.env.npm_package_config_path_public, ...arguments);
}
