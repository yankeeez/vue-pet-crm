<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{getUserInfo.bill | currency('UAH')}}</h4>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class="center">You should create categories first. <router-link to="categories">Manage categories</router-link></p>

    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend | currency('UAH')}} of {{category.limit | currency('UAH')}}
        </p>
        <div class="progress" v-tooltip-directive="category.tooltipValue">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import currencyFilter from '../filters/currency.filter'
  // import category from '../store/category'
  export default {
    name: 'Planning',
    data: () => ({
      loading: true,
      categories: []
    }),
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.categories = categories.map(category => {
        const spend = records
          .filter(r => r.categoryId === category.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)

        const percent = 100 * spend / category.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        const balance = category.limit - spend
        const tooltipValue = `${balance < 0 ? 'More than ' : 'Left '} ${currencyFilter(Math.abs(balance))} `

        return {
          ...category,
          progressColor,
          progressPercent,
          spend,
          tooltipValue
        }
      })

      this.loading = false
    }
  }
</script>
