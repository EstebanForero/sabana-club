/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UserdashboardImport } from './routes/user_dashboard'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as IndexImport } from './routes/index'
import { Route as UserdashboardIndexImport } from './routes/user_dashboard/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as UserdashboardTuitionImport } from './routes/user_dashboard/tuition'
import { Route as UserdashboardTrainingImport } from './routes/user_dashboard/training'
import { Route as UserdashboardTournamentImport } from './routes/user_dashboard/tournament'
import { Route as UserdashboardProfileImport } from './routes/user_dashboard/profile'
import { Route as DashboardTorneosImport } from './routes/dashboard/torneos'
import { Route as DashboardSolicitudesImport } from './routes/dashboard/solicitudes'
import { Route as DashboardMatriculaImport } from './routes/dashboard/matricula'
import { Route as DashboardInformesuserImport } from './routes/dashboard/informes_user'
import { Route as DashboardInformesImport } from './routes/dashboard/informes'
import { Route as DashboardEntrenamientosImport } from './routes/dashboard/entrenamientos'

// Create/Update Routes

const UserdashboardRoute = UserdashboardImport.update({
  id: '/user_dashboard',
  path: '/user_dashboard',
  getParentRoute: () => rootRoute,
} as any)

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserdashboardIndexRoute = UserdashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => UserdashboardRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any)

const UserdashboardTuitionRoute = UserdashboardTuitionImport.update({
  id: '/tuition',
  path: '/tuition',
  getParentRoute: () => UserdashboardRoute,
} as any)

const UserdashboardTrainingRoute = UserdashboardTrainingImport.update({
  id: '/training',
  path: '/training',
  getParentRoute: () => UserdashboardRoute,
} as any)

const UserdashboardTournamentRoute = UserdashboardTournamentImport.update({
  id: '/tournament',
  path: '/tournament',
  getParentRoute: () => UserdashboardRoute,
} as any)

const UserdashboardProfileRoute = UserdashboardProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => UserdashboardRoute,
} as any)

const DashboardTorneosRoute = DashboardTorneosImport.update({
  id: '/torneos',
  path: '/torneos',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSolicitudesRoute = DashboardSolicitudesImport.update({
  id: '/solicitudes',
  path: '/solicitudes',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardMatriculaRoute = DashboardMatriculaImport.update({
  id: '/matricula',
  path: '/matricula',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardInformesuserRoute = DashboardInformesuserImport.update({
  id: '/informes_user',
  path: '/informes_user',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardInformesRoute = DashboardInformesImport.update({
  id: '/informes',
  path: '/informes',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardEntrenamientosRoute = DashboardEntrenamientosImport.update({
  id: '/entrenamientos',
  path: '/entrenamientos',
  getParentRoute: () => DashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/user_dashboard': {
      id: '/user_dashboard'
      path: '/user_dashboard'
      fullPath: '/user_dashboard'
      preLoaderRoute: typeof UserdashboardImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/entrenamientos': {
      id: '/dashboard/entrenamientos'
      path: '/entrenamientos'
      fullPath: '/dashboard/entrenamientos'
      preLoaderRoute: typeof DashboardEntrenamientosImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/informes': {
      id: '/dashboard/informes'
      path: '/informes'
      fullPath: '/dashboard/informes'
      preLoaderRoute: typeof DashboardInformesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/informes_user': {
      id: '/dashboard/informes_user'
      path: '/informes_user'
      fullPath: '/dashboard/informes_user'
      preLoaderRoute: typeof DashboardInformesuserImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/matricula': {
      id: '/dashboard/matricula'
      path: '/matricula'
      fullPath: '/dashboard/matricula'
      preLoaderRoute: typeof DashboardMatriculaImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/solicitudes': {
      id: '/dashboard/solicitudes'
      path: '/solicitudes'
      fullPath: '/dashboard/solicitudes'
      preLoaderRoute: typeof DashboardSolicitudesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/torneos': {
      id: '/dashboard/torneos'
      path: '/torneos'
      fullPath: '/dashboard/torneos'
      preLoaderRoute: typeof DashboardTorneosImport
      parentRoute: typeof DashboardImport
    }
    '/user_dashboard/profile': {
      id: '/user_dashboard/profile'
      path: '/profile'
      fullPath: '/user_dashboard/profile'
      preLoaderRoute: typeof UserdashboardProfileImport
      parentRoute: typeof UserdashboardImport
    }
    '/user_dashboard/tournament': {
      id: '/user_dashboard/tournament'
      path: '/tournament'
      fullPath: '/user_dashboard/tournament'
      preLoaderRoute: typeof UserdashboardTournamentImport
      parentRoute: typeof UserdashboardImport
    }
    '/user_dashboard/training': {
      id: '/user_dashboard/training'
      path: '/training'
      fullPath: '/user_dashboard/training'
      preLoaderRoute: typeof UserdashboardTrainingImport
      parentRoute: typeof UserdashboardImport
    }
    '/user_dashboard/tuition': {
      id: '/user_dashboard/tuition'
      path: '/tuition'
      fullPath: '/user_dashboard/tuition'
      preLoaderRoute: typeof UserdashboardTuitionImport
      parentRoute: typeof UserdashboardImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
    '/user_dashboard/': {
      id: '/user_dashboard/'
      path: '/'
      fullPath: '/user_dashboard/'
      preLoaderRoute: typeof UserdashboardIndexImport
      parentRoute: typeof UserdashboardImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteChildren {
  DashboardEntrenamientosRoute: typeof DashboardEntrenamientosRoute
  DashboardInformesRoute: typeof DashboardInformesRoute
  DashboardInformesuserRoute: typeof DashboardInformesuserRoute
  DashboardMatriculaRoute: typeof DashboardMatriculaRoute
  DashboardSolicitudesRoute: typeof DashboardSolicitudesRoute
  DashboardTorneosRoute: typeof DashboardTorneosRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardEntrenamientosRoute: DashboardEntrenamientosRoute,
  DashboardInformesRoute: DashboardInformesRoute,
  DashboardInformesuserRoute: DashboardInformesuserRoute,
  DashboardMatriculaRoute: DashboardMatriculaRoute,
  DashboardSolicitudesRoute: DashboardSolicitudesRoute,
  DashboardTorneosRoute: DashboardTorneosRoute,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

interface UserdashboardRouteChildren {
  UserdashboardProfileRoute: typeof UserdashboardProfileRoute
  UserdashboardTournamentRoute: typeof UserdashboardTournamentRoute
  UserdashboardTrainingRoute: typeof UserdashboardTrainingRoute
  UserdashboardTuitionRoute: typeof UserdashboardTuitionRoute
  UserdashboardIndexRoute: typeof UserdashboardIndexRoute
}

const UserdashboardRouteChildren: UserdashboardRouteChildren = {
  UserdashboardProfileRoute: UserdashboardProfileRoute,
  UserdashboardTournamentRoute: UserdashboardTournamentRoute,
  UserdashboardTrainingRoute: UserdashboardTrainingRoute,
  UserdashboardTuitionRoute: UserdashboardTuitionRoute,
  UserdashboardIndexRoute: UserdashboardIndexRoute,
}

const UserdashboardRouteWithChildren = UserdashboardRoute._addFileChildren(
  UserdashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/user_dashboard': typeof UserdashboardRouteWithChildren
  '/dashboard/entrenamientos': typeof DashboardEntrenamientosRoute
  '/dashboard/informes': typeof DashboardInformesRoute
  '/dashboard/informes_user': typeof DashboardInformesuserRoute
  '/dashboard/matricula': typeof DashboardMatriculaRoute
  '/dashboard/solicitudes': typeof DashboardSolicitudesRoute
  '/dashboard/torneos': typeof DashboardTorneosRoute
  '/user_dashboard/profile': typeof UserdashboardProfileRoute
  '/user_dashboard/tournament': typeof UserdashboardTournamentRoute
  '/user_dashboard/training': typeof UserdashboardTrainingRoute
  '/user_dashboard/tuition': typeof UserdashboardTuitionRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/user_dashboard/': typeof UserdashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/dashboard/entrenamientos': typeof DashboardEntrenamientosRoute
  '/dashboard/informes': typeof DashboardInformesRoute
  '/dashboard/informes_user': typeof DashboardInformesuserRoute
  '/dashboard/matricula': typeof DashboardMatriculaRoute
  '/dashboard/solicitudes': typeof DashboardSolicitudesRoute
  '/dashboard/torneos': typeof DashboardTorneosRoute
  '/user_dashboard/profile': typeof UserdashboardProfileRoute
  '/user_dashboard/tournament': typeof UserdashboardTournamentRoute
  '/user_dashboard/training': typeof UserdashboardTrainingRoute
  '/user_dashboard/tuition': typeof UserdashboardTuitionRoute
  '/dashboard': typeof DashboardIndexRoute
  '/user_dashboard': typeof UserdashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/user_dashboard': typeof UserdashboardRouteWithChildren
  '/dashboard/entrenamientos': typeof DashboardEntrenamientosRoute
  '/dashboard/informes': typeof DashboardInformesRoute
  '/dashboard/informes_user': typeof DashboardInformesuserRoute
  '/dashboard/matricula': typeof DashboardMatriculaRoute
  '/dashboard/solicitudes': typeof DashboardSolicitudesRoute
  '/dashboard/torneos': typeof DashboardTorneosRoute
  '/user_dashboard/profile': typeof UserdashboardProfileRoute
  '/user_dashboard/tournament': typeof UserdashboardTournamentRoute
  '/user_dashboard/training': typeof UserdashboardTrainingRoute
  '/user_dashboard/tuition': typeof UserdashboardTuitionRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/user_dashboard/': typeof UserdashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/login'
    | '/register'
    | '/user_dashboard'
    | '/dashboard/entrenamientos'
    | '/dashboard/informes'
    | '/dashboard/informes_user'
    | '/dashboard/matricula'
    | '/dashboard/solicitudes'
    | '/dashboard/torneos'
    | '/user_dashboard/profile'
    | '/user_dashboard/tournament'
    | '/user_dashboard/training'
    | '/user_dashboard/tuition'
    | '/dashboard/'
    | '/user_dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/register'
    | '/dashboard/entrenamientos'
    | '/dashboard/informes'
    | '/dashboard/informes_user'
    | '/dashboard/matricula'
    | '/dashboard/solicitudes'
    | '/dashboard/torneos'
    | '/user_dashboard/profile'
    | '/user_dashboard/tournament'
    | '/user_dashboard/training'
    | '/user_dashboard/tuition'
    | '/dashboard'
    | '/user_dashboard'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/login'
    | '/register'
    | '/user_dashboard'
    | '/dashboard/entrenamientos'
    | '/dashboard/informes'
    | '/dashboard/informes_user'
    | '/dashboard/matricula'
    | '/dashboard/solicitudes'
    | '/dashboard/torneos'
    | '/user_dashboard/profile'
    | '/user_dashboard/tournament'
    | '/user_dashboard/training'
    | '/user_dashboard/tuition'
    | '/dashboard/'
    | '/user_dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRouteWithChildren
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  UserdashboardRoute: typeof UserdashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRouteWithChildren,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  UserdashboardRoute: UserdashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/login",
        "/register",
        "/user_dashboard"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/entrenamientos",
        "/dashboard/informes",
        "/dashboard/informes_user",
        "/dashboard/matricula",
        "/dashboard/solicitudes",
        "/dashboard/torneos",
        "/dashboard/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/user_dashboard": {
      "filePath": "user_dashboard.tsx",
      "children": [
        "/user_dashboard/profile",
        "/user_dashboard/tournament",
        "/user_dashboard/training",
        "/user_dashboard/tuition",
        "/user_dashboard/"
      ]
    },
    "/dashboard/entrenamientos": {
      "filePath": "dashboard/entrenamientos.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/informes": {
      "filePath": "dashboard/informes.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/informes_user": {
      "filePath": "dashboard/informes_user.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/matricula": {
      "filePath": "dashboard/matricula.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/solicitudes": {
      "filePath": "dashboard/solicitudes.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/torneos": {
      "filePath": "dashboard/torneos.tsx",
      "parent": "/dashboard"
    },
    "/user_dashboard/profile": {
      "filePath": "user_dashboard/profile.tsx",
      "parent": "/user_dashboard"
    },
    "/user_dashboard/tournament": {
      "filePath": "user_dashboard/tournament.tsx",
      "parent": "/user_dashboard"
    },
    "/user_dashboard/training": {
      "filePath": "user_dashboard/training.tsx",
      "parent": "/user_dashboard"
    },
    "/user_dashboard/tuition": {
      "filePath": "user_dashboard/tuition.tsx",
      "parent": "/user_dashboard"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx",
      "parent": "/dashboard"
    },
    "/user_dashboard/": {
      "filePath": "user_dashboard/index.tsx",
      "parent": "/user_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
