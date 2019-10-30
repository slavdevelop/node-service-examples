
// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');


// Setting credentials
var credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account'});
console.log(credentials);
AWS.config.credentials = credentials;

// Create uniquie bucket name
var bucketName = 'node-sdk-sample-' + uuid.v4();

// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
var bucketPromise = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName }).promise();

// Handle promise fulfilled/rejected status
bucketPromise
    .then(function () {

        //Create params for putObject call
        var objectParams = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };

        // Create object upload promise
        var uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();

        uploadPromise
            .then(function(data) {
                console.log(`SuccessFully uploaded data to ${bucketName}/${keyName}`);
                console.log(data);
            })
    })
    .catch(err => console.error(err, err.stack));