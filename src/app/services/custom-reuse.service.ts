// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomReuseService implements RouteReuseStrategy {

//     private storedRoutes = new Map<string, DetachedRouteHandle>();

//     shouldDetach(route: ActivatedRouteSnapshot): boolean {
//       const shouldStore = !!route.routeConfig && !!route.data['reuse'];
//       console.log(`[RouteReuse] shouldDetach -> ${route.routeConfig?.path}: ${shouldStore}`);

//         return shouldStore; // Store route if 'reuse' flag is set
//     }

//     store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
//         if (handle) {
//           console.log(`[RouteReuse] Storing route: ${route.routeConfig?.path}`);
//           this.storedRoutes.set(route.routeConfig?.path || '', handle);
//       }
//     }

//     shouldAttach(route: ActivatedRouteSnapshot): boolean {
//       const hasStoredRoute = !!route.routeConfig && this.storedRoutes.has(route.routeConfig?.path || '');
//       console.log(`[RouteReuse] shouldAttach -> ${route.routeConfig?.path}: ${hasStoredRoute}`);
//       return hasStoredRoute;
//   }

//   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
//       const retrieved = this.storedRoutes.get(route.routeConfig?.path || '') || null;
//       console.log(`[RouteReuse] retrieve -> ${route.routeConfig?.path}: ${retrieved ? 'Restored' : 'Null'}`);
//       return retrieved;
//   }

//   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//       const shouldReuse = future.routeConfig === curr.routeConfig;
//       console.log(`[RouteReuse] shouldReuseRoute -> ${future.routeConfig?.path}: ${shouldReuse}`);
//       return shouldReuse;
//   }
// }

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

@Injectable()
export class CustomReuseService implements RouteReuseStrategy {

    private storedRoutes = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const shouldStore = !!route.routeConfig && !!route.data['reuse'];
        console.log(`[RouteReuse] shouldDetach -> ${route.routeConfig?.path}: ${shouldStore}`);
        return shouldStore;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        if (handle && route.routeConfig?.path) {
            console.log(`[RouteReuse] Storing route: ${route.routeConfig.path}`);
            this.storedRoutes.set(route.routeConfig.path, handle);
        }
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const hasStoredRoute = !!route.routeConfig && this.storedRoutes.has(route.routeConfig.path || '');
        console.log(`[RouteReuse] shouldAttach -> ${route.routeConfig?.path}: ${hasStoredRoute}`);
        return hasStoredRoute;
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (!route.routeConfig) return null;
        const stored = this.storedRoutes.get(route.routeConfig.path || '') || null;
        console.log(`[RouteReuse] retrieve -> ${route.routeConfig?.path}: ${stored ? 'Restored' : 'Null'}`);
        return stored;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const shouldReuse = future.routeConfig === curr.routeConfig;
        console.log(`[RouteReuse] shouldReuseRoute -> ${future.routeConfig?.path}: ${shouldReuse}`);
        return shouldReuse;
    }
}

