export type ImportDictionary = { [index: string]: () => Promise<any> }
/**
 * Usage:
 *
 * ```
 *  resolvers: [
 *      webpackResolver([
 *          require.context('./states/', true, /State.js$/),
 *          require.context('./models/', true, /.js$/)
 *      ])
 *  ]
 * ```
 *
 * @param {function[]|{keys: function}[]} requires
 * @returns {Function}
 */
export default function webpackResolver(requires: ImportDictionary): (name: string) => Promise<any> {
    let bundles:ImportDictionary = {};

    /**
     * @param {function|{keys: function}} require
     * @returns {Function}
     */
    let createLoader = function (key: string, require: () => Promise<any>) {
        let match = key.match(/\/([^\/]+)$/);
        let name = match ? match[1] : "";

        // If we already has declared bundle, use it for loading
        // do not override
        if (!bundles[name]) {
            bundles[name] = () => {
                return require();
            };
        }
    };

    for (let key in requires){
        createLoader(key, requires[key]);
    }

    /**
     * @params {string} name
     *
     * @returns {Promise<object>|object}
     */
    return (name: string) => {
        if (!name.match(/\.ts$/)) {
            name += '.ts';
        }

        let require = bundles[name];
        let bundleLoader: any;

        if (require) {
            bundleLoader = require();

            if (typeof bundleLoader === 'function' && !bundleLoader.name) {
                if (bundleLoader.length === 1) {
                    return new Promise((resolve: any) => {
                        bundleLoader(resolve);
                    });
                } else if (bundleLoader.length === 0) {
                    return bundleLoader();
                }
            }

            return bundleLoader;
        }
    };
};