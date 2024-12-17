<template>
  <table class="w-full">
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index"
          :class="[
            'font-rubik text-center items-center py-5 px-4 font-medium text-xs leading-3 text-grey-800',
            headerClasses[index] || '',
          ]"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, rowIndex) in data"
        :key="rowIndex"
        class="w-full"
      >
        <td class="h-16 px-4 py-6 text-center bg-white rounded-md"
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          :class="['font-rubik text-sm/[15px] leading-5 text-right flex-col justify-center items-center text-black-100', columnClasses[colIndex] || '']"
        >
          <slot :name="'cell-' + column" :row="row" :value="row[column]">
            {{ row[column] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  headerClasses: {
    type: Array,
    default: () => [],
  },
  columnClasses: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 5px;
}

th,
td {
  text-align: left;
  padding: 8px;
}
</style>
