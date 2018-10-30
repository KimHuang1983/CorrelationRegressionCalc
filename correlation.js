class Correlation {
    constructor() {
        this.arrayX = []
        this.arrayY = []
        this.arraySqrX = []
        this.arraySqrY = []
        this.arrayXY = []
        this.sumOfArrayX = ''
        this.sumOfArrayY = ''
        this.sumOfArraySqrX = ''
        this.sumOfArraySqrY = ''
        this.sumOfArrayXY = ''
        this.n = ''
        this.correlationResult = 'Result Displayed Here'
    }

    setArray(input, firstInput) {
        let tempArray = input.split('\n');
        if (firstInput) {
            this.arrayX = tempArray.map(Number);
        }
        else {
            this.arrayY = tempArray.map(Number);
        }
    }

    dataLength() {
        if (this.arrayX.length === this.arrayY.length) {
            return this.arrayX.length
        }
        else {
            return false
        }
    }

    computeArrays(x, y) {
        this.arrayXY = Array()
        this.arraySqrY = Array()
        this.arraySqrX = Array()

        for (let i = 0; i < this.dataLength(); i++) {
            let xy = x[i] * y[i]
            let yy = y[i] * y[i]
            let xx = x[i] * x[i]
            this.arrayXY.push(xy)
            this.arraySqrY.push(yy)
            this.arraySqrX.push(xx)
        }
    }

    computeSum(inputArray) {
        let sum = inputArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        )
        return sum
    }

    calcSums() {
        this.sumOfArraySqrX = this.computeSum(this.arraySqrX)
        this.sumOfArraySqrY = this.computeSum(this.arraySqrY)
        this.sumOfArrayXY = this.computeSum(this.arrayXY)
        this.sumOfArrayX = this.computeSum(this.arrayX)
        this.sumOfArrayY = this.computeSum(this.arrayY)
    }

    getCorrelation() {
        if (!this.dataLength()) {
            return 'Error: Input data is not equal length!'
        } else {
            this.n = this.dataLength()
            this.computeArrays(this.arrayX, this.arrayY)
            this.calcSums()
            return this.correlationResult = ((this.n * this.sumOfArrayXY - this.sumOfArrayX * this.sumOfArrayY) / Math.sqrt((this.n * this.sumOfArraySqrX - Math.pow(this.sumOfArrayX, 2)) * (this.n * this.sumOfArraySqrY - Math.pow(this.sumOfArrayY, 2)))).toFixed(10)
        }
    }
}
