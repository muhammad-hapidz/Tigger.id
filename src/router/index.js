import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import NewsEvent from '@/views/NewsEvent.vue'
import NewsEventDetail from '@/views/NewsEventDetail.vue'
import Article from '@/views/Article.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import TipsTrick from '@/views/TipsTrick.vue'
import JoinUs from '@/views/JoinUs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        title:'TIGGER ID | Home'
      },
    },
    {
      path:'/news-and-event',
      name:'newsandevent',
      component: NewsEvent,
      meta:{
        title:'TIGGER ID | News & Event '
      }
    },
    {
      path: '/news-and-event/:id',
      name:'newsandeventdetail',
      component: NewsEventDetail,
      props:true,
      meta:{
        title: 'TIGGER ID | News & Event'
      },
    },
    {
      path:'/about',
      name:'about',
      component: About,
      meta:{
        title:'TIGGER ID | About Us'
      }
    },
    {
      path:'/article',
      name: 'article',
      component: Article,
      meta:{
        title:'TIGGER ID | Article'
      }
    },
    {
      path:'/article/:id',
      name: 'articledetail',
      component: ArticleDetail,
      props:true,
      meta:{
        title:'TIGGER ID | Article'
      }
    },
    {
      path:'/tips-and-trick',
      name:'tipsandtrick',
      component:TipsTrick,
      meta:{
        title:'TIGGER ID | Tips & Trick'
      }
    },
    {
      path:'/join-us',
      name:'joinus',
      component: JoinUs,
      meta:{
        title:'TIGGER ID | Join Us'
      }
    },
  ],

  
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'TIGGER ID'; // Default title
  next();
});
export default router
