<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.categoryColor">
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    not sure that is correct checking of invalid record -->
    <p class="center" v-else>Can't find the record</p>
  </div>
</template>

<script>
  export default {
    name: 'DetailRecord',
    data: () => ({
      record: null,
      loading: true
    }),
    async mounted () {
      const id = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecord', id)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.record = {
        ...record,
        categoryName: category.title,
        categoryColor: record.type === 'outcome' ? 'red' : 'green'
      }

      this.loading = false
    }
  }
</script>
