<template>
  <div class="flex flex-col">
    <div class="font-semibold text-xl py-4">Admins</div>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="flex flex-row justify-center items-center w-full"
        >
          <img class="inline-block h-10 w-10 rounded-full object-cover" src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=750&amp;w=1260" alt="username">
          <span class="ml-2 font-bold text-2xl text-gray-600">Ali</span>
          <span class="inline-block connected text-green-500 ml-2">
            <svg width="6" height="6">
              <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
            </svg>
          </span>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <EditIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                />
                Edit
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <DuplicateIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                />
                Duplicate
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <ArchiveIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                />
                Archive
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <MoveIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                />
                Move
              </button>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                <DeleteIcon
                  :active="active"
                  class="w-5 h-5 mr-2 text-violet-400"
                  aria-hidden="true"
                />
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  // import { defineComponent } from 'vue'
  // export default defineComponent({
  //   components: { Menu, MenuButton, MenuItems, MenuItem }
  // })
</script>
