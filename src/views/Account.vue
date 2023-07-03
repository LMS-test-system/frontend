<template>
  <button @click="back" class="flex items-center bg-blue-300 px-2 py-1 rounded-md my-2"><i class='bx bx-left-arrow-alt text-[22px]'></i>Back</button>
  <div class="flex gap-10 ">
    <div v-if="user" class="flex flex-col gap-2">
      <img v-if="user.image" :src="`${api_url}/image/file/${user.image?.file_name}`" class="w-[210px] h-[250px]" alt="">
      <img v-else src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" class="w-[210px] h-[250px]"  alt="">
      <div class="flex items-center justify-around"><span>change avatar</span><button @click="toggleModal2" class="bg-gray-400 px-2 rounded-md text-green-200 focus:ring-1 focus:ring-blue-700 w-[50px] pt-1"><i class='bx bx-cloud-upload text-[24px]' ></i></button></div>
      
    </div>
    <div class="flex flex-col items-start gap-2">
      <p>F.I.O: <span class="bg-gray-200 px-2 py-1 rounded-md">{{ user.full_name }}</span></p>
      <p>Email: <span class="bg-gray-200 px-2 py-1 rounded-md">{{ user.email }}</span></p>
      <p>Phone: <span class="bg-gray-200 px-2 py-1 rounded-md">{{ user.phone }}</span></p>
      <p>Telegram: <span class="bg-gray-200 px-2 py-1 rounded-md">{{ user.telegram }}</span></p>
      <!-- <p>Login: <span class="bg-gray-200 px-2 py-1 rounded-md">{{ user.login }}</span></p> -->
      <button @click="updateInfo" class="bg-blue-500 px-2 py-1 rounded-md text-white focus:ring-1 focus:ring-blue-700 w-[160px]">update info</button>
    </div>
    <div>
    </div>
  </div>

  <div tabindex="-1" aria-hidden="true" class="overflow-y-auto flex bg-[rgba(0,0,0,0.4)] overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full" :class="modal2 ? '' : 'hidden'">
        
        <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <!-- Modal content -->
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <!-- Modal header -->
                <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                 
                    <button @click='toggleModal2' type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form >
                    <div class="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                            <label for="icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                            <input type="file" @change="uploadImage($event)"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 " placeholder="Upload image" required="">
                        </div>
                    </div>
                  
                    <button @click="updateImage($event)" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Update
                    </button>
                </form>
            </div>
        </div>
    </div>

            <!-- Main modal -->
        <div tabindex="-1" aria-hidden="true" class="overflow-y-auto flex bg-[rgba(0,0,0,0.4)] overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full" :class="modal ? '' : 'hidden'">
            <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <!-- Modal header -->
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            
                        </h3>
                        <button @click='toggleModal' type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form >
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <div class="flex justify-between items-center gap-4 flex-wrap">
                                <div class="w-full">
                                    <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To'liq ismi</label>
                                    <input v-model="contactInfo.full_name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I.F.O" required="">
                                </div>
                                <div class="w-[48%]">
                                    <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon raqami</label>
                                    <input v-model="contactInfo.phone_number" type="text" name="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+998901234567" required="">
                                </div>
                                <div class="w-[48%]">
                                    <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input v-model="contactInfo.email" type="email" name="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="student@mail.uz" required="">
                                </div>
                                <div class="w-full">
                                    <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telegram link</label>
                                    <input v-model="contactInfo.telegram_link" type="text" name="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://t.me/username" required="">
                                </div>
                            </div>
                            <div class="flex  justify-between items-center gap-4">
                                <div class="w-1/2">
                                    <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Yangi Login</label>
                                    <input v-model="contactInfo.login" type="text" name="login" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Loginni kiriting!" required="">
                                </div>
                                <div class="w-1/2">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Yangi Parol</label>
                                    <input v-model="contactInfo.password" type="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*************" required="">
                                </div>
                            </div>
                            
                        </div>
                        <div class="flex justify-end items-center">
                            <button  @click="modifyContact($event)" type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Yangilash
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- -------------------------end of modal------------------------------------- -->
</template>

<script setup>
import {onMounted, ref, reactive} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { authService } from "../services/auth";

const router = useRouter()
const route = useRoute()
const id = route.params.id
const user = ref([])
const modal = ref(false);
const modal2 = ref(false)
const api_url = import.meta.env.VITE_API_BASE_URL;

const contactInfo = reactive({
        full_name: '',
        phone_number: '',
        email: '',
        telegram_link: '',
        login: '',
        password: '',
})

const updateInfo=()=>{
  contactInfo.full_name = user.value.full_name
  contactInfo.phone_number = user.value.phone
  contactInfo.email = user.value.email
  contactInfo.telegram_link = user.value.telegram
  toggleModal();
}

const modifyContact=(event)=>{
      event.preventDefault();
      let formdata  = new FormData();
      formdata.append('full_name', contactInfo.full_name)
      formdata.append('phone', contactInfo.phone_number)
      formdata.append('email', contactInfo.email)
      formdata.append('telegram', contactInfo.telegram_link)
      if(contactInfo.login.trim() != ''){
        formdata.append('login', contactInfo.login)
      }
      if(contactInfo.password.trim() != ''){
        formdata.append('password', contactInfo.password)
      }
      const role = localStorage.getItem('login_role')

      authService.update(id, role, formdata).then((res)=>{
        toggleModal()
        getUser()
      }).catch((error)=>{
          if(error.message == 'Request failed with status code 401' || error.message == 'token expired' || error.message == 'token not found'){
              router.push({name: 'login'})
          }
          console.log(error);

      })
  }

const toggleModal = () => {
    modal.value = !modal.value
}

const back = ()=>{
    router.go(-1)
}



function toggleModal2() {
    modal2.value = !modal2.value
}


let  formdata 

const uploadImage = e => {
    e.preventDefault()
    formdata = new FormData();
    formdata.append('images', e.target.files[0])
}

const updateImage = (event) =>{
    event.preventDefault();
    const role = localStorage.getItem('login_role')

    authService.update(id, role, formdata).then((res)=>{
        toggleModal2()
        getUser()
    }).catch((error)=>{
        if(error.message == 'Request failed with status code 401' || error.message == 'token expired' || error.message == 'token not found'){
            router.push({name: 'login'})
        }
        console.log(error);
        toast.error(error.message)
    })
}

const getUser = () =>{
  const role = localStorage.getItem('login_role')
    
  authService.getOneInfo(id, role).then((res)=>{
      user.value = res.data
  });
}

onMounted(() => {

  getUser()
   
}) 
</script>

<style scoped>

</style>
