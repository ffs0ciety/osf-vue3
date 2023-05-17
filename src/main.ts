import { createApp, watch, provide, h } from 'vue'
import { createPinia } from 'pinia'


import './assets/main.css'

import App from './App.vue'
import router from './router'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { DefaultApolloClient } from "@vue/apollo-composable"
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'https://c3kwe2xwznhxro6jl3wuctea2q.appsync-api.eu-west-1.amazonaws.com/graphql',
})

const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          'x-api-key': 'da2-5ka2votojzfltjmu3hppluqy24',
        }
      }
    });

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
})



const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

const pinia = createPinia();
if (localStorage.getItem("state")) {
    pinia.state.value = JSON.parse(localStorage.getItem("state") || '');
}

watch(
    pinia.state,
    (state) => {
        localStorage.setItem("state", JSON.stringify(state))
    },
    { deep: true }

)

app.use(pinia)
app.use(router)
app.mount('#app')


