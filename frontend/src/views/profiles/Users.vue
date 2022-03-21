<template>
    <Header/>
    <div class="profile">
        <img :src="userImage.pic" width="100" height="100">
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
                    <img :src="userImage.pic" width="46" height="45">
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
                    <img :src="userImage.pic" width="46" height="45">
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
                    <img :src="userImage.pic" width="46" height="45">
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
                    <img :src="userImage.pic" width="46" height="45">
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
                    <img :src="userImage.pic" width="46" height="45">
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
                    <img :src="userImage.pic" width="46" height="45">
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
                    <img :src="userImage.pic" width="46" height="45">
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
declare var require: any
export default defineComponent({
    props: ['login'],
    data() {
        return {
            user: {
                login: '',
                name:'',
                pic:''
            },
            users: []
        }
    },
    components: { Header , Footer},
    async mounted()
    {
        await(fetch("http://localhost:3000/users"))
            .then(res => res.json())
            .then(data =>  this.users = data )
            .catch(err => console.log(err.message))
        if (this.users.length == 0)
            return ;
        const usr: any = this.users.filter((user : any) => user.login.includes(this.login))
        let l = JSON.parse(JSON.stringify(usr))
        this.user.login = l[0].login
        this.user.name = l[0].name
        this.user.pic = l[0].pic
    },
    computed: {
        userImage(){
            return {
                pic: this.user.pic && require('../../assets/'+this.user.pic)
            }
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

</style>