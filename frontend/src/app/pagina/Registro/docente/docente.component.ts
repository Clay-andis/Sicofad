import { Component, OnInit } from '@angular/core';
import {DocenteService} from '../../Services/docente.service'
import { NgForm } from '@angular/forms'
import {Docente} from '../../../models/docente'
import {Curso} from '../../../models/curso'
import { FormBuilder, FormGroup, FormArray, Validator} from '@angular/forms';

declare var M:any;

const buton = document.getElementById('buton')
@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss'],
  providers: [ DocenteService]
})

export class DocenteComponent implements OnInit {
  

   
  constructor(public docenteService : DocenteService,
    private formBuilder: FormBuilder) { 
  
  }

  ngOnInit(): void {
    this.getCursos()
  
  }

  get nombre(){
    return this.registerForm.get('nombre')
  }
  get codigo(){
    return this.registerForm.get('codigo')
  }

  get carga_academica(){
    return this.registerForm.get('carga_academica') as FormArray
  }

registerForm=this.formBuilder.group({
  nombre : [],
  codigo:[],
  carga_academica:this.formBuilder.array([])

})
agregarCarga(){
  const cargaFormGroup  =this.formBuilder.group({
    nombre: '',
    codigo:'',
    grupo:''
  })
this.carga_academica.push(cargaFormGroup)
}

removerCarga(indice: number) {
  this.carga_academica.removeAt(indice);
}

submit(){
  
  console.log(this.registerForm.value)
  
}

refrescar() {
  this.registerForm.patchValue({
    nombre: '',
    codigo: '',

  });
  this.carga_academica.controls.splice(0, this.carga_academica.length);
}



  addDocente(form: NgForm){
    if(form.value._id){
      this.docenteService.putDocente(form.value)
    .subscribe(res=>{
      this.resetForm();
      M.toast({html: 'Update Successfuly'});
      this.getDocentes();
    })
    
    }else{
    
    this.docenteService.postDocente(form.value)
    .subscribe(res=>{
      this.resetForm();
      this.getDocentes();
    })
  }
  }


  getCursos(){
    this.docenteService.getCursos()
    .subscribe(res=>{
      this.docenteService.cursos = res as Curso[]
      console.log(res)
    })
  }

  getDocentes(){
    this.docenteService.getDocentes()
    .subscribe(res=>{
      this.docenteService.docentes=res as Docente[];
      console.log(res);
     
    })

  }
  editDocente(docente:Docente){
    this.docenteService.selectedDocente=docente;

  }

  deleteDocente(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.docenteService.deleteDocente(_id)
        .subscribe(res => {
          this.getDocentes();
          this.resetForm(form);
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }


  
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.docenteService.selectedDocente = new Docente();
    }
  }
}

