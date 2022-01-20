import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent} from './custom-layout.component';
import { CreateTareaComponent} from '../create-tarea/create-tarea.component';
import { DashboardComponent} from '../dashboard/dashboard.component';
import { WorksComponent} from '../works/works.component';
import { TareasComponent} from '../tareas/tareas.component';
import { AsignartareaComponent} from '../asignartarea/asignartarea.component';
import { ListadoTareasComponent} from '../listado-tareas/listado-tareas.component';
import { IngresomultipleComponent} from '../ingresomultiple/ingresomultiple.component';

import { ParteComponent} from '../parte/parte.component';
import { ListparteComponent} from '../listparte/listparte.component';
import { TipoparteComponent} from '../tipoparte/tipoparte.component';
import { ListTipoparteComponent} from '../list-tipoparte/list-tipoparte.component';
import { ActoprocesalComponent} from '../actoprocesal/actoprocesal.component';
import { ListActoprocesalComponent} from '../list-actoprocesal/list-actoprocesal.component';
import { DependenciaComponent} from '../dependencia/dependencia.component';
import { ListDependenciaComponent} from '../list-dependencia/list-dependencia.component';
import { ExpedientesComponent} from '../expedientes/expedientes.component';
import { ListExpedientesComponent} from '../list-expedientes/list-expedientes.component';
import { LegajoComponent} from '../legajo/legajo.component';
import { ListLegajoComponent} from '../list-legajo/list-legajo.component';

const routes:Routes=[
    {
        path:'',
        component: CustomLayoutComponent,
        children:[
            {
                path:'listlegajo',
                component:ListLegajoComponent
            },
            {
                path:'legajo',
                component:LegajoComponent
            },
            {
                path:'expediente',
                component:ExpedientesComponent
            },
            {
                path:'listexpediente',
                component:ListExpedientesComponent
            },
            {
                path:'listdependencia',
                component:ListDependenciaComponent
            },
            {
                path:'creardependencia',
                component:DependenciaComponent
            },
            {
                path:'crearacto',
                component:ActoprocesalComponent
            },
            {
                path:'listacto',
                component:ListActoprocesalComponent
            },
            {
                path:'listtipoparte',
                component:ListTipoparteComponent
            },
            {
                path:'creartipo',
                component:TipoparteComponent
            },
            {
                path:'crearparte',
                component:ParteComponent
            },
            {
                path:'listparte',
                component:ListparteComponent
            },
            {
                path:'creartarea',
                component:CreateTareaComponent
            },
            {
                path:'asignartarea',
                component:AsignartareaComponent
            },
            {
                path:'ingresomultiple',
                component:IngresomultipleComponent
            },
            {
                path:'pendientes',
                component:DashboardComponent
            },
            {
                path:'concluidos',
                component:WorksComponent
            },
            {
                path:'proceso',
                component:TareasComponent
            },
            {
                path:'todos',
                component:ListadoTareasComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PageLayoutsRoutingModule {
  }