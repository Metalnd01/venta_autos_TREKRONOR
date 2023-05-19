import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { encabezado } from 'src/app/models/encabezado.model';
import { EncabezadoService } from 'src/app/services/encabezado.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  public encabezado: encabezado | undefined;
  public editEncabezado:encabezado | undefined;
  public deleteEncabezado:encabezado | undefined;

  constructor(public encabezadoService: EncabezadoService, private tokenService: TokenService) { }

  isLogged = false;
  
  ngOnInit(): void {
    this.getEncabezado();
    if (this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }

  public getEncabezado():void{
    this.encabezadoService.getEncabezado().subscribe({
      next: (response: encabezado) => {
        this.encabezado=response;
      },
      error:(error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onOpenModal(mode:String, encabezado?: encabezado):void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addEncabezadoModal');
    } else if (mode==='delete') {
      this.deleteEncabezado = encabezado;
      button.setAttribute('data-target', '#deleteEncabezadoModal');
    } else if (mode==='edit') {
      this.editEncabezado = encabezado;
      button.setAttribute('data-target', '#editEncabezadoModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onUpdateEncabezado(encabezado: encabezado){
    this.editEncabezado=encabezado;
    document.getElementById('add-encabezado-form')?.click();
    this.encabezadoService.updateEncabezado(encabezado).subscribe({
        next: (response:encabezado) => {
          console.log(response);
          this.getEncabezado();
        },
        error:(error:HttpErrorResponse) => {
          alert(error.message);
        },
    })
  }
}
