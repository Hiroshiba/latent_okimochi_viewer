import ops from 'ndarray-ops'
import numjs from 'NumJs'

numjs.NdArray.prototype.log = function (copy = true) {
  const arr = copy ? this.clone() : this

  ops.logeq(arr.selection)
  return arr
}

numjs.log = function (x) {
  return numjs.NdArray.new(x).log()
}

export default {
  randomLatent (shape) {
    const x = numjs.random(shape)
    const y = numjs.random(shape)
    return x.log().multiply(-2.0, false).sqrt(false).multiply(numjs.sin(y.multiply(2.0 * Math.PI, false)), false)
  }
}
