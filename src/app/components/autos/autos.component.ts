import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { autos } from 'src/app/models/autos.model';
import { AutosService } from 'src/app/services/autos.service';
import { Modal } from 'bootstrap';

//import { Container } from '@angular/compiler/src/i18n/i18n_ast';
//import { Container} from '@angular/compiler';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  public autos:autos[] = [];
  public editAutos:autos | undefined;
  public deleteAutos:autos | undefined;
  public testModal:Modal | undefined;

  constructor(private autosService: AutosService, private tokenService:TokenService){}

  isLogged = false;

  ngOnInit(): void {
    this.getAutos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  public getAutos():void{
    this.autosService.getAutos().subscribe({
      next:(Response: autos[]) =>{
        this.autos=Response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  

  public onOpenModal(mode:String, autos?: autos):void {
    let el_testModal = document.getElementById('testModal');
    if (el_testModal) {
      this.testModal=new Modal(el_testModal, {
        keyboard: false
      });
      this.testModal?.show();}
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addAutosModal');
    } else if (mode==='delete') {
      this.deleteAutos = autos;
      button.setAttribute('data-target', '#deleteAutosModal');
    } else if (mode==='edit') {
      this.editAutos = autos;
      button.setAttribute('data-target', '#editAutosModal');
    }

    el_testModal?.appendChild(button);
    button.click();
  }
  
  public onAddAutos(addForm: NgForm){
    document.getElementById('add-autos-form')?.click();
    this.autosService.addAutos(addForm.value).subscribe({
        next: (response:autos) => {
          console.log(response);
          this.getAutos();
          addForm.reset();
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      }
    )
  }

  public onUpdateAutos(autos: autos){
    this.editAutos=autos;
    document.getElementById('add-autos-form')?.click();
    this.autosService.updateAutos(autos).subscribe({
        next: (response:autos) => {
          console.log(response);
          this.getAutos();
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public onDeleteAutos(idProy: number):void{
    this.autosService.deleteAutos(idProy).subscribe({
        next: (response:void) => {
          console.log(response);
          this.getAutos();
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

}
