//acquiring the files and setting data to string
var fs = require('fs')
const getCorrelation = require("./correlationNode.js")
const getRegression = require("./regressionNode.js")
let dataX = String(), dataY = String()
let correlationOuptut = String(), regressionOutput = String()
let fileOneRead = false, fileTwoRead = false
let fileNameArray = ['TestData1.txt', 'TestData2.txt']
//setting readFile constant variable
const readFile = (fileName, type) => {
    var readX = fs.readFile(fileName, 'utf-8', function (err, data) {
        if (err)
            return console.error(err)

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
//read two files
for (const [i, value] of fileNameArray.entries()) {
    readFile(value, i)
}
//set up computeFunction for processing the calculation
const computeFunction = () => {

    if (fileOneRead && fileTwoRead) {
        console.log(getCorrelation)

        let correlation = new getCorrelation.Correlation()
        let regression = new getRegression.Regression()

        correlation.setArray(dataX, true)
        correlation.setArray(dataY, false)

        regression.setArray(dataX, true)
        regression.setArray(dataY, false)

        correlationOuptut = correlation.getCorrelation()
        regressionOutput = regression.getRegression()
    }
    writeFile()
    console.log('Successful')
}
//write the output file
const writeFile = () => {
    let result = `Correlation Output: ${correlationOuptut}   Regression Output: ${regressionOutput}`
    fs.writeFile('test.txt', result, function (err, data) {
        if (err)
            return console.error(err)
    })
}

// use command line : node nodeReaderWriter.js in Node