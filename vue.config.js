const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: '\n                    @import "@/assets/styles/main.scss";\n                '
            }
        }
    }
};
