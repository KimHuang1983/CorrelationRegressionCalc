var { createServer } = require('http')
var { readFile } = require('fs')
const correlationFile = require('./correlationNode.js')
const regressionFile = require('./regressionNode.js')

let myCorrelation = new correlationFile.Correlation()
let myRegression = new regressionFile.Regression()
let correlationOutput = String()
let regressionOutput = String()
let dataX = String()
let dataY = String()
let fileOneRead = false, fileTwoRead = false

//create a server


let server = createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    let fileNameArray = request.url.replace("/", "").split(",")

    //process input data   

    //read file
    const readMyFile = (fileName, type) => {
        var readInputFiles = readFile(fileName, 'utf-8', (err, data) => {
            if (err) throw err
            if (type === 0) {
                dataX = data
                fileOneRead = true
            } else {
                dataY = data
                fileTwoRead = true
            }
            computeFunction()
        })
    }
    // compute function
    const computeFunction = () => {

        if (fileOneRead && fileTwoRead) {

            myCorrelation.setArray(dataX, true)
            myCorrelation.setArray(dataY, false)

            myRegression.setArray(dataX, true)
            myRegression.setArray(dataY, false)

            correlationOuptut = myCorrelation.getCorrelation()
            regressionOutput = myRegression.getRegression()

            let obj = {
                correlation: correlationOuptut,
                regression: regressionOutput
            }
            let myJSON = JSON.stringify(obj)

            response.write(myJSON)
            response.end()
            console.log('Successful')
        }
    }
    //test file length
    if (fileNameArray.length === 2) {
        for (const [i, value] of fileNameArray.entries()) {
            console.log(value)
            readMyFile(value, i)
        }
    }
})

server.listen(8000)

// use command line : node nodeServer.js in Node

// then type: http://localhost:8000/TestData1.txt,TestData2.txt in the browser