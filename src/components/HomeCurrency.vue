<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Currencies</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="currency of currencies" :key="currency">
            <td>{{currency}}</td>
            <td>{{rates[currency]}}</td>
            <td>{{date | date('date')}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCurrency',
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['UAH', 'EUR', 'USD']
  })
}
</script>

<!--<style scoped>-->

<!--</style>-->
