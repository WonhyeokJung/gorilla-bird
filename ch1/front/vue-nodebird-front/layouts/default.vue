<template>
  <div>
    <div class="nav-default">
      <div>
        <nuxt-link to="/" style="margin-inline: 0 0;"><img class="logo" src="../assets/gorilla-2.png" alt=""></nuxt-link>
        <h1><nuxt-link to="/">GorillaBird</nuxt-link></h1>
      </div>
      <nav>
        <div class="input-container">
          <label for="nav-searchbar" />
          <input id="nav-searchbar" type="text" placeholder="Search">
          <img class="search-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABiUlEQVRIie2Wu04CQRSGP0G2EUtIbHwA8B3EQisLIcorEInx8hbEZ9DKy6toDI1oAgalNFpDoYWuxZzJjoTbmSXERP7kZDbZ859vdmb27MJcf0gBUAaugRbQk2gBV3IvmDa0BLwA4Zh4BorTACaAU6fwPXAI5IAliTxwBDScvJp4vWWhH0BlTLEEsC+5Fu6lkgNdV/gKDnxHCw2I9rSiNQNV8baBlMZYJtpTn71KAg9SY3dUYn9xezLPgG8P8BdwLteq5X7CzDbnAbXKS42WxtQVUzoGeFlqdEclxXrnhmhhkqR+8KuMqzHA1vumAddl3IwB3pLxVmOyr1NjwKQmURJ4lBp7GmOAafghpg1qdSDeDrCoNReJWmZB4dsAPsW7rYVa1Rx4FbOEw5TEPKmFvgMZX3DCgYeYNniMaQ5piTXghGhPLdTmZ33hYNpem98f/UHRwSxvhqhXx4anMA3/EmhiOlJPJnSBOb3uQcpOE65VhujPpAms/Bu4u+x3swRbeB24mTV4LgB+AFuLedkPkcmmAAAAAElFTkSuQmCC">
        </div>
        <nuxt-link v-if="isLoggedIn" to="/profile">Profile</nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="/profile">Sign In</nuxt-link>
        <nuxt-link to="/signup">Sign Up</nuxt-link>
      </nav>
    </div>
    <Html>
      <Head>
        <Title>{{ dynamic }}</Title>
      </Head>
    </Html>
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout',
  setup() {
    // useHead({
    //   title: 'layout/default'
    // })
    useHead({
    // as a string,
    // where `%s` is replaced with the title
      titleTemplate: '%s - Site Title'
    });
    const route = useRoute();
    return {
      dynamic: route.name,
      isLoggedIn: ref(false),
    }
  },
}
</script>
<style scoped>
  .nav-default {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 7rem;
    align-items: center;
    justify-content: space-between;
    background-color: #F7AF05;

    font-size: 1.5rem;
  }

  .nav-default * {
    margin-inline: 1.2rem 1.2rem;
    /* writing-mode: horizontal-tb; */
    vertical-align: middle;
    color: white;
    text-decoration: none;
  }

  .logo {
    height: 4rem;
    margin: 0;
  }

  .nav-default h1 {
    display: inline-block;
    margin-inline: 0 0;
  }

  .nav-default .input-container {
    display: inline-block;
    border: 0.1rem ridge rgba(170, 50, 220, .2);
    border-radius: 0.8rem;
    /* background-color => none */
    /* background: transparent; */
    background-color: white;
  }

  .nav-default .input-container #nav-searchbar {
    color: black;
    box-sizing: border-box;
    width: 20rem;
    height: 2.4rem;

    margin: 0;
    border: 0;
    padding: 1.5rem 0;
    background-color: inherit;

    font-size: 1.5rem;
  }

  .nav-default input[type=text]:focus {
    outline: none;
  }

  .nav-default .search-icon {
    width: 2rem;
    margin-inline: 0 1.2rem;
  }
</style>
