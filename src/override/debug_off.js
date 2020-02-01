function stripHtmlTags (str) {
  str = str.replace(/<br>/g, '\n')
  const div = document.createElement("div")
  div.innerHTML = str
  const result = div.textContent || div.innerText || ""
  return result
}

function consolePrint (str) {
  logger.log(stripHtmlTags(str))
}

function consolePrintFromRule(str, rule){
  const ruleDirection = dirMaskName[rule.direction];
  const logString = 'Rule ' + rule.lineNumber + ' ' + ruleDirection + " : "  + str;

  logger.log(logString)
}

function consoleCacheDump (str) {}

function consoleError (str) {
  logger.error(stripHtmlTags(str))
}

function clearInputHistory() {}
function pushInput(inp) {}
