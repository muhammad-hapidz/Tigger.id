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
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path:'/news-and-event',
      name:'newsandevent',
      component: NewsEvent,
      meta:{
        title:'TIGGER ID | News & Event '
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path: '/news-and-event/:id',
      name:'newsandeventdetail',
      component: NewsEventDetail,
      props:true,
      meta:{
        title: 'TIGGER ID | News & Event'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path:'/about',
      name:'about',
      component: About,
      meta:{
        title:'TIGGER ID | About Us'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
      
    },
    {
      path:'/article',
      name: 'article',
      component: Article,
      meta:{
        title:'TIGGER ID | Article'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path:'/article/:id',
      name: 'articledetail',
      component: ArticleDetail,
      props:true,
      meta:{
        title:'TIGGER ID | Article'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
      
    },
    {
      path:'/tips-and-trick',
      name:'tipsandtrick',
      component:TipsTrick,
      meta:{
        title:'TIGGER ID | Tips & Trick'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },

    },
    {
      path:'/join-us',
      name:'joinus',
      component: JoinUs,
      meta:{
        title:'TIGGER ID | Join Us'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path: '/cms',
      name: 'Dashboard',
      component: () => import('../views/cms/Dashboard/index.vue'),
      meta: { showLayout: true }, // Tidak menampilkan Navbar
    },
    {
      path: '/cms/Contents',
      name: 'Contents',
      component: () => import('../views/cms/Contents/index.vue'),
      meta: { showNavbar: false, showFooter: false, },

    },
    {
      path: '/cms/Contents/Create',
      name: 'Create',
      component: () => import('../views/cms/Contents/create.vue'),
    },
    {
      path: '/cms/category',
      name: 'Category',
      component: () => import('../views/cms/Category/index.vue'),
    },
  ],

  
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'TIGGER ID'; // Default title
  next();
});
export default router
