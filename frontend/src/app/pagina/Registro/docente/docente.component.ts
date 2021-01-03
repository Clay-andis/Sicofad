import { Component, OnInit } from '@angular/core';
import {DocenteService} from '../../Services/docente.service'
import { NgForm } from '@angular/forms'
import {Docente} from '../../../models/docente'
import {Curso} from '../../../models/curso'

import { formatCurrency } from '@angular/common';
declare var M:any;
let docente =[]
const buton = document.getElementById('buton')
@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss'],
  providers: [ DocenteService]
})

export class DocenteComponent implements OnInit {


   
  constructor(public docenteService : DocenteService) { 
  
  }

  ngOnInit(): void {
    this.getCursos()
  
  
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
 

AgregarCurso(curso: Curso){
  
const datos =  {
  nombre : curso.nombre,
  codigo: curso.codigo,
  grupo: curso.grupo 
}

console.log(datos)



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

