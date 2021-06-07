/**
 * js-queryparams
 *
 * Author: K.C.Ashish Kumar
 * License: MIT
 */

/**
 * This library facilitates retrieval of the query parameters across all the browsers.
 */

(function () {
    var refName = "queryParams";
    typeof window !== "undefined" &&
        (window[refName] = (function () {
            var paramsMap;

            /**
             * constructor: QueryParams
             * constructs the base map for the query parameters
             */
            var QueryParams = function () { };

            var buildParamsMap = function () {
                paramsMap = null;
                var params = window.location.search && window.location.search.substr(1);
                if (params) {
                    var paramsList = params.split("&");
                    for (var i = 0; i < paramsList.length; i++) {
                        try {
                            var keyValue = paramsList[i].split("=");
                            var key = decodeURIComponent(keyValue[0]);
                            var value = decodeURIComponent(keyValue.slice(1).join("="));
                            paramsMap = paramsMap || {};
                            paramsMap[key] = paramsMap[key] || [];
                            paramsMap[key].push(value);
                        } catch (exjs) {
                            console.log("Error parsing entry:", paramsList[i]);
                        }
                    }
                }
            };

            var valueParser = function (obj) {
                return JSON.stringify(obj, function (k, v) {
                    if (v instanceof Array) {
                        if (v.length === 1) {
                            return v[0];
                        }
                        return v;
                    }
                    return v;
                });
            };

            /**
             * Retrieves a specific query parameter.
             * If the parameter is a single value, the value is returned else an Array is returned.
             *
             * The returned value is Immutable i.e. updating the returned values does not affect the actual params in any way.
             * @param paramName
             */
            QueryParams.prototype.get = function (paramName) {
                buildParamsMap();
                if (paramsMap && paramsMap[paramName]) {
                    return JSON.parse(valueParser(paramsMap[paramName]));
                }
                return null;
            };

            /**
             * Retrieve all the parameters.
             *
             * The returned value is Immutable i.e. updating the returned values does not affect the actual params in any way.
             */
            QueryParams.prototype.getAll = function () {
                buildParamsMap();
                return JSON.parse(valueParser(paramsMap || null));
            };

            /**
             * Use a different name for referencing instead of the default "queryParams".
             * After this call i.e. queryParams.changeRef("xyz"), the new reference will be "xyz" i.e.
             * All the subsequent calls should be made using xyz e.g.:
             * xyz.get("...")
             * xyz.getAll()
             *
             * @param name
             */
            QueryParams.prototype.changeRef = function (name) {
                if (!window[name]) {
                    window[name] = window[refName];
                    delete window[refName];
                    refName = name;
                } else {
                    throw new Error(name + " is already used in window");
                }
            };

            /**
             * Globally exposed singleton instance.
             *
             * use via "queryParams" in the window object.
             * To change the reference, use the queryParams.changeRef("...") function
             */
            return new QueryParams();
        })());
})();
