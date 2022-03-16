<template>
  <Header :profil="profil"/>
    <Modal v-if="settings" :nickname="user.login" @close="switchSet"/>
    <div class="profile">
        <input type="text" v-model="search" onfocus="this.value=''">
        <span id="settings" @click="switchSet"></span>
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
                    <img :src="require('../../assets/'+user.login+'.jpeg')" width="46" height="45">
                    <div class="info">
                        <p>{{ user.name }}</p>
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
                    <img :src="require('../../assets/'+user.login+'.jpeg')" width="46" height="45">
                    <div class="info">
                        <p>{{ user.name }}</p>
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
                    <img :src="require('../../assets/'+user.login+'.jpeg')" width="46" height="45">
                    <div class="info">
                        <p>{{ user.name }}</p>
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
                    <img :src="require('../../assets/'+user.login+'.jpeg')" width="46" height="45">
                    <div class="info">
                        <p>{{ user.name }}</p>
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
                    <img :src="require('../../assets/'+user.login+'.jpeg')" width="46" height="45">
                    <div class="info">
                        <p>{{ user.name }}</p>
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
                    <img :src="require('../../assets/'+user.login+'.jpeg')" width="46" height="45">
                    <div class="info">
                        <p>{{ user.name }}</p>
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
                    <img :src="require('../../assets/'+user.login+'.jpeg')" width="46" height="45">
                    <div class="info">
                        <p>{{ user.name }}</p>
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

  <Footer/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Modal from '../../components/Modal.vue'

export default defineComponent({
    name: 'Profile',
    components: { Header, Footer , Modal},
    data() {
    
        return {
            profil: true,
            user: {
                name: "El ouarti Oussama",
                login: "oel-ouar"
            },
            users: [],
            search: "search..",
            settings: false
        }
    },
   async mounted()
    {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data =>  this.users = data )
            .catch(err => console.log(err.message))
    },
    computed :{

        matchingLogin() {
            if (this.users.length == 0)
                return ;
            const l : any = this.users.filter((user : any) => user.login.includes(this.search))
            return (l)
        },
    },
    methods: {
        switchSet(){
            this.settings = !this.settings
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
    margin: 0 auto 30px;
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
#content {
    padding: 6px;
    max-width: 790px;
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
    background: url("../../assets/settings.svg"), rgb(190, 187, 187);
    position: absolute;
    top: 10px;
    left: 20px;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
    cursor: pointer;
}
</style>