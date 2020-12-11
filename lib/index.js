/**
 * js-queryparams
 * 
 * Author: K.C.Ashish Kumar
 * License: MIT
 */

/**
 * This library facilitates retrieval of the query parameters across all the browsers.
 */

((function () {
    var refName = "queryParams";
    (typeof window !== "undefined") && (window[refName] = ((function () {
        var paramsMap;

        /**
         * constructor: QueryParams
         * constructs the base map for the query parameters
         */
        var QueryParams = function () {
            paramsMap
            var params = window.location.search && window.location.search.substr(1);
            if (params) {
                var paramsList = params.split("&");
                for (var i = 0; i < paramsList.length; i++) {
                    var keyValue = paramsList[i].split("=");
                    paramsMap = paramsMap || {};
                    paramsMap[keyValue[0]] = paramsMap[keyValue[0]] || [];
                    paramsMap[keyValue[0]].push(keyValue[1]);
                }
            }
        };

        /**
         * Retrieves a specific query parameter.
         * If the parameter is a single value, the value is returned else an Array is returned.
         * 
         * The returned value is Immutable i.e. updating the returned values does not affect the actual params in any way.
         * @param {*} paramName 
         */
        QueryParams.prototype.get = function (paramName) {
            if (paramsMap && paramsMap[paramName]) {
                if (paramsMap[paramName].length === 1) {
                    return JSON.parse(decodeURIComponent(JSON.stringify(paramsMap[paramName][0])));
                } else {
                    return JSON.parse(decodeURIComponent(JSON.stringify(paramsMap[paramName])));
                }
            }
            return null;
        };

        /**
         * Retrieve all the parameters.
         * 
         * The returned value is Immutable i.e. updating the returned values does not affect the actual params in any way.
         */
        QueryParams.prototype.getAll = function () {
            return JSON.parse(decodeURIComponent(JSON.stringify(paramsMap || null)));
        };

        /**
         * Use a different name for referencing instead of the default "queryParams".
         * After this call i.e. queryParams.changeRef("xyz"), the new reference will be "xyz" i.e.
         * All the subsequent calls should be made using xyz e.g.: 
         * xyz.get("...") 
         * xyz.getAll()
         * 
         * @param {*} name 
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
    })()));
})());