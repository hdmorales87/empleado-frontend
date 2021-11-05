import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pais } from 'src/app/model/pais';
import { Persona } from 'src/app/model/persona';
import { PaisService } from 'src/app/service/pais.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-persona-modal',
  templateUrl: './persona-modal.component.html',
  styleUrls: ['./persona-modal.component.css']
})
export class PersonaModalComponent implements OnInit {

  persona!: Persona;
  pais!: Pais[];

  constructor(
    private dialogRef: MatDialogRef<PersonaModalComponent>,
    private PersonaService: PersonaService,
    private PaisService: PaisService,
    @Inject(MAT_DIALOG_DATA) private data: Persona
  ) { }

  ngOnInit(): void {
    this.persona = new Persona();
    if(this.data != null){
      this.persona.id = this.data.id;
      this.persona.nombres = this.data.nombres;
      this.persona.apellidos = this.data.apellidos;
      this.persona.edad = this.data.edad;
      this.persona.pais = this.data.pais;
    }

    this.PaisService.listar().subscribe(data => {
      this.pais = data;
    })
  }

  aceptar(){
    if(this.persona != null && this.persona.id > 0){
      this.PersonaService.editar(this.persona).subscribe(()=>{
        return this.PersonaService.listar().subscribe(data=>{
          this.PersonaService.personaActualizar.next(data);
        })
      });
    }  
    else{
      this.PersonaService.registrar(this.persona).subscribe(()=>{
        return this.PersonaService.listar().subscribe(data=>{
          this.PersonaService.personaActualizar.next(data);
        })
      });
    }  
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }

}
