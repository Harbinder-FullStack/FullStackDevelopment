
const handlerGet = (request, response) => {
 response.send("URL: " + request.url + "Method: "  +  request.method );
};