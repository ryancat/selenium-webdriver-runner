const {driverMixin, pipeMixin} = require('../../../../mixins/forDriver')

// console.log('driverMixin.startDriver', driverMixin.startDriver)

/**
 * Add mixin to instance object
 * 
 * @param {Object} instance 
 * @param {Object} mixinObj 
 */
const addMixin = (instance, mixinObj) => {
  for (let key in mixinObj) {
    if (mixinObj.hasOwnProperty(key)) {
      let val = mixinObj[key]
      if (val !== undefined && instance[key] === undefined) {
        instance[key] = val.bind ? val.bind(instance) : val
      }
    }
  }

  return instance
}

module.exports = class TodoAppPage {
  constructor () {
    // Add mixin for driver methods
    addMixin(this, driverMixin)
    addMixin(this, pipeMixin)
  }

  open () {

  }

  clickAddItemButton () {

  }
}