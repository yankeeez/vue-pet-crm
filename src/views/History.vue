<template>
  <div>
    <div class="page-title">
      <h3>History</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!records.length" class="center">You should add records. <router-link to="record">Add records</router-link></p>

    <section v-else>
      <HistoryTable :records="itemsToShow"/>

      <Paginate
        v-model="defaultPage"
        :page-count="pageCount"
        :click-handler="changePageHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
  import paginationMixin from '@/mixins/pagination.mixin'
  import HistoryTable from '../components/HistoryTable'
  export default {
    name: 'History',
    mixins: [paginationMixin],
    data: () => ({
      loading: true,
      records: [],
    }),
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Income' : 'Outcome',
        }
      }))

      this.loading = false
    },
    components: {
      HistoryTable
    }
  }
</script>

<!--<style scoped>-->

<!--</style>-->
