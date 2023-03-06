import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuardGuard } from './guards/intro-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/splash', //splash
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuardGuard, AutoLoginGuard]
    
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'log-claim',
    loadChildren: () => import('./pages/log-claim/log-claim.module').then( m => m.LogClaimPageModule)
  },
  {
    path: 'track-claim',
    loadChildren: () => import('./pages/track-claim/track-claim.module').then( m => m.TrackClaimPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'boiler-service',
    loadChildren: () => import('./pages/boiler-service/boiler-service.module').then( m => m.BoilerServicePageModule)
  },
  {
    path: 'home-emergency',
    loadChildren: () => import('./pages/home-emergency/home-emergency.module').then( m => m.HomeEmergencyPageModule)
  },
  {
    path: 'car-service',
    loadChildren: () => import('./pages/car-service/car-service.module').then( m => m.CarServicePageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'appliance',
    loadChildren: () => import('./pages/appliance/appliance.module').then( m => m.AppliancePageModule)
  },
  {
    path: 'eligibility',
    loadChildren: () => import('./pages/eligibility/eligibility.module').then( m => m.EligibilityPageModule)
  },
  {
    path: 'documents',
    loadChildren: () => import('./pages/documents/documents.module').then( m => m.DocumentsPageModule)
  },
  {
    path: 'risk-addresses',
    loadChildren: () => import('./pages/risk-addresses/risk-addresses.module').then( m => m.RiskAddressesPageModule)
  },
  {
    path: 'products-list',
    loadChildren: () => import('./pages/products-list/products-list.module').then( m => m.ProductsListPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'claim',
    loadChildren: () => import('./pages/claim/claim.module').then( m => m.ClaimPageModule)
  },
  {
    path: 'eligibility-form',
    loadChildren: () => import('./pages/eligibility-form/eligibility-form.module').then( m => m.EligibilityFormPageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'no-internet',
    loadChildren: () => import('./pages/no-internet/no-internet.module').then( m => m.NoInternetPageModule)
  },
  {
    path: 'track-claim-details',
    loadChildren: () => import('./pages/track-claim-details/track-claim-details.module').then( m => m.TrackClaimDetailsPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./pages/terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./pages/card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },  {
    path: 'book-service',
    loadChildren: () => import('./pages/book-service/book-service.module').then( m => m.BookServicePageModule)
  },
  {
    path: 'track-services',
    loadChildren: () => import('./pages/track-services/track-services.module').then( m => m.TrackServicesPageModule)
  },
  {
    path: 'track-services-details',
    loadChildren: () => import('./pages/track-services-details/track-services-details.module').then( m => m.TrackServicesDetailsPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
