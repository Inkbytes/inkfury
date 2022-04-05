<template>
     <div>
  <Modal v-if="settings" :user="user" @close="switchSet"/>
    <div class="profile rounded shadow-md">
        <input type="text" class="
        form-control
        block
        w-222
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" v-model="search" onfocus="this.value=''">
        <span id="settings" @click="switchSet"></span>
        <div v-if="search">
            <div id="search" >
                    <router-link :to="{ name: 'Users', params: { login : user.login}}" v-for="user in matchingLogin" :key="user.login">{{ user.login }}</router-link>
            </div>
        </div>
        <img :src="getImage(user.avatar)"  width="100" height="100">
        <div id="details">
            <h1> {{ user.fullname }}</h1>
            <p>@{{ user.login }}</p>
        </div>
    </div>
    <div id="content">
        <aside id="friends_achiv" class="shadow-lg rounded">
            <div id="fr">
                <h1>Friends</h1>
                <div id="pics">
                        <router-link :to="{name : 'Users', params: {login : friend.login}}" v-for="friend in  getInfo()" :key="friend.id"><img :src="getImage(friend.avatar)" width="35" height="35" /></router-link>
                </div>
            </div>
            <div id="achiv">
                <h1>Achievements</h1>
                <div class="ach">
                    <div>
                        <h4>its's a rich man's world 3</h4> 
                        <p>Collected 500 wallet points.</p>
                    </div>
                   <img src="../assets/achiv.png" width="50" height="54">
                </div>
                <div class="ach">
                    <div>
                        <h4>its's a rich man's world 3</h4> 
                        <p>Collected 500 wallet points.</p>
                    </div>
                   <img src="../assets/achiv.png" width="50" height="54">
                </div>
                <div class="ach">
                    <div>
                        <h4>its's a rich man's world 3</h4> 
                        <p>Collected 500 wallet points.</p>
                    </div>
                   <img src="../assets/achiv.png" width="50" height="54">
                </div>
            </div>
        </aside>
        <aside id="matchs" class="shadow-md rounded">
            <h1>Matching History</h1>
            <div class="match">
                <div class="data">
                    <img :src="getImage(user.avatar)" width="46" height="45">
                    <div class="info">
                        <p>{{ user.fullname }}</p>
                        <p>@{{ user.login }}</p>
                    </div>
                </div>
                <div class="score">
                    <p>Match score</p>
                    <p>5 - 3</p>
                </div>
                <div class="result">
                    <p>Results</p>
                    <p>WIN</p>

                </div>
            </div>
            <div class="match">
                <div class="data">
                    <img :src="getImage(user.avatar)" width="46" height="45">
                    <div class="info">
                        <p>{{ user.fullname }}</p>
                        <p>@{{ user.login }}</p>
                    </div>
                </div>
                <div class="score">
                    <p>Match score</p>
                    <p>5 - 3</p>
                </div>
                <div class="result">
                    <p>Results</p>
                    <p>WIN</p>

                </div>
            </div>
            <div class="match">
                <div class="data">
                    <img :src="getImage(user.avatar)" width="46" height="45">
                    <div class="info">
                        <p>{{ user.fullname }}</p>
                        <p>@{{ user.login }}</p>
                    </div>
                </div>
                <div class="score">
                    <p>Match score</p>
                    <p>5 - 3</p>
                </div>
                <div class="result">
                    <p>Results</p>
                    <p>WIN</p>

                </div>
            </div>
            <div class="match">
                <div class="data">
                    <img :src="getImage(user.avatar)" width="46" height="45">
                    <div class="info">
                        <p>{{ user.fullname }}</p>
                        <p>@{{ user.login }}</p>
                    </div>
                </div>
                <div class="score">
                    <p>Match score</p>
                    <p>5 - 3</p>
                </div>
                <div class="result">
                    <p>Results</p>
                    <p>WIN</p>

                </div>
            </div>
            <div class="match">
                <div class="data">
                    <img :src="getImage(user.avatar)" width="46" height="45">
                    <div class="info">
                        <p>{{ user.fullname }}</p>
                        <p>@{{ user.login }}</p>
                    </div>
                </div>
                <div class="score">
                    <p>Match score</p>
                    <p>5 - 3</p>
                </div>
                <div class="result">
                    <p>Results</p>
                    <p>WIN</p>

                </div>
            </div>
            <div class="match">
                <div class="data">
                    <img :src="getImage(user.avatar)" width="46" height="45">
                    <div class="info">
                        <p>{{ user.fullname }}</p>
                        <p>@{{ user.login }}</p>
                    </div>
                </div>
                <div class="score">
                    <p>Match score</p>
                    <p>5 - 3</p>
                </div>
                <div class="result">
                    <p>Results</p>
                    <p>WIN</p>

                </div>
            </div>
            <div class="match">
                <div class="data">
                    <img :src="getImage(user.avatar)" width="46" height="45">
                    <div class="info">
                        <p>{{ user.fullname }}</p>
                        <p>@{{ user.login }}</p>
                    </div>
                </div>
                <div class="score">
                    <p>Match score</p>
                    <p>5 - 3</p>
                </div>
                <div class="result">
                    <p>Results</p>
                    <p>WIN</p>

                </div>
            </div>
        </aside>
    </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { computed } from 'vue'
import useStore from '../store'
import Modal from './Modal.vue'
export default defineComponent({
    name: 'Iprofile',
    props: ["users"],
    components: { Modal},
    data() {
        const store = useStore();
        return {
            profil: true,
            user : computed(() => store.state.auth.user),
            search: "search..",
            logged : computed(() => store.state.auth.logged),
            settings: false,
            loading :false
        }
    },
    computed :{
        matchingLogin() {
            if (this.users.length == 0)
                return ;
            const l : any = this.users.filter((user : any) => user.login.startsWith(this.search))
            return (l)
        },
    },
    methods: {
        switchSet(){
            this.settings = !this.settings
        },
        getImage(pic: string){
            if (pic.startsWith('https://cdn.intra.42.fr/users/'))
                return pic
            else
                return ('./assets/'+pic)
        },
        getInfo(){
            let arr = [];
            this.user.friendList.forEach(element => {
                arr.push(this.users.find((user) => user.id === element))
            })
            console.log(this.users)
            return arr;
        }
    }
});
</script>

<style scoped>
body {
    background: #DFDFDE !important;
}
h1 {
    margin: 10px 0;
}
.profile {
    position: relative !important;
    display: flex !important;
   width: 1000px !important;
   height: auto !important;
   padding-top: 250px !important;
    background-image: url('../assets/user-bg.jpg');
    padding-bottom: 20px;
    margin: 0 auto 30px;
}.profile img {
    margin-left: 30px;
    border-radius: 50%;
    height: 100px;
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
    text-align: left;
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
    width: 200px;
}
#search a {
    display: block;
    border-top: 1px solid grey;
    margin: 0;
    padding-top: 3px;
    padding-bottom: 5px;
    text-decoration: none;
    color: black;
}
#search a:hover {
  text-decoration: underline;
  background-color: #eeeeee;  
}
#content {
    padding: 6px;
    width: 820px;
    margin: 0 auto 50px;
    text-align: left;
    display: flex;
    overflow: hidden;
}
#friends_achiv{
    background: white;
    height: 100%;
    width: 40%;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
}
#fr h1 {
    margin-left: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: bolder;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
}
#pics {
    margin-left: 8px;
    display: flex;
}
#pics img{
    margin-right: 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
    height: 35px;
}
.pic:last-child img{
    filter: blur(2px);
}
.pic {
    margin: 0 8px;
    display: inline-block;
    position: relative;
}
.pic span {
    position: absolute;
    bottom: 7px;
    right: 0px;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: #77ED2E;
}
#achiv {
    max-width: 300px;
    margin: 0 auto;
}
#achiv h1{
    font-family: 'Inter';
    font-style: normal;
    font-weight: lighter;
    font-size: 24px;
    line-height: 29px;
    color: #000000;
}
.ach {
    min-height: 54px;
   padding-left: 5px;
    background: #EDEDED;
    border-radius: 7px;
    margin-bottom:15px;
    position: relative;
}
.ach h4 {
    padding-top: 8px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    margin: 0;
}
.ach p {
    margin: 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: rgba(0, 0, 0, 0.37);
}
.ach img{
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(132, 133, 124, 0.69);
    width: 50px;
    height: 54px;
    border-radius: 7px;
}
#matchs {
    width: 55%;
    margin-left: 4%;
    background: #FFFFFF;
    border-radius: 6px;
}
#matchs h1 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: lighter;
    padding-left: 10px;
    font-size: 36px;
    line-height: 44px;
    color: #000000;
}
.match {
    padding: 5px 0;
    display: flex;
    background: #323232;
    box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.01);
    border-radius: 9px;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 20px;
}
.data {
    display: flex;
    padding-left: 5px;
    padding-right: 25px;
}
.data img {
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
    border-radius: 8px;
    height: 54px;
    }
.match p {
    margin: 0;
}
.data p:first-child {
    max-height: 17px;
    max-width: 166px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
}
.data p:last-child {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.53);
}
.info {
    text-align: left;
    padding-left: 5px;
    padding-top: 7px;
}
.score {
    padding-right: 50px;
}
.score p:first-child {
    padding-top: 7px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #FFFFFF;
}
.score p:last-child {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
}
.result p:first-child {
    padding-top: 7px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #FFFFFF;
}
.result p:last-child {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
}
#settings {
    width: 41px;
    height: 41px;
    background: url("../assets/settings.svg"), rgb(190, 187, 187);
    position: absolute;
    top: 10px;
    left: 20px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
    cursor: pointer;
}
</style>