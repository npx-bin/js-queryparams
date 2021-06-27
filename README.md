# <b>js-queryparams</b>

### <i>A JavaScript library to retrieve the query parameters with cross-browser support.</i>

---
<br/>

## How to Install:
Inside your project, run the following command:
```
npm i js-queryparams
```
The above command will install the js-queryparams module inside the node_modules folder. After this you can either directly refer to the `node_modules/js-queryparams/lib/index.js` file from within your webpage or extract it and host it in your webserver.

---
<br/>

## Usage:  
Assume the current browser url is:  

```
https://www.example.com/?p1=v1&p2=some=text&p3={"key1":"val1","key2":[1,2,3,4]}&p4=v4&p4=a4&p4=&p5=https://www.example.com&p6=https%3A%2F%2Fwww.example.com%2F%3Fabc%3Ddef%26pqr%3Dxyz&p7=test=01&p8&p9=v9#somehash
```
<br/>

### The library has the following functions:
<br/>
<b>Get a specific query parameter:</b>
<br/>
<br/>

```
queryParams.get(<paramName>);

e.g.:
queryParams.get("p1"); // --> "v1" i.e. a single value.
queryParams.get("p4"); // --> ["v4", "a4", ""] i.e. an Array of values, if the parameter gets repeated in the query string.
```

<br/>
<b>Get all the query parameters:</b>
<br/>
<br/>

```
queryParams.getAll() 

// Output: 

{
    "p1": "v1",
    "p2": "some=text",
    "p3": "{\"key1\":\"val1\",\"key2\":[1,2,3,4]}",
    "p4": [
        "v4",
        "a4",
        ""
    ],
    "p5": "https://www.example.com",
    "p6": "https://www.example.com/?abc=def&pqr=xyz",
    "p7": "test=01",
    "p8": "",
    "p9": "v9"
}
```

<br/>
<b>Support for custom url:</b>

The `queryParams.get` and `queryParams.getAll` functions also support an optional argument to specify a url. 
<br/>
<br/>

```
queryParams.getAll("https://www.example.com/?p1=v1&p2=v2")

// Output: 

{
    "p1": "v1",
    "p2": "v2"
}

queryParams.get("p2", "https://www.example.com/?p1=v1&p2=v2")

// Output:

"v2"
```

<br/>
<b>Change the reference "queryParams":</b>

In case the reference `queryParams` needs to be changed, then it can be done as follows:

```
// queryParams.changeRef(<newRefName>);

// e.g.:
queryParams.changeRef("$qp");
console.log(queryParams); // --> ReferenceError

// use $qp instead of queryParams
$qp.get("p1"); // --> "v1"
```
Once the reference is changed, the old reference is deleted, so trying to use it will result in a ReferenceError.

---
<br/>

## License: MIT (https://mit-license.kcak11.com)