<template>
  <div id="error" v-if="error">
    <h1>404</h1>
    <h3>user not found</h3>
  </div>
  <div v-else-if="isLoaded" class="bg-slate-50">
    <div class="profile rounded shadow-md bg-white">
      <img :src="getImage(user.avatar)" width="100" height="100" />
      <div id="details">
        <h1>{{ user.fullname }}</h1>
        <p>@{{ user.login }}</p>
        <img v-if="valid" @click="toggleError" src="../assets/add-friend.svg" width="35" height="35"/>
        <img v-else  src="../assets/friends.svg" width="35" height="35"/>
      </div>
    </div>
    <div id="content">
      <aside id="friends_achiv" class="shadow-lg">
        <div id="fr">
          <h1>Friends</h1>
          <div id="pics">
            <router-link :to="{name : 'Users', params: {login : friend.login}}" v-for="friend in  getInfo()" :key="friend.id"><img :src="getImage(friend.avatar)" width="35" height="35" /></router-link>
          </div>
        </div>
        <div id="achiv">
                <h1>Achievements</h1>
                <div class="ach" v-for="achiv in getAchiv()" :key="achiv">
                    <div>
                        <h4>{{ achiv.title }}</h4> 
                        <p>{{ achiv.msg }}</p>
                    </div>
                   <img src="../assets/achiv.png" width="50" height="54">
                </div>
            </div>
      </aside>
      <aside id="matchs" class="shadow-md rounded">
            <h1>Matching History</h1>
            <div class="match" v-for="game in getGameInfo()" :key="game">
                    <div class="data ">
                        <img :src="getImage(getUserData(game.opId).avatar)" width="46" height="45">
                        <div class="info">
                            <p class="line-clamp-1">{{getUserData(game.opId).fullname}}</p>
                            <p class="line-clamp-1">@{{ getUserData(game.opId).login }}</p>
                        </div>
                    </div>
                    <div class="score">
                        <p>Match score</p>
                        <p>{{game.opScore}} - {{ game.myScore }}</p>
                    </div>
                    <div class="result">
                        <p>Results</p>
                        <p v-if="game.win">Win</p>
                        <p v-else >Lose</p>
                    </div>
                </div>
        </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { onMounted, reactive } from "vue";
import { useRouter, useRoute } from 'vue-router';

import axios, { AxiosResponse } from "axios";
import useStore from "../store";

export default defineComponent({
  name: "UserProfile",
  props: ["login", "users", "games"],
  setup(props) {
    const data = reactive({
      user: {},
      valid: true,
      isLoaded: false,
      currentUser: computed(() => store.state.auth.user),
      setLoading: (e: boolean) => store.commit("config/setLoading", e),
      setMsg: (e: boolean) => store.commit('msg/setMsg', e),
      setState: (e: boolean) => store.commit('msg/setState', e),
      error : false,
      wins: 0
    });
    const route = useRoute();
    watch(
      () => route.params.login,
      async newLogin => {
        await fetch("http://10.12.1.6:9000/api/users/" + newLogin)
        .then((res) => res.json())
        .then((userData) => {
          data.user = userData;
          if ((store.state.auth.user as any)?.friendList.includes((data.user as any)?.id))
            data.valid = false;
          if(userData === undefined)
            data.error = true;
          if (store.state.auth.user.login === (data.user as any)?.login) {
            router.replace("/profile");
          }
        })
        .catch((err) => data.error = true);
        await(fetch("http://10.12.1.6:9000/api/game/score/"+ (data.user as any)?.id))
        .then(res => res.json())
        .then(gameData =>  gameData && (data.wins = gameData.wins) )
        .catch(err => console.log(err.message))
        data.isLoaded = true;
      }
    )
    const store = useStore();
    const router = useRouter();


    onMounted(async () => {
      await fetch("http://10.12.1.6:9000/api/users/" + props.login)
        .then((res) => res.json())
        .then((userData) => {
          data.user = userData;
          if ((store.state.auth.user as any)?.friendList.includes((data.user as any)?.id))
            data.valid = false;
          if(userData === undefined)
            data.error = true;
          if (store.state.auth.user.login === (data.user as any)?.login) {
            router.replace("/profile");
          }
        })
        .catch((err) => data.error = true);
        await(fetch("http://10.12.1.6:9000/api/game/score/"+ (data.user as any)?.id))
        .then(res => res.json())
        .then(gameData =>  gameData && (data.wins = gameData.wins) )
        .catch(err => console.log(err.message))
        data.isLoaded = true;
    });

    return data;
  },
  methods: {
    async toggleError() {
      this.currentUser.friendList.push(this.user.id);
      const curUsr = this.currentUser;
      axios
        .put("http://10.12.1.6:9000/api/users", curUsr, {})
        .then((resp: AxiosResponse) => {})
        .catch((err) => {
          console.log(err);
        });
      this.valid = false;
      this.setMsg(this.user.login+' has been added to your friends list!')
      this.setState(true)
      await new Promise(r => setTimeout(r, 2000));
      this.setState(false)
    },
    getImage(pic: string) {
      if (pic.startsWith("https://cdn.intra.42.fr/users/"))
        return pic;
      else return "../assets/" + pic;
    },
    getInfo(){
        let arr = [];
        this.user.friendList.forEach(element => {
            arr.push(this.users.find((user) => user.id === element))
        })
        return arr;
    },
    getUserData(id: number) {
            return this.users.find((user: any) => user.id === id)
        },
        getGameInfo() {
            let arr = [];
            let i  = 0;
            this.games.forEach(element => {
                if ((element.p1id == this.user.id || element.p2id == this.user.id ) && i<6)
                {
                    i++;
                    let tmp = {gameId: 0,opId: 0, myScore: 0, opScore: 0, win: false};
                    tmp.gameId = element.gameId;
                    if ( element.p1id == this.user.id )
                    {
                        tmp.myScore = element.p1Score;
                        tmp.opId = element.p2id;
                        tmp.opScore = element.p2Score;
                    }
                    else if ( element.p2id == this.user.id )
                    {
                        tmp.myScore = element.p2Score;
                        tmp.opId = element.p1id;
                        tmp.opScore = element.p1Score;
                    }
                    if (tmp.myScore > tmp.opScore)
                        tmp.win = true
                    arr.push(tmp);
                }
            })
            arr = arr.reverse();
            return arr;
        },
        getAchiv(){
          let tab = [1, 3, 5, 10, 50];
          let arr = [];

          for (let i: number = 1; i <= this.wins; i++){
              if (tab.find(e => e === i) != undefined)
                  arr.push({title: 'Game achievement ' + i, msg: 'winner winner chicken dinner stage '+i});
          }
          return arr ;
        }
  },
});
</script>

<style scoped>
.profile {
  position: relative !important;
  display: flex !important;
  max-width: 1000px !important;
  height: auto !important;
  padding-top: 250px !important;
  background-image: url("../assets/user-bg.jpg");
  padding-bottom: 20px;
  margin: 0 auto 30px;
}
.profile img {
  margin-left: 30px;
  border-radius: 50%;
}
#details {
  margin-left: 10px;
  position: relative;
}
.profile h1 {
  font-family: "Inter";
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
  font-family: "Inter";
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
  max-width: 820px;
  margin: 0 auto 50px;
  text-align: left;
  display: flex;
  overflow: hidden;
}
#friends_achiv {
  background: white;
  height: 100%;
  width: 40%;
  border: 1px solid #ffffff;
  border-radius: 6px;
}
#fr h1 {
  margin: 20px 0;
  margin-left: 8px;
  font-family: "Inter";
  font-style: normal;
  font-weight: bolder;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}
#pics {
    margin: 0 8px;
    display: flex;
}
#pics img {
    margin-right: 10px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.14);
    box-sizing: border-box;
    height: 35px;
}
.pic:last-child img {
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
  background: #77ed2e;
}
#achiv {
  max-width: 300px;
  margin: 0 auto;
}
#achiv h1 {
  margin: 20px 0;
  font-family: "Inter";
  font-style: normal;
  font-weight: lighter;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}
.ach {
  min-height: 54px;
  padding-left: 5px;
  background: #ededed;
  border-radius: 7px;
  margin-bottom: 15px;
  position: relative;
}
.ach h4 {
  padding-top: 8px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin: 0;
}
.ach p {
  margin: 0;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: rgba(0, 0, 0, 0.37);
}
.ach img {
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
  background: #ffffff;
  border-radius: 6px;
}
#matchs h1 {
  margin: 20px 0;
  font-family: "Inter";
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
  width: 50%;
}
.data img {
  border: 1px solid rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  border-radius: 8px;
  height: 45px;
}
.match p {
  margin: 0;
}
.data p:first-child {
  max-height: 17px;
  max-width: 166px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
}
.data p:last-child {
  font-family: "Inter";
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
  width: 30%;
  padding-right: 50px;
}
.score p:first-child {
  padding-top: 7px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
}
.result {
  width: 20%;
}
.score p:last-child {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
}
.result p:first-child {
  padding-top: 7px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #ffffff;
}
.result p:last-child {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
}
#details img {
  background: #dde3e6;
  border-radius: 25%;
  position: absolute;
  margin-left: 0;
  left: 0;
  top: 58px;
  height: 35px;
  cursor: pointer;
}
</style>
