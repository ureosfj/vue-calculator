<script>
import numberButton from '../components/numberButton.vue'
import { useCalcStore } from '@/stores/calc.ts'

export default {
  components: {
    numberButton
  },
  data() {
    return {
      buttonsList: [['%', '√', 'CE', 'C'], [7, 8, 9, '-'], [4, 5, 6, '/'], [1, 2, 3, 'x'], ['.', 0, '=', '+']],


    }
  },
  computed: {
    result() {
      const res = useCalcStore().figureShown
      if (res.includes('NaN')) {
        useCalcStore().resetAll()
        return ''
      }
      else {return res}
    },
    prevResult(){
      let res = useCalcStore().prevFigureShown + ' ' + useCalcStore().operation + ' ' +  useCalcStore().secondPrevFigureShown
      if (useCalcStore().operation === '%') res = this.result
      return res
    }
  },
}
</script>

<template>
  <div class="calc">
    <div class="title">Calculator</div>
    <div class="prevResult"> {{prevResult}} </div>
    <div class="result">{{ result }}</div>
    <div></div>
    <div v-for="line in buttonsList" :key="line" class="line">
      <div v-for="number in line" :key="number">

        <numberButton :number="number"></numberButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
body{
}
.calc {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 10px solid green;
  scale: 1.5;
  background-color: green;
  padding: 0 10px 0 10px;
  font-size: 23px;

}

.title {
  text-align: center;
  margin-bottom: 5px;
}

.result {
  text-align: right;
  width: 210px;
  height: 25px;
  background-color: black;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
}
.prevResult{
  text-align: right;
  background-color: greenyellow;
  padding: 5px;
  margin-left: 2px;
  margin-right: 1px;
  height: 20px;
  font-size: 15px;


}
.line {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 200px;
}

.button {
  width: 50px;
}
</style>
