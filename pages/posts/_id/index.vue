<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">Last Updated: {{ loadedPost.updatedDate | toJpDate }}</div>
        <div class="post-detail">By: {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        Send me your thoughts!
        Email <a href="mailto:micahfukazawa@gmail.com">me.</a>
      </p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  asyncData({ params, error }) {
    return axios.get('https://nuxt-blog-86397.firebaseio.com/posts/' + params.id + '.json')
      .then(res => {
        return {
          loadedPost: res.data
        }
      })
      .catch(e => error(e))
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px 30px 0;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

.post {
  width: 100%;
  flex: 1;
}

.post-feedback {
  flex-shrink: 0;
}

.post-content {
  margin: 20px auto;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}

</style>
