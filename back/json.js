const http = require("http");
const host = 'localhost';
const port = 8000;

let store = JSON.stringify([{id: 'jij9', name: "Замена стекла", value: '21000', content: 'Стекло оригинал от Apple'}, 
    {id: 'gd9l9', name: "Замена дисплея", value: '25000', content: 'Дисплей оригинал от Apple'}, 
    {id: 'kji6', name: "Замена аккумулятора", value: '4000', content: 'Аккумулятор оригинал от Apple'}, 
    {id: 'cgy7', name: "Замена микрофона", value: '2500', content: 'Микрофон оригинал от Apple'}]);

const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, application/json, accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    let methodReq = req.method;
    let address = req.url;

    console.log(req.url);

   const serviceRequest = (address) => {
       if(address === "/services") {
        if (methodReq == "POST") {
            console.log('post');
            let data = '';
            req.on('data', function (chunk) {
                data += chunk.toString();
            });
            req.on('end', function () {
                let obj = JSON.parse(store);
                let filterObj = obj.filter(svr=> svr.id === JSON.parse(data).id);
                if(filterObj.length > 0) {
                    obj = obj.map((svr)=>{
                         if(svr.id === JSON.parse(data).id) {
                         svr.name = JSON.parse(data).name;
                         svr.value = JSON.parse(data).value;
                         svr.content = JSON.parse(data).content;
                         } return svr;
                    })
                } else 
                obj.push(JSON.parse(data));
                store = JSON.stringify(obj);
                res.writeHead(200);
                res.end(store);
            });
        } else if (methodReq == "GET") {
            console.log('get');
            let obj = JSON.parse(store);
            obj = obj.map(svr=>{
                delete svr.content
                return svr
            })
            res.writeHead(200);
            res.end(JSON.stringify(obj));
        } else if (methodReq == "OPTIONS") {
            console.log('options');
            res.setHeader('200', 'OK');
            res.setHeader('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'API-Key, Content-Type, If-Modified-Since, Cache-Control');
            res.setHeader('Access-Control-Max-Age', '86400');
            res.writeHead(200);
            res.end();
        } 
      } else if( address.includes('/services/:')) {
        let x = '/services/:';
        let rExp = new RegExp(x, "g");
        let idService = address.replace(rExp, '');
        console.log(idService);
        if (methodReq == "OPTIONS") {
            console.log('options');
            res.setHeader('200', 'OK');
            res.setHeader('Access-Control-Allow-Methods', 'PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'API-Key, Content-Type, If-Modified-Since, Cache-Control');
            res.setHeader('Access-Control-Max-Age', '86400');
            res.writeHead(200);
            res.end();
        } else if (methodReq == "DELETE") {
            console.log('delete');
            let data = '';
            req.on('data', function (chunk) {
                data += chunk.toString();
            });
            req.on('end', function () {
                let obj = JSON.parse(store);
                obj = obj.filter(item => item.id != JSON.parse(data));
                store = JSON.stringify(obj);
                res.writeHead(200);
                res.end(store);
            });
        } else if (methodReq == "GET") {
            console.log('get');
            let obj = JSON.parse(store);
            obj = obj.find(item => item.id === idService);
            res.writeHead(200);
            res.end(JSON.stringify(obj));
            
            }
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Resource not found" }));
      }
    }

    serviceRequest(address);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}/services`);
});
