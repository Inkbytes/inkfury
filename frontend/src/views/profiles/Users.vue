<template>
<DefaultLayout>
    <div id="error" v-if="error">
        <h1>404</h1>
        <h3>user not found</h3>
    </div>
    <div v-else>
        <div class="profile">
        <img :src="getImage(user.avatar)" width="100" height="100">
        <div id="details">
            <h1> {{ user.fullname }}</h1>
            <p>@{{ user.login }}</p>
            <img v-if="valid" @click="toggleError" src="../../assets/add-friend.jpg" width="35" height="35">
        </div>
    </div>

    <div id="content">
        <aside id="friends_achiv">
            <div id="fr">
                <h1>Friends</h1>
                <div id="pics">
                    <div class="pic"><img src="../../assets/aabounak.jpeg" alt="" width="36" height="36"><span></span></div>
                    <div class="pic"><img src="../../assets/abiari.jpeg" alt="" width="36" height="36"><span></span></div>
                    <div class="pic"><img src="../../assets/ztaouil.jpeg" alt="" width="36" height="36"><span></span></div>
                    <div class="pic"><img src="../../assets/mashad.jpeg" alt="" width="36" height="36"><span></span></div>
                    <div class="pic"><img src="../../assets/oel-yous.jpeg" alt="" width="36" height="36"><span></span></div>
                    <div class="pic"><img src="../../assets/mgrissen.jpeg" alt="" width="36" height="36"><span></span></div>
                </div>
            </div>
            <div id="achiv">
                <h1>Achievements</h1>
                <div class="ach">
                    <div>
                        <h4>its's a rich man's world 3</h4> 
                        <p>Collected 500 wallet points.</p>
                    </div>
                   <img src="../../assets/achiv.png" width="50" height="54">
                </div>
                <div class="ach">
                    <div>
                        <h4>its's a rich man's world 3</h4> 
                        <p>Collected 500 wallet points.</p>
                    </div>
                   <img src="../../assets/achiv.png" width="50" height="54">
                </div>
                <div class="ach">
                    <div>
                        <h4>its's a rich man's world 3</h4> 
                        <p>Collected 500 wallet points.</p>
                    </div>
                   <img src="../../assets/achiv.png" width="50" height="54">
                </div>
            </div>
        </aside>
        <aside id="matchs">
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

  <router-view/>
</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '../../layouts/default.vue'

import { computed } from 'vue'

import axios, { AxiosResponse } from "axios";


import useStore from '../../store'

declare var require: any
export default defineComponent({
    name: 'Users',
    props: ['login'],
    data() {
        const store = useStore();
        return {
            currentUserLogin : computed(() => store.state.auth.user.login),
            user : {},
            error: false,
            msg: '',
            success: false,
            setLoading: (e: boolean) => store.commit('config/setLoading', e),
            valid : true
        }
    },
    components: { DefaultLayout},
    created(){
        this.setLoading(true)
    },
    async mounted()
    { 
        await(fetch("http://10.12.1.6:9000/api/users/"+ this.login))
            .then(res => res.json())
            .then(data =>  this.user = data )
            .catch(err => console.log(err.message))
        this.setLoading(false)
        console.log(this.user.avatar)
        // if (this.user.avatar )
        if(this.currentUserLogin === this.user.login){
            this.$router.replace('/profile')
        }
    },
    methods: {
        async toggleError()
        {
            axios
                .put("http://10.12.1.6:9000/api/users", {}, {})
                .then((resp : AxiosResponse) => {
                })
                .catch((err) => {
                    console.log(err)
                })
            this.success = !this.success
            this.msg =  'user has been added successfully!'
            await new Promise(r => setTimeout(r, 2000));
            this.success = !this.success
            
        },

        getImage(pic: string){
            if (pic.startsWith('https://cdn.intra.42.fr/users/'))
                return this.user.avatar
            else
                return ('../assets/'+this.user.avatar)
        }
    }
});
</script>

<style scoped>

.profile {
    position: relative !important;
    display: flex !important;
    max-width: 1000px !important;
   height: auto !important;
   padding-top: 250px !important;
    background-image: url('../../assets/user-bg.jpg');
    padding-bottom: 20px;
    margin: 0 auto 30px;
}.profile img {
    margin-left: 30px;
    border-radius: 50%;
}
#details {
    margin-left: 10px;
    position: relative;
}
.profile h1 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    color: white;
    margin-bottom: 0;
    text-align: left;
}
.profile img {
    height: 100px;
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
    width: 222px;
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
    max-width: 800px;
    margin: 0 auto 50px;
    text-align: left;
    display: flex;
    overflow: hidden;
}
#friends_achiv{
    height: 100%;
    width: 40%;
    border: 1px solid #FFFFFF;
    box-shadow: 1px 8px 28px -4px rgba(0, 0, 0, 0.15);
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
#pics img{
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
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
    width: 58%;
    margin-left: 1%;
    background: #FFFFFF;
    box-shadow: 1px 4px 137px rgba(142, 142, 142, 0.15);
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
#details img {
    background: rgb(190, 187, 187);
    border-radius: 10%;
    position: absolute;
    margin-left: 0;
    left: 0;
    top : 58px;
    height: 35px;
    cursor: pointer;
}
</style>