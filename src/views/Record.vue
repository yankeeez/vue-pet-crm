<template>
  <div>
    <div class="page-title">
      <h3>New recoed</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">You should create categories first. <router-link to="categories">Manage categories</router-link></p>

    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >{{c.title}}</option>
        </select>
        <label>Category</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Outcome</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invlaid: ($v.amount.$dirty && !$v.amount.minValue)}"
        >
        <label for="amount">Total</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >Should be more than {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invlaid: ($v.description.$dirty && !$v.description.required)}"
        >
        <label for="description">Description</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >Description is required</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Add new record
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
  name: 'Record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    //for select element rendering, add init to queue and wait for form creating
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  validations: {
    description: { required },
    amount: { minValue: minValue(1) }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.getUserInfo.bill + this.amount
            : this.getUserInfo.bill - this.amount

          await this.$store.dispatch('updateUserInfo', {bill})
          this.$message('New record created successfully')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {
        }
      } else {
        this.$message('Oops, this is too large outcome!')
      }
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.getUserInfo.bill >= this.amount
    }
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
}
</script>

<!--<style scoped>-->

<!--</style>-->
