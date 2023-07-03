<template>
    <div class="container mx-auto">
        <div class="flex items-center justify-between">
            <h2 class="text-[20px] mb-2">{{test.name}}</h2>
            <div class="flex flex-col items-center justify-center gap-2">
                <div class="flex gap-0">
                    <p class="bg-black text-white rounded-l-md w-10 h-8 flex items-center justify-center text-[22px]">{{min}}</p> <p class="text-[20px] font-bold bg-black text-white">:</p> <p class="bg-black text-white px-2 py-1 rounded-r-md w-10 h-8 flex items-center justify-center text-[22px]">{{sec}}</p>
                </div>
                <button @click="finishTest" class="bg-green-400 px-3 py-1 rounded-full border border-black focus:ring-2">Testni yakunlash</button>
            </div>
        </div>
        <div class="relative">
            <div class="flex items-center justify-between">
                <p>Savollar:</p>
                
            </div>
            <div class="">
                <button v-for="(el, index) in result" :key="el.id" @click="selectQuestion(index)" class=" my-2 px-3 border rounded-md py-1 hover:bg-green-300 ml-1 focus:bg-blue-300" :class="(el.answer_id && questionIndex==index) ? 'bg-blue-300' : (questionIndex==index) ? 'bg-blue-300' : el.answer_id ? 'bg-green-300' : '' ">{{index+1}}</button>
            </div>
            <div  class="bg-white rounded-md w-full p-3 absolute top-32">
                <div v-for="(el, index) in test.question" :key="el.id" :class="index == questionIndex ? 'block z-20' : 'hidden'">
                    <p class="p-3 text-[18px]">{{el.question}}</p>
                    <hr>
                    <div v-for="ans in el.answer" class="flex items-center justify-start gap-2 mt-2">
                        <input  type="radio" :name="index" :value="ans.id" @change="setAnswer($event, index)"> {{ans.answer}}
                    </div>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";
import { testService } from "../services/studentTests";
import { useAuthStore } from "../stores/auth/auth";

const store = useAuthStore();

const limit = ref(0);
const min = ref(0);
const sec = ref(0)
const questionIndex = ref(0);

const router = useRouter();
const route = useRoute();

const id = route.params.id

const test = ref([])
const result = ref([])

let timer=null;

const submitAnswers = async () => {
    const staff_id = store.getStaffId
    const results_with_answer = result.value.filter(res => res.answer_id !== undefined);
    try {
        const resultBackend = await testService.createResult({student_id:staff_id, time_spent: +limit.value, test_id: id })
        for(let i=0; i<results_with_answer.length; i++){
            const result_question = await testService.createResultQuestion({is_right:result.value[i].is_right,  question_id: result.value[i].question_id, result_id: resultBackend.data.id})
            await testService.createResultAnswer({answer_id:results_with_answer[i].answer_id, result_question_id: result_question.data.id})
        }
        ElNotification({
            title: "Test submited",
            type: "success",
      });
    } catch (error) {
       const message = error?.response?.data?.message;
      if (typeof message == "object") {
        for (let i of message) {
          ElNotification({
            title: "Error",
            message: i,
            type: "warning",
          });
        }
      } else {
        ElNotification({
          title: "Error",
          message: message,
          type: "warning",
        });
      } 
    }
   
}   


const finishTest = () => {
    router.push('/test')
}


const startTimer = () => {
    timer = setInterval(()=>{
    limit.value --;
    const { minutes, seconds } = parseSeconds(limit.value);
    min.value = String(minutes).padStart(2, '0');
    sec.value = String(seconds).padStart(2, '0');;
    if(limit.value == 0){
        clearInterval(timer)
        ElNotification({
          title: "Your time is up",
          type: "warning",
        });
       
        router.push('/test')
    }
    },1000)
}

const setAnswer = (event, index) => {
    event.preventDefault();
    result.value[index].answer_id = event.target.value;
}

const selectQuestion = (index) => {
    questionIndex.value = index
}


onMounted(()=>{
    testService.getOne(id).then((res)=>{
        console.log(res.data);
        limit.value = res.data.time_limit*60;
        // limit.value = '10';
        test.value = res.data;
        res.data.question.forEach(item => {
            result.value.push({question_id:item.id, is_right: true})
        })
        startTimer()
        
    })

    

})


onBeforeRouteLeave(async (to, from, next) => {
    if(limit.value == 0){
        await submitAnswers();
        next();
    }else{
        const answer = window.confirm(
        'Test tugatiladi va javoblar qabul qilinadi, davom ettirishni hohlaysizmi?'
        )
        if(!answer){
            return false;
        }else{
            await submitAnswers()
            clearInterval(timer)
            next()
        }
    }
    
})



function parseSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return { minutes, seconds: remainingSeconds };
}



</script>

<style lang="scss" scoped>

</style>