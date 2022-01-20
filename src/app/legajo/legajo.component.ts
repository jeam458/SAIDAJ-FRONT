import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { LegajoService } from '../services/legajo.service';
import { ExpedienteService} from '../services/expediente.service';
import { ExpedienteSchema } from '../services/models/Expediente';
import { LegajoSchema, SerieNumerica,SeriePeriodica,Tomo} from '../services/models/legajo';
import { personaSchema} from '../services/models/parte';
import { ExpLeg} from '../services/models/expedienteleg';
import { legArchivo} from '../services/models/legarchivo';
import { DependenciaService } from '../services/dependencia.service';
import { DependenciaSchema } from '../services/models/dependencia';
import { ParteService } from '../services/parte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../@vex/animations/fade-in-up.animation';
import { stagger60ms } from '../../@vex/animations/stagger.animation';
import { AuthService} from '../services/auth.service';
import icVerticalSplit from '@iconify/icons-ic/twotone-vertical-split';
import icVisiblity from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import icDoneAll from '@iconify/icons-ic/twotone-done-all';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icDescription from '@iconify/icons-ic/twotone-description';
import fiber_new from '@iconify/icons-ic/fiber-new';
import plus_one from '@iconify/icons-ic/plus-one';
import { stagger80ms } from '../../@vex/animations/stagger.animation';
import { scaleIn400ms } from '../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../@vex/animations/fade-in-right.animation';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'vex-legajo',
  templateUrl: './legajo.component.html',
  styleUrls: ['./legajo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger80ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class LegajoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatSort) sort1: MatSort;
  dataSource: MatTableDataSource<ExpedienteSchema>;
  dataSource1: MatTableDataSource<ExpedienteSchema>;
  displayedColums:string[]=[
    'Expediente','Tipo','Fecha','Eliminar'
  ]

  tiposlegajo=[
    {id:'1', name:'JURISDICCIONAL'},
    {id:'2', name:'ADMINISTRATIVO'}
  ]

  tipos=[
    {id:'1', name:'JURISIDICCIONAL'},
    {id:'2', name: 'ADMINISTRATIVO'}
  ]
  tipo:boolean=true;
  legajo: LegajoSchema;
  expediente: ExpedienteSchema;
  expedientes: ExpedienteSchema[]=[];
  expedientesInput: ExpedienteSchema[]=[];
  depsJuris:DependenciaSchema[]=[];

  legarchivo:legArchivo;
  expleg:ExpLeg;

  serieNum:SerieNumerica;
  seriePerio:SeriePeriodica;
  tomo:Tomo;

  form:FormGroup;
  form1:FormGroup;
  Numform:FormGroup;
  Periodoform:FormGroup;
  tomoform:FormGroup;

  icDoneAll = icDoneAll;
  icDescription = icDescription;
  icVerticalSplit = icVerticalSplit;
  icVisibility = icVisiblity;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;
  icNew= fiber_new;
  oneNew= plus_one;
  
  constructor(
    private snackbar: MatSnackBar, 
    private expService:ExpedienteService,
    private depservice:DependenciaService,
    private parteservice:ParteService,
    private fb: FormBuilder, 
    private userdatos:AuthService) { }

  ngOnInit(): void {
    this.legajo = this.inicializarLegajo();
    this.serieNum = this.incializarSerieNumerica();
    this.seriePerio = this.incializarSeriePeriodica();
    this.tomo = this.inicializarTomo();
    this.inicializarForm();
    this.inicializarForm1();
    this.incializarNumForm();
    this.inicializarPeriodoForm();
    this.inicializarTomoForm();
    this.getDepsJuris();
    this.getExpedientes();
    this.OnChanges();
  }

  OnChanges(){
    this.form.get('Tipo').valueChanges.subscribe(val => {
      console.log(val);
      if(val!=2){
        this.tipo=false;
      } else {
        this.tipo=true;
      }
    })

    this.form.valueChanges.subscribe(val =>{
      console.log(val);
    })
  }

  getDepsJuris(){
    this.depservice.getAllTipo("1").subscribe(res => {
      this.depsJuris=[];
      this.depsJuris = res;
    })
  }

  applyFilter(filterValue:string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  addExpediente(data){
    this.expedientesInput.push(data);
    this.dataSource1= new MatTableDataSource(this.expedientesInput);
    //this.dataSource1.sort=this.sort;
    //this.dataSource1.paginator= this.paginator;
    this.snackbar.open('bien hecho!', 'Expediente Agregado', {
      duration: 10000
    });
  }

  eliminarExp(data){
    var i= this.expedientesInput.indexOf(data);
        this.snackbar.open('bien hecho!', 'Tarea Eliminada', {
          duration: 10000
        });
        this.expedientesInput.splice(i,1);
        this.dataSource1= new MatTableDataSource(this.expedientesInput);
        //this.dataSource1.sort=this.sort;
        //this.dataSource1.paginator= this.paginator;
  }

  getExpedientes(){
    this.expService.getAll().subscribe(res =>{
      this.expedientes=[];
      this.expedientes= res;
      this.dataSource= new MatTableDataSource(this.expedientes);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator= this.paginator;
      this.expedientesInput=[];
      this.dataSource1= new MatTableDataSource(this.expedientesInput);
      this.dataSource1.sort=this.sort1;
      this.dataSource1.paginator= this.paginator1;
      console.log(this.expedientes)
    })
  }

  inicializarLegajo(){
    var leg: LegajoSchema;
    leg={
      _id:'',
      Tipo:'',
      NroLegajo:'',
      Codigo:'',
      Descripcion:'',
      Documento:'',
      UAdministrativa:'',
      Juzgado:'',
      UDireccion:'',
      UOrganica:'',
      Documentos:[],
      Entidad:'',
      Remitente:'',
      Autor:'',
      NroDocumentos:0,
      SNumerica:null,
      SPeriodica:null,
      TVida:'',
      Tomos:null,
      UCreador:this.userdatos.mostrarDatos()._id,
      fecha:new Date()
    }
    return leg;
  }

  incializarSerieNumerica(){
    var serie : SerieNumerica;
    serie = {
      Desde:'',
      Hasta:''
    }
    return serie;
  }

  incializarSeriePeriodica(){
   var periodo:SeriePeriodica;
   periodo = {
     FechaInicio : new Date(),
     FechaFin : new Date()
   }
   return periodo;
  }

  inicializarTomo(){
    var tomo : Tomo;
    tomo = {
      Tomo:0,
      De:0
    }
    return tomo;
  }

  inicializarForm(){
    this.form = this.fb.group({
       Tipo:['', Validators.required],
       NroLegajo:['' , Validators.required],
       Codigo:['', Validators.required],
       Descripcion:['', Validators.required],
       Documento:['', Validators.required],
       Juzgado:[''],
       UAdministrativa:[''],
       UDireccion:[''],
       UOrganica:[''],
       Entidad:['C.S.J. CUSCO'],
       Autor:['', Validators.required],
       Remitente:['', Validators.required],
       NroDocumentos:['', Validators.required]
    })
  }

  inicializarForm1(){
    this.form1 = this.fb.group({
      NroDocumentos: [''],
      SNumerica:['', Validators.required],
      SPeriodica:['', Validators.required],
      TVida:['', Validators.required],
      Tomos:['', Validators.required],
    })
  }

  incializarNumForm(){
    this.Numform = this.fb.group({
      Desde: ['', Validators.required],
      Hasta: ['', Validators.required]
    })
  }

  inicializarPeriodoForm(){
    this.Periodoform = this.fb.group({
      FechaInicio:['', Validators.required],
      FechaFin:['']
    })
  }

  inicializarTomoForm(){
    this.tomoform = this.fb.group({
      Tomo:[''],
      De:['']
    })
  }



}
