import { Validators } from "@angular/forms";

export const signValidators = {
    name: [Validators.required , Validators.minLength(3) , Validators.maxLength(20)],
    email: [Validators.required , Validators.email],
    password : [Validators.required , Validators.pattern(/^\w{6,}$/)],
    age:[Validators.required , Validators.pattern(/^\w{2,2}$/)],
    phone : [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)],
    title : [Validators.required],
}