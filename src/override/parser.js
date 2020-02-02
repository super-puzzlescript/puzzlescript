function logErrorCacheable (str, lineNumber, urgent) {
  if (compiling || urgent) {
    if (lineNumber === undefined) {
      return logErrorNoLine(str)
    }
    const errorString = 'line ' + lineNumber.toString() + ' : %c' + str
     if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
      //do nothing, duplicate error
     } else {
      logger.log(errorString, 'color: #f00')
      errorStrings.push(errorString)
      errorCount++
    }
  }
}

function logError (str, lineNumber, urgent) {
  if (compiling || urgent) {
    if (lineNumber === undefined) {
      return logErrorNoLine(str, urgent)
    }
    const errorString = 'line ' + lineNumber.toString() + ' : %c' + str
    if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
      //do nothing, duplicate error
    } else {
      logger.log(errorString, 'color: #f00')
      errorStrings.push(errorString)
      errorCount++
    }
  }
}

function logWarning (str, lineNumber, urgent) {
  if (compiling || urgent) {
    if (lineNumber === undefined) {
      return logErrorNoLine(str)
    }
    const errorString = 'line ' + lineNumber.toString() + ' : %c' + str
    if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
      //do nothing, duplicate error
    } else {
      logger.log(errorString, 'color: #ffa500')
      errorStrings.push(errorString)
    }
  }
}

function logErrorNoLine (str, urgent) {
  if (compiling || urgent) {
    const errorString = '%c' + str
    if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
      //do nothing, duplicate error
    } else {
      logger.log(errorString, 'color: #f00')
      errorStrings.push(errorString)
    }
    errorCount++
  }
}

function logBetaMessage (str, urgent) {
  if (compiling || urgent) {
    const errorString = '%c' + str
    if (errorStrings.indexOf(errorString) >= 0 && !urgent) {
      //do nothing, duplicate error
    } else {
      logger.log(errorString, 'color: #ffa500')
      errorStrings.push(errorString)
    }
  }
}
