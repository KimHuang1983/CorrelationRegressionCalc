new Vue({
  el: "#correlation",
  data: {
    x: "",
    y: "",
    correlationOutput: "Result Displayed Here",
    regressionOutput: "Result Displayed Here",
    correlation: new Correlation(),
    regression: new Regression()
  },
  methods: {
    onFileChange: function (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      if (e.currentTarget.id === 'x') {
        this.loadNumbers(files[0], true)
      }
      if (e.currentTarget.id === 'y') {
        this.loadNumbers(files[0], false)
      }
    },

    loadNumbers: function (file, firstFile) {
      let reader = new FileReader()

      let vm = this

      reader.onload = e => {
        if (firstFile) {
          vm.correlation.setArray(e.target.result, firstInput = true)
          vm.regression.setArray(e.target.result, firstInput = true)
          vm.x = e.target.result;
        } else {
          vm.correlation.setArray(e.target.result, firstInput = false)
          vm.regression.setArray(e.target.result, firstInput = false)
          vm.y = e.target.result;
        }
      }
      reader.readAsText(file)
    },
    generateCorrelation: function () {
      this.correlationOutput = this.correlation.getCorrelation()
    },
    generateRegression: function () {
      this.regressionOutput = this.regression.getRegression()
    }
  }
})
