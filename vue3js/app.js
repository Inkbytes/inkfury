console.log("Hello World");

const app = Vue.createApp({
    // data, functions to react to events we want
    // template: '<h2>I am the template</h2>'
    data() {
        return {
            showBooks: true,
            title: 'The Final Empire',
            autor: 'Zackaria Taouil',
            age: '666',
        }
    },

    methods: {
        changeTitle(title) {
            console.log('You cliked me');
            this.title = title;
        },
        toggleShowBooks() {
            this.showBooks = !this.showBooks;
        }
    }
})

app.mount('#app');