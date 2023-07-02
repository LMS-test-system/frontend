<template>
    <div class="p-3">
        <div class="flex justify-between items-center">
            <h2 class="uppercase dark:text-white text-gray-900 text-xl font-bold">Talabalar</h2>
            <div class="relative hidden md:block">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Search icon</span>
                </div>
                <input v-model="contactInfo1.searchData" type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Izlash uchun yozing ...">
            </div>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-end mt-10 space-y-3 md:space-y-0 md:space-x-4 py-3">
        <button @click="toggleModal" type="button" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2">
            Talaba qo'shish
        </button>
        </div>
        <!-- Main modal -->
        <div tabindex="-1" aria-hidden="true" class="overflow-y-auto flex bg-[rgba(0,0,0,0.4)] overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full" :class="modal ? '' : 'hidden'">
            <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <!-- Modal header -->
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            <span v-if="!isUpdate">Yangi talaba qo'shish</span>
                            <span v-else>Talaba ma'lumotini yangilash</span>
                        </h3>
                        <button @click='toggleModal' type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form >
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <div class="flex justify-between items-center gap-4">
                                <div class="w-1/2">
                                    <label for="full_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To'liq ismi</label>
                                    <input v-model="contactInfo.full_name" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="I.F.O" required="">
                                </div>
                                <div class="w-1/2">
                                    <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefon raqami</label>
                                    <input v-model="contactInfo.phone_number" type="text" name="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+998901234567" required="">
                                </div>
                            </div>
                            <div class="flex  justify-between items-center gap-4">
                                <div class="w-1/2">
                                    <label for="login" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login</label>
                                    <input v-model="contactInfo.login" type="text" name="login" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Loginni kiriting!" required="">
                                </div>
                                <div class="w-1/2">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parol</label>
                                    <input v-model="contactInfo.password" type="password" name="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*************" required="">
                                </div>
                            </div>
                            <div class="flex justify-beetwen items-center gap-4">
                                <div class="w-1/2">
                                    <select id="category" class="block w-[95%] mt-2 text-sm text-gray-900 rounded-md border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-2">
                                      <option value="Guruhni tanlang">Guruhni tanlang</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end items-center">
                            <button v-if="!isUpdate" @click="addContact($event)" type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Qo'shish
                            </button>
                            <button v-else @click="modifyContact($event)" type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Yangilash
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- -------------------------end of modal------------------------------------- -->
    
        <section class=" p-0 sm:p-5 md:p-0 md:py-4">
        <!-- ------------------------table-------------------------------------------- -->
        <div class="w-full xl px-0 lg:p-0">
            <!-- Start coding here -->
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm table-auto">
                        <thead class="text-md text-white font-bold uppercase bg-gray-500 ">
                            <tr class="text-center">
                                <th scope="col" class="px-4 py-3 text-left">I.F.O</th>
                                <th scope="col" class="px-4 py-3">Guruh talabasi</th>
                                <th scope="col" class="px-4 py-3">Telefon raqami</th>
                                <th scope="col" class="px-4 py-3">Holati</th>
                                <th scope="col" class="px-10 py-3 text-center">To'liq</th>
                            </tr>
                        </thead>
                        <tbody class="">
                            <tr class="border-b dark:border-gray-700">
                                <!-- v-for="el in computedList" :key="el.id" -->
                                <td class="px-4 py-3">Full ndfsdfsdfsddfsdfsdfsfame</td>
                                <td class="px-4 py-3"><p class="bg-blue-300 text-teal-900 py-1 text-center rounded-full font-semibold">DI-11-19</p></td>
                                <td class="px-4 py-3"><p class="bg-red-200 text-red-600 py-1 text-center rounded-full font-semibold">+998901234567</p></td>
                                <td class="px-4 py-3"><p class="bg-blue-200 text-green-600 py-1 text-center rounded-full font-semibold">active</p></td>
                                <td class="px-4 py-3 text-[20px]">
                                    <div  class="bg-white flex justify-center items-center gap-4">
                                        <!-- id bo'yicha kiriladi -->
                                        <a href="/about_student" class="px-4 py-1 text-white hover:bg-green-700 text-sm rounded-md bg-green-500"><p>kirish</p></a>
                                        <button @click="updateContact(el.id)">
                                            <div class="w-6 h-6 py-1 rounded-md bg-blue-500 mr-4 cursor-pointer">
                                                <i class="bx bx-task text-white text-[16px] flex items-center justify-center"></i>
                                            </div>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                         </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- -------------------------end of table------------------------------------- -->
        </section>   
      </div>
  </template>
  
  <script setup>
    import {ref, reactive, computed, onMounted} from 'vue'
    import { studentStore } from '../../stores/studentStore';
    import { useStudent } from '../../services/student';
    import {useRouter} from 'vue-router'

    const router = useRouter();
    const store = studentStore();
    const modal = ref(false);
    const isUpdate = ref(false);
    let computedList = ref([])
    
    const contactInfo1 = reactive({
        searchData: ''
    })

    const contactInfo = reactive({
        full_name: '',
        phone_number: '',
        login: '',
        password: ''
    })
    console.log(contactInfo.full_name)
    const toggleModal = () => {
        if(modal.value){
            isUpdate.value = false
            contactInfo.full_name = ''
            contactInfo.phone_number = ''
            contactInfo.login = ''
            contactInfo.password = ''
        }
        modal.value = !modal.value
    }

    const updateList = () => {
        useStudent.list().then((res)=>{
            store.state.list = res.data    
        }).catch((error)=>{
            if(error.message == 'Request failed with login code 401' || error.message == 'token expired' || error.message == 'token not found'){
                router.push({name: 'login'})
            }else{
            console.log(error);

            }
        })
    }

    const addContact=(evet)=>{
        evet.preventDefault();
        const contact = {
            full_name: contactInfo.full_name,
            phone_number: contactInfo.phone_number,
            login: contactInfo.login,
            password: contactInfo.password
        }

        useStudent.create(contact).then((res)=>{
            if(res.login == 201){
                contactInfo.full_name = ''
                contactInfo.phone_number = ''
                contactInfo.login = ''
                contactInfo.password = ''
                toggleModal()
                updateList();
            }
        }).catch((error)=>{
            if(error.message == 'Request failed with login code 401' || error.message == 'token expired' || error.message == 'token not found'){
                router.push({name: 'login'})
            }
            console.log(error);
        })
    }

    const modifyContact=(event)=>{
        event.preventDefault();
        const id  = localStorage.getItem('id')
        const contact = {
            full_name: contactInfo.full_name,
            password: contactInfo.password,
            phone_number: contactInfo.phone_number,
            login: contactInfo.login
        }

        useStudent.update(id, contact).then((res)=>{
            if(res.login == 200){
                contactInfo.full_name=''
                contactInfo.phone_number=''
                contactInfo.login=''
                contactInfo.password=''
                isUpdate.value = false;
                updateList();
                toggleModal()
            }
        }).catch((error)=>{
            if(error.message == 'Request failed with login code 401' || error.message == 'token expired' || error.message == 'token not found'){
                router.push({name: 'login'})
            }
            console.log(error);

        })
    }

    const updateContact = (id)=>{
        localStorage.setItem('id', id)
        isUpdate.value = true;
        const foundContact = store.findOne(id)
        contactInfo.full_name = foundContact[0].full_name
        contactInfo.phone_number = foundContact[0].phone_number
        contactInfo.login = foundContact[0].login
        contactInfo.password = foundContact[0].password
        toggleModal();
    }

    computedList = computed(()=> {
        return store.state.list;
    })
    console.log(computedList)
    onMounted(()=>{
        updateList()
    })
  </script>
  
  <style lang="scss" scoped></style>
  

