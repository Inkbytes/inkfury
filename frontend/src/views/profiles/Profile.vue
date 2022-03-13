<template>
  <Header :profil="profil"/>

    <div class="profile">
        <input type="text" v-model="search" onfocus="this.value=''">
        <div v-if="search">

            <div id="search" >
                    <p v-for="user in matchingLogin" :key="user.login">{{ user.login }}</p>
            </div>
        </div>
        <img :src="require('../../assets/'+user.login+'.jpeg')" width="100" height="100">
        <div id="details">
            <h1> {{ user.name }}</h1>
            <p>@{{ user.login }}</p>
        </div>
    </div>

  <Footer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'

export default defineComponent({
    name: 'Profile',
    components: { Header, Footer },
    data() {
        return {
            profil: true,
            user: {
                name: "El ouarti Oussama",
                login: "oel-ouar"
            },
            users: [],
            search: "search.."
        }
    },
    mounted()
    {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => this.users = data)
            .catch(err => console.log(err.message))
        console.log(this.users)
    },
    computed: {
       matchingLogin: function () {
           return this.users.filter((user)=> user.login.includes(this.search)) 
       } 
    }
});
</script>

<style>
.profile {
    position: relative;
    display: flex;
   width: 800px;
   height: 150px;
   padding-top: 250px;
    background-image: url('../../assets/user-bg.png');
    margin: 0 auto 50px;
}.profile img {
    margin-left: 30px;
    border-radius: 50%;
}
#details {
    margin-left: 10px;
}
.profile h1 {
    margin-top: 20px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: white;
    margin-bottom: 0;
}
.profile p {
    text-align: left;
    margin-top: 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.25);
}
.profile input {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    height: 30px;
    width: 200px;
    padding-left: 20px;
}
#search {
    position: absolute;
    top: 42px;
    background: white; 
    right: 10px;
    width: 220px;
}
#search p {
    border-top: 1px solid grey;
    padding-left: 20px;
    margin: 0;
    padding-top: 3px;
    padding-bottom: 5px;
    color: black;
}
#search p:hover {
  text-decoration: underline;
  background-color: #eeeeee;  
}
</style>