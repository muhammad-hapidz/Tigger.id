import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import NewsEvent from '@/views/NewsEvent.vue'
import NewsEventDetail from '@/views/NewsEventDetail.vue'
import Article from '@/views/Article.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import JoinUs from '@/components/JoinUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path:'/news-and-event',
      name:'newsandevent',
      component: NewsEvent,
    },
    {
      path: '/news-and-event/:id',
      name:'newsandeventdetail',
      component: NewsEventDetail,
      props:true,
    },
    {
      path:'/about',
      name:'about',
      component: About,
    },
    {
      path:'/article',
      name: 'article',
      component: Article,
    },
    {
      path:'/article/:id',
      name: 'articledetail',
      component: ArticleDetail,
      props:true,
    },
    
    {
      path:'/join-us',
      name:'joinus',
      component: JoinUs,
    },
  ],
})

export default router
