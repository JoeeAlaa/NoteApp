import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { signValidators } from '../../shared/validators/validators';
import { NoteService } from '../../core/services/note.service';
import { DatePipe, NgClass } from '@angular/common';
import { IGetNote } from '../../core/interfaces/IGet-note';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,NgClass,DatePipe,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _NoteService = inject(NoteService);
  private readonly _ToastrService = inject(ToastrService);
  isLoading:boolean = false;
  allNotes:WritableSignal<IGetNote[]> = signal([]);
  noteId:WritableSignal<string> = signal('');
  addNoteSub!:Subscription;
  getUserNatoSub!:Subscription;
  updateNoteSub!:Subscription;
  deleteNoteSub!:Subscription;
  text:string = '';

  addNoteForm:FormGroup = this._FormBuilder.group({
    title: [null,signValidators.title],
    content: [null,signValidators.title]
  })
  updateNoteForm:FormGroup = this._FormBuilder.group({
    title: [null,signValidators.title],
    content: [null,signValidators.title]
  })

  addNote():void{
    if (this.addNoteForm.valid) {
      this.isLoading = true;
      this.addNoteSub = this._NoteService.addNote(this.addNoteForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          this._ToastrService.success(res.msg,'note')
          this.addNoteForm.reset();
          this.getNotes();          
        },
        error:(err)=>{
          this.isLoading = false;          
        }
      })
    } 
    else{
      this.addNoteForm.markAllAsTouched();
    }   
  }

  getNotes():void{
    this.getUserNatoSub = this._NoteService.getUserNato().subscribe({
      next:(res)=>{
        this.allNotes.set(res.notes);                
      },
      error:(err)=>{  
        if (err.error.msg === 'not notes found') {
          this.allNotes.set([]);                  
        }      
      }
    })
  }

  setUpdateForm(note:IGetNote,id:string):void{
    this.noteId.set(id)    
    this.updateNoteForm.patchValue(note);
  }

  updateNote():void{
    if (this.updateNoteForm.valid) {
      this.isLoading = true;      
      this.updateNoteSub =this._NoteService.updateNote(this.noteId() ,this.updateNoteForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          this._ToastrService.success(res.msg,'note')
          this.getNotes();
        },
      })
    }
    else{
      this.updateNoteForm.markAllAsTouched();      
    }
  }

  deleteNote(id:string):void{
    this.deleteNoteSub = this._NoteService.deleteNote(id).subscribe({
      next:(res)=>{
        this.getNotes(); 
        this._ToastrService.success(res.msg,'note')       
      },
    })
  }

  confirmBox(id:string){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
        this.deleteNote(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  ngOnInit():void{
      
    this.getNotes();
  
  }

  ngOnDestroy(): void {
    this.addNoteSub?.unsubscribe();
    this.getUserNatoSub?.unsubscribe();
    this.updateNoteSub?.unsubscribe();
    this.deleteNoteSub?.unsubscribe();
  }
}
