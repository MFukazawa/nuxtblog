<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  asyncData({ params, error }) {
    return axios.get('https://nuxt-blog-86397.firebaseio.com/posts/' + params.postId + '.json')
      .then(res => {
        return {
          loadedPost: { ...res.data, id: params.postId }
        }
      })
      .catch(e => error(e))
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch('editPost', editedPost)
      .then(() => {
        this.$router.push("/admin")
      })
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
