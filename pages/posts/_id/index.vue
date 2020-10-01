<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">last updated: {{ loadedPost.updatedDate }}</div>
        <div class="post-detail">author: {{ loadedPost.author }}</div>
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        let me know what you think of the post.
        email <a href="mailto:feedback@micah.dev">me</a>
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
    // return new Promise((resolve, reject) => {
    //   // reject(new Error())
    //   setTimeout(() => {
    //     resolve({
    //       loadedPost: {
    //         id: '1',
    //         title: 'First Post (ID:' + params.id + ')',
    //         previewText: 'This is our first post',
    //         author: 'Micah',
    //         updatedDate: new Date(),
    //         content: 'Some dummy text which is not the preview text tho',
    //         thumbnail: 'https://www.morganstanley.com/pub/content/dam/msdotcom/ideas/rise-of-the-tech-super-platforms/tw-rise-of-tech.jpg'
    //         }
    //       })
    //     }, 1000)
    //   }).then(data => {
    //     return data
    //   }).catch(e => {
    //     error(e)
    //   })
    // try {
    //   const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))
    //   await wait(1000)
    //   return {
    //     loadedPost: {
    //         id: '1',
    //         title: 'First Post (ID:' + params.id + ')',
    //         previewText: 'This is our first post',
    //         author: 'Micah',
    //         updatedDate: new Date(),
    //         content: 'Some dummy text which is not the preview text tho',
    //         thumbnail: 'https://www.morganstanley.com/pub/content/dam/msdotcom/ideas/rise-of-the-tech-super-platforms/tw-rise-of-tech.jpg'
    //     }
    //   }
    // }
    // catch (err) {
    //   error()
    // }
  }
}
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
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
