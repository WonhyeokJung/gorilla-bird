<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link> | 
      <nuxt-link to="/profile">Profile</nuxt-link> | 
      <nuxt-link to="/signup">Sign Up</nuxt-link> | 
      <nuxt-link to="/admin">Admin</nuxt-link>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'AdminLayout',
}
</script>
