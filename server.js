var express = require("express");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/philips";


function getAuth(authorization, response) {
    MongoClient.connect(url,{native_parser:true}, function (err, db) {
        if (err)
        {
            var resp = {"message": "Something wrong with database", "success": false};
            return resp;
            //db.close();
        }

        var auth = authorization;
        if (auth)
            auth = auth.split(" ");
        auth = new Buffer.from(auth[1], 'base64').toString('utf8');
        console.log(auth);
        var authArray = auth.split(":");
        console.log(authArray);
        var username = authArray[0];
        var password = authArray[1];
        var filter = {"username": username.toLowerCase(), "password": password};
        console.log(filter);
        db.collection("users").find(filter, {password: 0, _id: 0}).toArray(function (err, result) {
            if (err)
            {
                throw err;
                var orders = {"data": [{"message": "Something wrong with database"}], "success": true};
                response.status(500);
                response.send(orders);
                db.close();
            }
            console.log(result);

            if (result.length === 1) {
                response.status(200);
                response.send({"status": "success", "data": result[0]});
            } else {
                response.status(401);
                response.send({"status": "error", "message": "authorization failed"});
            }
            ;
            response.send(orders);
            db.close();
        });
    });
}
function submitMarketIntelligence(authorization, body, response) {
    MongoClient.connect(url, function (err, db) {
        if (err)
        {
            var resp = {"message": "Something wrong with database", "success": false};
            return resp;
            //db.close();
        }

        var auth = authorization;
        if (auth)
            auth = auth.split(" ");
        auth = new Buffer.from(auth[1], 'base64').toString('utf8');
        console.log(auth);
        var authArray = auth.split(":");
        console.log(authArray);
        var username = authArray[0];
        var password = authArray[1];
        var filter = {"username": username.toLowerCase(), "password": password};
        console.log(filter);
        db.collection("users").find(filter, {password: 0, _id: 0}).toArray(function (err, result) {
            if (err)
            {
                throw err;
                var orders = {"data": [{"message": "Something wrong with database"}], "success": true};
                response.status(500);
                response.send(orders);
                db.close();
            }


            console.log(result);
            if (result.length === 1) {
                db.collection("market_intelligence").insert({"geography": body.geography,
                    "competitor": body.competitor,
                    "comments": body.comments,
                    "attachment": body.attachment,
                    "createdDate":new Date(),
                    "reportedBy": {
                        "name": result[0].firstName + " " + result[0].lastName,
                        "username": result[0].username,
                        "agency":result[0].agency
                        
                    }});
                response.status(200);
                response.send({"status": "success", "data": "successfully submitted"});
            } else {
                response.status(401);
                response.send({"status": "error", "message": "authorization failed"});
            }
            ;
            response.send(orders);
            db.close();
        });
    });

}
function submitIdea(authorization, body, response) {
    MongoClient.connect(url, function (err, db) {
        if (err)
        {
            var resp = {"message": "Something wrong with database", "success": false};
            return resp;
            //db.close();
        }

        var auth = authorization;
        if (auth)
            auth = auth.split(" ");
        auth = new Buffer.from(auth[1], 'base64').toString('utf8');
        console.log(auth);
        var authArray = auth.split(":");
        console.log(authArray);
        var username = authArray[0];
        var password = authArray[1];
        var filter = {"username": username.toLowerCase(), "password": password};
        console.log(filter);
        db.collection("users").find(filter, {password: 0, _id: 0}).toArray(function (err, result) {
            if (err)
            {
                throw err;
                var idea = {"data": [{"message": "Something wrong with database"}], "success": true};
                response.status(500);
                response.send(idea);
                db.close();
            }


            console.log(result);
            if (result.length === 1) {
                db.collection("feedback").insert({"productfamily": body.productFamily,
                    "productname": body.productName,
                    "referencecustomer": body.referenceCustomer,
                    "attachment": body.attachment,
                    "comments" : body.comments,
                    "createdDate":new Date(),
                    "reportedBy": {
                        "name": result[0].firstName + " " + result[0].lastName,
                        "username": result[0].username,
                        "agency":result[0].agency
                    }});
                response.status(200);
                response.send({"status": "success", "data": "successfully submitted"});
            } else {
                response.status(401);
                response.send({"status": "error", "message": "authorization failed"});
            }
            ;
            response.send(idea);
            db.close();
        });
    });

}
function getMarketIntelligence(authorization, body, response) {
    MongoClient.connect(url, function (err, db) {
        if (err)
        {
            var resp = {"message": "Something wrong with database", "success": false};
            return resp;
            //db.close();
        }

        var auth = authorization;
        if (auth)
            auth = auth.split(" ");
        auth = new Buffer.from(auth[1], 'base64').toString('utf8');
        console.log(auth);
        var authArray = auth.split(":");
        console.log(authArray);
        var username = authArray[0];
        var password = authArray[1];
        var filter = {"username": username.toLowerCase(), "password": password};
        console.log(filter);
        db.collection("users").find(filter, {password: 0, _id: 0}).toArray(function (err, result) {
            if (err)
            {
                throw err;
                var orders = {"data": [{"message": "Something wrong with database"}], "success": true};
                response.status(500);
                response.send(orders);
                db.close();
            }


            console.log(result);
            if (result.length === 1) {
                var geography = body.geography;
                var competitor = body.competitor;
                var username = body.username;


                var query = {};

                if (geography !== null && geography !== undefined && geography !== '')
                    query.geography = geography;
                if (competitor !== null && competitor !== undefined && competitor !== '')
                    query.competitor = competitor;
                if (username !== null && username !== undefined && username !== '')
                    query.username = username;

                db.collection("market_intelligence").find(query).toArray(function (err, result) {
                    if (err)
                        throw err;
                    var responseData = {"data": result, "success": true};
                    response.send(responseData);
                    db.close();
                });
            };

        });
    });

}
function getIdea(authorization, body, response) {
    MongoClient.connect(url, function (err, db) {
        if (err)
        {
            var resp = {"message": "Something wrong with database", "success": false};
            return resp;
            //db.close();
        }

        var auth = authorization;
        if (auth)
            auth = auth.split(" ");
        auth = new Buffer.from(auth[1], 'base64').toString('utf8');
        console.log(auth);
        var authArray = auth.split(":");
        console.log(authArray);
        var username = authArray[0];
        var password = authArray[1];
        var filter = {"username": username.toLowerCase(), "password": password};
        console.log(filter);
        db.collection("users").find(filter, {password: 0, _id: 0}).toArray(function (err, result) {
            if (err)
            {
                throw err;
                var orders = {"data": [{"message": "Something wrong with database"}], "success": true};
                response.status(500);
                response.send(orders);
                db.close();
            }


            console.log(result);
            if (result.length === 1) {
                var productfamily = body.productFamily;
                var productname = body.productName;
                var referencecustomer = body.referenceCustomer;



                var query = {};

                if (productfamily !== null && productfamily !== undefined && productfamily !== '')
                    query.productfamily = productfamily;
                if (productname !== null && productname !== undefined && productname !== '')
                    query.productname = productname;
                if (referencecustomer !== null && referencecustomer !== undefined && referencecustomer !== '')
                    query.referencecustomer = referencecustomer;
                console.log(query);
                db.collection("feedback").find(query).toArray(function (err, result) {
                    if (err)
                        throw err;
                    var responseData = {"data": result, "success": true};
                    response.send(responseData);
                    db.close();
                });
            };

        });
    });

}
app.get('/philips/api/auth', function (request, response) {
    console.log("/philips/api/auth");
    var authorization = request.headers.authorization;
    if (authorization !== "" && authorization !== undefined)
    {
        getAuth(authorization, response);
    } else
    {
        response.status(401);
        response.send({"status": "error", "message": "missing credentials"});
    }
});
app.post('/philips/api/getMarketIntelligence', function (request, response) {
    console.log("/philips/api/getMarketIntelligence");
    var authorization = request.headers.authorization;
    if (authorization !== "" && authorization !== undefined)
    {
        getMarketIntelligence(authorization,request.body, response);
    } else
    {
        response.status(401);
        response.send({"status": "error", "message": "missing credentials"});
    }
});
app.post('/philips/api/getIdea', function (request, response) {
    console.log("/philips/api/getIdea");
    var authorization = request.headers.authorization;
    if (authorization !== "" && authorization !== undefined)
    {
        getIdea(authorization,request.body, response);
    } else
    {
        response.status(401);
        response.send({"status": "error", "message": "missing credentials"});
    }
});
app.post('/philips/api/submitMarketIntelligence', function (request, response) {
    console.log('/philips/api/submitMarketIntelligence');
    var authorization = request.headers.authorization||request.headers.Authorization;
    if (authorization !== "" && authorization !== undefined)
    {
        submitMarketIntelligence(authorization, request.body, response);
    } else
    {
        response.status(401);
        response.send({"status": "error", "message": "missing credentials"});
    }
});
app.post('/philips/api/submitIdea', function (request, response) {
    console.log('/philips/api/submitIdea');
    var authorization = request.headers.authorization||request.headers.Authorization;
    if (authorization !== "" && authorization !== undefined)
    {
        submitIdea(authorization, request.body, response);
    } else
    {
        response.status(401);
        response.send({"status": "error", "message": "missing credentials"});
    }
});
var port = process.env.PORT || 5556;
app.listen(port, function () {
    console.log("Listening on " + port);
});