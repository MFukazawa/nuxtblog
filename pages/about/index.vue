<template>
  <div class="about-page">
    <h1>Nuxt Blog with Firebase</h1>
    <ul class="contents">
      <li>Nuxt.js</li>
      <li>Firebase Database</li>
      <li>Firebase Email/Password Login</li>
    </ul>
  </div>
</template>

<style scoped>
.about-page {
  text-align: center;
  padding: 30px;
}

.contents {
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.contents > li {
  font-size: 1.5rem;
  flex: 0 1 auto;
  margin: 1rem;
  padding: 2rem;
  list-style: none;
  background-color: darkslategray;
  color: white;
  border-radius: 50px;
  border: silver 2px solid;
}

.contents > li:hover {
  transform: translateY(-10px);
  transition-duration: .2s;
  transition-timing-function: ease-in-out;
}

@media screen and (min-width: 768px) {
  .contents {
    flex-direction: row;
  }

  .contents > li {
    margin: 0 2rem;
  }
}
</style>
