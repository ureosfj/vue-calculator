import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalcStore = defineStore('calc', () => {
  const figureShown = ref('0')
  const prevFigureShown = ref('')
  const secondPrevFigureShown = ref('')
  const operation = ref('')
  const hasResult = ref(false)

  function addDigit(lastFigure: string) {
    if (hasResult.value === true) {
      resetAll() // reset after result, on new number click 
    }
    if (figureShown.value == '0' && lastFigure != '.') { // on start is 0, if press '.' go to else, to have '0.' and not only '.'
      figureShown.value = lastFigure
    } else {
      figureShown.value += lastFigure
    }
  }
  function savePrevFigure() {
    prevFigureShown.value = figureShown.value
  }
  function resetLast() {
    figureShown.value = '0'

  }
  function resetAll() {
    figureShown.value = '0'
    prevFigureShown.value = ''
    secondPrevFigureShown.value = ''
    operation.value = ''
    hasResult.value = false

  }

  function setOperation(op: string) {
    operation.value = op
  }
  function getResult() {
    let result = 0
    if (secondPrevFigureShown.value === '') secondPrevFigureShown.value = figureShown.value
    else { // when pressing = continuosly
      prevFigureShown.value = figureShown.value
      figureShown.value = secondPrevFigureShown.value
    }

    if (operation.value === '-') {
      result = parseFloat(prevFigureShown.value) - parseFloat(figureShown.value)
      figureShown.value = result.toString()
    }
    else if (operation.value === '+') {
      result = parseFloat(prevFigureShown.value) + parseFloat(figureShown.value)
      figureShown.value = result.toString()
    }
    else if (operation.value === '/') {
      result = parseFloat(prevFigureShown.value) / parseFloat(figureShown.value)
      figureShown.value = result.toString()
    }
    else if (operation.value === 'x') {
      result = parseFloat(prevFigureShown.value) * parseFloat(figureShown.value)
      figureShown.value = result.toString()
    }
    else if (operation.value === '√') {
      result = Math.sqrt(parseFloat(prevFigureShown.value))
      figureShown.value = result.toString()

      // √ has't figures on left, change only on right of operator
      secondPrevFigureShown.value = prevFigureShown.value
      prevFigureShown.value = ''

    }
    else if (operation.value === '%') {
      result = parseFloat(prevFigureShown.value) / 100
      figureShown.value = result.toString()
    }
    hasResult.value = true

  }
  function printStoreValues() {
    console.log(figureShown.value, prevFigureShown.value, operation.value);

  }
  return { figureShown, prevFigureShown, operation, secondPrevFigureShown, addDigit, savePrevFigure, resetLast, resetAll, setOperation, getResult, printStoreValues }
})

