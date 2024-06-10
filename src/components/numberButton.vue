<template>
    <div @click="addNumber()" :class="'button prevent-select ' + typeButtonClass">{{ number }}</div>
</template>
<script>
import { useCalcStore } from '@/stores/calc.ts'
export default {
    props: ['number'],
    computed: {
        typeButtonClass(){
            if (['-', '+', '/', 'x', '√','%', '='].includes(this.number.toString())) return 'operation-button'
            if (this.number.toString() === 'CE' || this.number.toString() === 'C') return 'cancel-button'
            else return 'number-button'
        }
    },
    methods: {
        addNumber() {

            if (this.number.toString() === 'CE' || this.number.toString() === 'C') {
                useCalcStore().resetAll() // emulate windows calc
                return
            }
            if (['-', '+', '/', 'x'].includes(this.number.toString())) {
                useCalcStore().savePrevFigure()
                useCalcStore().setOperation(this.number.toString())
                useCalcStore().resetLast()
                return
            }
            if (this.number.toString() === '√' || this.number.toString() === '%') {
                useCalcStore().savePrevFigure()
                useCalcStore().setOperation(this.number.toString())
                useCalcStore().getResult()
                return
            }
            if (this.number.toString() === '=') {

                useCalcStore().printStoreValues()
                useCalcStore().getResult()
                return
            }
            if (this.number.toString() === '.' && useCalcStore().figureShown.includes('.')) { // avoid multiple .
                return
            }
            
            useCalcStore().addDigit(this.number.toString())

            console.log(useCalcStore().figureShown);
        }
    },
}
</script>
<style>
.button {
    background-color: green;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

}

.prevent-select {
    /* avoid highlight when clicking buttons */
    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
}

.number-button{
    background-color: black;
    color: white;
}
.cancel-button{
    background-color: rgb(81, 199, 81);
    color: black;
}

.operation-button{
    background-color: white;
    color: black;
}
</style>