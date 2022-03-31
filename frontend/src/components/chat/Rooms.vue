<template>
	<div class="w-20 group hover:!w-80 lg:hover:!w-1/3 lg:w-1/3 h-full flex flex-col border-r transition-all duration-300">
		<ul class="flex flex-col h-full w-full overflow-y-scroll hide-scroll">
			<li class="w-full flex flow-row items-center even:bg-slate-100" v-for="room in rooms" :key="room.id">
				<a style="min-height: 4rem;" class="hover:bg-gray-100 w-full px-3 h-20 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
					<img class="h-10 w-10 rounded-full object-cover m-auto lg:m-0" src="../../assets/userIcon.svg">
					<div class="w-full py-2 group-hover:!block hidden lg:block">
						<div class="flex font-semibold text-base text-gray-600 w-full">
							<span class="block ml-2 font-semibold text-sm text-gray-600 "> {{ room.name }}</span>
							<span class="block ml-auto text-xs text-gray-600">5 minutes</span>
						</div>
						<span class="block ml-2 text-xs text-gray-600 text-left line-clamp-2"> {{ room.msg }} </span>
					</div>
				</a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		const rooms = [
			{
				id: 1,
				name: "OCP GANG",
				msg: "lorem ipsum msg"
			},
			{
				id: 2,
				name: "OCP GANG",
				msg: "lorem ipsum msg"
			},
			{
				id: 3,
				name: "OCP GANG",
				msg: "lorem ipsum msg"
			},
			{
				id: 4,
				name: "OCP GANG",
				msg: "lorem ipsum msg sdfsd fsd fsd fsdfsdfsd fsdfsdfsd"
			},
			...[...Array(18)].map((_, i) => ({
				id: 4 + i + 1,
				name: "OCP GANG",
				msg: "lorem ipsum msg sdfsd fsd fsd fsdfsdfsd fsdfsdfsd"
			}))
		]
		return { rooms }
	},
})
</script>


<style>
hide-scroll::-webkit-scrollbar {
    display: none !important;
}
  
.hide-scroll {
	-ms-overflow-style: none !important;  /* IE and Edge */
	scrollbar-width: none !important;  /* Firefox */
}
</style>
