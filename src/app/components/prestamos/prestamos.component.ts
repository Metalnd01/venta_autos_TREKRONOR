import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { prestamos } from 'src/app/models/prestamos.model';
import { PrestamosService } from 'src/app/services/prestamos.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {


  public prestamos:prestamos[] = [];
  public editPrestamos:prestamos | undefined;
  public deletePrestamos:prestamos | undefined;

  constructor(private prestamosService: PrestamosService, private tokenService: TokenService){}

  isLogged = false;

  ngOnInit(): void {
    this.getPrestamos();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  public getPrestamos():void{
    this.prestamosService.getPrestamos().subscribe({
      next:(Response: prestamos[]) =>{
        this.prestamos=Response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  

  public onOpenModal(mode:String, prestamos?: prestamos):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addPrestamosModal');
    } else if (mode==='delete') {
      this.deletePrestamos = prestamos;
      button.setAttribute('data-target', '#deletePrestamosModal');
    } else if (mode==='edit') {
      this.editPrestamos = prestamos;
      button.setAttribute('data-target', '#editPrestamosModal');
    }

    container?.appendChild(button);
    button.click();
  }
  
  public onAddPrestamos(addForm: NgForm){
    document.getElementById('add-prestamos-form')?.click();
    this.prestamosService.addPrestamos(addForm.value).subscribe({
        next: (response:prestamos) => {
          console.log(response);
          this.getPrestamos();
          addForm.reset();
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      }
    )
  }

  public onUpdatePrestamos(prestamos: prestamos){
    this.editPrestamos=prestamos;
    document.getElementById('add-prestamos-form')?.click();
    this.prestamosService.updatePrestamos(prestamos).subscribe({
        next: (response:prestamos) => {
          console.log(response);
          this.getPrestamos();
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

  public onDeletePrestamos(idExp: number):void{
    this.prestamosService.deletePrestamos(idExp).subscribe({
        next: (response:void) => {
          console.log(response);
          this.getPrestamos();
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message);
        }
      }
    )
  }

}
