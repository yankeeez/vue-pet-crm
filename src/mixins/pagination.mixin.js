import _ from 'lodash'

export default {
  data() {
    return {
      defaultPage: +this.$route.query.page || 1,
      pageSize: 10,
      pageCount: 0,
      items: [],
      itemsToShow: []
    }
  },
  methods: {
    setupPagination (items) {
      this.items = _.chunk(items, this.pageSize)
      this.pageCount = _.size(this.items)
      this.itemsToShow = this.items[this.defaultPage - 1] || this.items[0]
    },
    changePageHandler (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.itemsToShow = this.items[page - 1] || this.items[0]
    }
  }
}
