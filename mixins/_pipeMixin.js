
module.exports = {
  /**
   * Pipe the task(s) in promise way. The task will pipe up
   * until 'done' is called. You need to either await the
   * done function, or use promise API to handle the done
   * function.
   * 
   * @param {Array|String|Function} args 
   */
  pipe: function (...args) {
    this._piped = args.reduce(
      (prevPromise, nextPromiseCreator) => {
        return prevPromise.then((prevResolved) => this._getTaskToPipe(nextPromiseCreator)(prevResolved))
      }, 
      this._piped)
    
    // Add pipe to _piped so we can chain the pipe
    return this
  },

  /**
   * Return the piped promise chain with catch function for exceptions
   * @param {Function} onExceptionHandle 
   */
  done (onExceptionHandle = errorLog) {
    return this._piped.catch(onExceptionHandle)
  },

  _getTaskToPipe: function (nextPromiseCreator) {
    let promiseCreatorType = Object.prototype.toString.call(nextPromiseCreator),
        taskToPipe = nextPromiseCreator

    if (promiseCreatorType !== '[object Function]'
    && promiseCreatorType !== '[object AsyncFunction]') {
      // When we get non-function value, we need to transform it into a function
      // that supposely returns promise (for example, async functions).
      switch (promiseCreatorType) {
        case '[object String]':
          // When we see a string, we will try to pipe the corresponding function
          // on the context for the pipe runner
          taskToPipe = this.context[nextPromiseCreator]
          ? this.context[nextPromiseCreator].bind(this.context)
          : () => Promise.reject(`Task not found in context: ${nextPromiseCreator}`)
          break

        case '[object Array]':
          // When we see an array, we will try to pipe the elements inside and try to
          // finish them asap with Promise.all
          taskToPipe = (prevResolved) => Promise.all(
            nextPromiseCreator.map((nextPromiseCreatorTask) => this._getTaskToPipe(nextPromiseCreatorTask)(prevResolved))
          )
          break

        default:
          taskToPipe = () => Promise.reject(`Cannot pipe task: ${nextPromiseCreator}`)
      }
    }

    return taskToPipe
  }
}