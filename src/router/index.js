import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
// import NewsEvent from '@/views/Portofolio.vue'
import NewsEventDetail from '@/views/NewsEventDetail.vue'
import Article from '@/views/Article.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import TipsTrick from '@/views/TipsTrick.vue'
import ContactUs from '@/views/ContactUs.vue'
import Forbidden from '@/views/Forbidden.vue'
import Portofolio from '@/views/Portofolio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        title:'3A | Home'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path:'/portofolio',
      name:'Portofolio',
      component: Portofolio,
      meta:{
        title:'3A | Portofolio '
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path: '/news-and-event/:id',
      name:'newsandeventdetail',
      component: NewsEventDetail,
      props:true,
      meta:{
        title: '3A | News & Event'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path:'/about',
      name:'about',
      component: About,
      meta:{
        title:'3A | About Us'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
      
    },
    {
      path:'/article',
      name: 'article',
      component: Article,
      meta:{
        title:'3A | Article'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path:'/article/:id',
      name: 'articledetail',
      component: ArticleDetail,
      props:true,
      meta:{
        title:'3A | Article'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
      
    },
    {
      path:'/tips-and-trick',
      name:'tipsandtrick',
      component:TipsTrick,
      meta:{
        title:'3A | Tips & Trick'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },

    },
    {
      path:'/contact-us',
      name:'ContactUs',
      component: ContactUs,
      meta:{
        title:'3A | Contact Us'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },
    {
      path:'/notfound',
      name:'forbidden',
      component: Forbidden,
      meta:{
        title:'3A | Not Found'
      },
      meta: { showNavbar: true, showFooter: true, layout: 'MainLayout' },
    },

    // ROUTES CMS
    {
      path: '/cms',
      name: 'CmsRedirect',
      redirect: '/cms/dashboard',
      meta: { requiresAuth: true, showNavbar: false, showFooter: false }
    },
    {
      path: '/cms/dashboard',
      name: 'Dashboard',
      component: () => import('../views/cms/Dashboard/index.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false }
    },
    {
      path: '/cms/Login',
      name: 'Login',
      component: () => import('../views/cms/Login.vue'),
      meta: { guestOnly: true, layout: 'empty' },
    },
    {
      path: '/cms/users',
      name: 'Users',
      component: () => import('../views/cms/Users/index.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },

    },
    {
      path: '/cms/users/Create',
      name: 'userCreate',
      component: () => import('../views/cms/Users/create.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/users/edit/:id',
      name: 'userEdit',
      props: true,
      component: () => import('../views/cms/Users/edit.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/users/:id',
      name: 'userDetail',
      component: () => import('../views/cms/Users/detail.vue'),
      props: true,
      eta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/users/changePassword/:id',
      name: 'changePassword',
      component: () => import('../views/cms/Users/changePassword.vue'),
      props: true,
      eta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/users/edit/:id/resetpw',
      name: 'resetPassword',
      component: () => import('../views/cms/Users/resetPassword.vue'),
      props: true,
      eta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/contents',
      name: 'Contents',
      component: () => import('../views/cms/Contents/index.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/contents/create',
      name: 'contentCreate',
      component: () => import('../views/cms/Contents/create.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/contents/edit/:id',
      name: 'contentEdit',
      component: () => import('../views/cms/Contents/edit.vue'),
    },
    {
      path: '/cms/contents/:id',
      name: 'contentDetail',
      component: () => import('../views/cms/Contents/detail.vue'),
    },
    {
      path: '/cms/category',
      name: 'Category',
      component: () => import('../views/cms/Category/index.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/category/:id',
      name:'DetailCategory',
      component: () => import ('@/views/cms/Category/DetailCategory.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path:'/cms/category/create',
      name:'Create',
      component: () => import ('@/views/cms/Category/Create.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/category/:id/edit',
      name:'EditCategory',
      component: () => import ('@/views/cms/Category/EditCategory.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/segment',
      name:'Segment',
      component: () => import ('@/views/cms/Segment/Index.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/segment/:id',
      name:'DetailSegment',
      component: () => import ('@/views/cms/Segment/DetailSegment.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/segment/:id/edit',
      name:'EditSegment',
      component: () => import ('@/views/cms/Segment/EditSegment.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/segment/create',
      name:'CreateSegment',
      component: () => import ('@/views/cms/Segment/Create.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/roles',
      name:'Roles',
      component: () => import ('@/views/cms/Roles/index.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/roles/create',
      name:'createRoles',
      component: () => import ('@/views/cms/Roles/Create.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path:'/cms/roles/:id',
      name:'DetailRole',
      component: () => import ('@/views/cms/Roles/DetailRole.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path:'/cms/roles/:id/edit',
      name:'EditRole',
      props:true,
      component: () => import ('@/views/cms/Roles/EditRole.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/roles/:id/setting',
      name: 'SettingRole',
      component: () => import('../views/cms/Roles/settingRole.vue'),
      props: true,
      eta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/cms/menu',
      name:'Menu',
      component: () => import ('@/views/cms/Menu/index.vue'),
      props:true,
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path:'/cms/menu/create',
      name:'CreateRole',
      component: () => import ('@/views/cms/Menu/Create.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path:'/cms/menu/:id',
      name:'DetailMenu',
      component: () => import ('@/views/cms/Menu/DetailMenu.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path:'/cms/menu/:id/edit',
      name:'EditMenu',
      component: () => import ('@/views/cms/Menu/EditMenu.vue'),
      meta: { requiresAuth: true, showNavbar: false, showFooter: false, },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/notfound',
    },

  ],

  
})



// // Middleware untuk proteksi route
// Navigation Guard
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '3A'; // Default title
  next();
  const token = localStorage.getItem('authToken')
  const allowedUrls = (JSON.parse(localStorage.getItem('allowedUrls')) || []).map(url => url.toLowerCase());;
  const currentUrl = to.path.toLowerCase();
  

  console.log('allowedUrls:',allowedUrls, 'currentUrl:',currentUrl)

  

  // Halaman yang memerlukan autentikasi
  if (to.meta.requiresAuth && !token) {
    return router.push('/cms/login'); // Redirect ke login jika belum login
    
  } else if (to.meta.requiresAuth && allowedUrls.length > 0) {
    const isAllowed = allowedUrls.some(url => currentUrl.startsWith(url));

    console.log('isAllowed:',isAllowed)
    // const isAllowed = allowedUrls.some(url => currentUrl.startsWith(url));
    if (!isAllowed) {
      return router.push('/notfound');
    }
  }
  //   } else if (to.meta.requiresAuth && allowedUrls.length > 0) {
  //     // Konversi semua allowedUrls ke lowercase
  //     const lowerCaseAllowedUrls = allowedUrls.map(url => url.toLowerCase());

  //     // Konversi currentUrl ke lowercase
  //     const currentUrl = to.path.toLowerCase();

  //     // Periksa apakah currentUrl ada di dalam allowedUrls
  //     const isAllowed = allowedUrls.includes(currentUrl);
  //     // const isAllowed = lowerCaseAllowedUrls.some(url => currentUrl.startsWith(currentUrl));

  //     console.log('Current URL:', currentUrl);
  //     console.log('Allowed URLs:', lowerCaseAllowedUrls);
  //     console.log('Is Allowed:', isAllowed);

  //     if (!isAllowed) {
  //       return router.push('/notfound'); // Redirect jika URL tidak diizinkan
  //     }
  // }
  // Halaman untuk tamu (tanpa token)
  else if (to.meta.guestOnly && token) {
    next('/cms/dashboard') // Redirect ke /cms jika sudah login
  } 
  else {
    next() // Lanjut ke halaman yang diminta
  }
})

export default router
