class Regression extends Correlation {
  constructor() {
    super()
    this.beta1 = ''
    this.beta0 = ''
    this.regressionResult = 'Result Displayed Here'
  }

  getRegression() {
    this.getCorrelation()
    if (!this.n) {
      return 'Error: Input data is not equal length!'
    } else {
      let xAverage = this.sumOfArrayX / this.n
      let yAverage = this.sumOfArrayY / this.n
      this.beta1 = ((this.sumOfArrayXY - this.n * xAverage * yAverage) / (this.sumOfArraySqrX - this.n * Math.pow(xAverage, 2))).toFixed(5)
      this.beta0 = (yAverage - this.beta1 * xAverage).toFixed(5)
      console.log('the xAverage is :' + xAverage)
      console.log('the yAverage is :' + yAverage)
      console.log('sumOfArrayX is: ' + this.sumOfArrayX)
      console.log('sumOfArrayY is: ' + this.sumOfArrayY)
      console.log('sumOfArraySqrX is: ' + this.sumOfArraySqrX)
      console.log('sumOfArraySqrY is: ' + this.sumOfArraySqrY)
      console.log('sumOfArrayXY is: ' + this.sumOfArrayXY)
      return this.regressionResult = `Y = ${this.beta0} + ${this.beta1} * X`
    }
  }
}
