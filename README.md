# <b>js-queryparams</b>

### A JavaScript library to retrieve the query parameters with cross browser compatibility.

---

## How to Install:
Inside your project, run the following command:
```
npm i js-queryparams
```
The above command will install the js-queryparams module inside the node_modules folder. After this you can either direct reference to the `lib/index.js` file or extract it and host it in your webserver.

---

## Usage:
<br/>  Assume the current browser url is:  
https://www.example.com/?abc=123&xyz=somevalue&abc=45  
<br/>
### The library has the following functions:
<br/>
<b>Get a specific query parameter:</b>

```
queryParams.get(<paramName>);

e.g.:
queryParams.get("abc"); --> ["123", "45"] i.e. an Array of values
queryParams.get("xyz"); --> "somevalue" i.e. a single value
```

<br/>
<b>Get all the query parameters:</b>

```
queryParams.getAll() --> {abc: Array(2), xyz: Array(1)}
```

<br/>
<b>Change the reference "queryParams":</b>

```
queryParams.changeRef(<newRefName>);

e.g.:
queryParams.changeRef("$qp");
console.log(queryParams); --> ReferenceError
$qp.get("abc"); --> ["123", "45"]
```
Once the reference is changed, the old reference is deleted so trying to use it will result in a ReferenceError.

---

## License: MIT (https://mit-license.kcak11.com)