<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>Select Category</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invlaid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">Name</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Name is required</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invlaid: ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit">Limit</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Should be more than {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Update
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'

export default {
  name: 'CategoryEdit',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    title: '',
    limit: 100,
    select: null,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) } //todo: need use constant (like at php), because is used in 3 places in component
  },
  watch: {
    current(id) {
      const {title, limit} = this.categories.find(c => c.id === id)
      this.current = id
      this.title = title
      this.limit = limit
    }
  },
  created () {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted () {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        const category = await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Category is updated successfully')
        this.$emit('updated', categoryData)
      } catch (e) {
      }

    }
  }
}
</script>

<style scoped>

</style>
