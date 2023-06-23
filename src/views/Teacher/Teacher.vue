<template>
    <MainHeader staff_title="O'qituvchilar" add_staff="O'qituvchi qo'shish"/>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr class="font-bold">
                <th scope="col" class="px-6 py-3">
                    F.I.O
                </th>
                <th scope="col" class="px-6 py-3">
                    Fan o'qituvchisi
                </th>
                <th scope="col" class="px-6 py-3">
                    Telefon raqami
                </th>
                <th scope="col" class="px-6 py-3">
                    Holati
                </th>
                <th scope="col" class="px-6 py-3">
                    To'liq
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="bg-blue-600 py-2 px-4 font-medium text-white rounded-lg dark:text-blue-500 hover:underline">Kirish</a>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>

</template>

<script setup>
    import MainHeader from '../../components/MainHeader.vue'
</script>

<style lang="scss" scoped>

</style>