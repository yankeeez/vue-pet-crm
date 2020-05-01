<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Account info</span>

        <p
          v-for="currency of currencies"
          :key="currency"
          class="currency-line">
          <span>{{ getCurrency(currency) | currency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBill',
  props: ['rates'],
  data: () => ({
    currencies: ['UAH', 'USD', 'EUR']
  }),
  computed: {
    // need to convert all to UAH, Fixer's free plan supports only EUR as base currency
    base () {
      // console.log('A'.this.$store.getters.getUserInfo.bill)
      // console.log('b'.this.rates.UAH)
      // console.log('c'.this.rates.EUR)
      return this.$store.getters.getUserInfo.bill / (this.rates.UAH / this.rates.EUR)
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>

<!--<style scoped>-->

<!--</style>-->
