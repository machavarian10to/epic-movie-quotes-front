<template>
  <div>
    <select
      class="bg-transparent text-white focus:outline-none text-md"
      v-model="$i18n.locale"
    >
      <option
        class="text-black p-5"
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>
