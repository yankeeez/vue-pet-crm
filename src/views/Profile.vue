<template>
  <div>
    <div class="page-title">
      <h3>{{'profile.title' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">Name</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >Name is required</small>
      </div>
<!--      not best decision, better to use select  -->
      <div class="switch">
        <label>
          EN
          <input type="checkbox" v-model="locale">
          <span class="lever"></span>
          RU
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Update
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { required } from 'vuelidate/lib/validators'
  export default {
    name: 'Profile',
    data: () => ({
      name: '',
      locale: ''
    }),
    validations: {
      name: { required },
    },
    mounted () {
      this.name = this.getUserInfo.name
      this.locale = this.getUserInfo.locale
      setTimeout(() => {
        M.updateTextFields()
      }, 0)
    },
    computed: {
      ...mapGetters(['getUserInfo'])
    },
    methods: {
      ...mapActions(['updateUserInfo']),
      async submitHandler () {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        try {
          await this.updateUserInfo({
            name: this.name,
            locale: this.locale ? 'ru-RU' : 'en-EN'
          })
        } catch (e) {
          throw e
        }
      }
    }
  }
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
