import type { Gender } from "./gender"
import type { Bank } from "./bank"
import type { User } from "./user"

export interface Student {
    ID: number;
    email: string;
    first_name: string;
    last_name: string;
    birthday: Date;
    age: number;
    gpa: number;
    year: number;
    bank_account: string;
    faculty: string;
    phone: string;
    skills: string;
    

    user_id: number;
    user?: User;

    gender_id: number;
    gender?: Gender;
    
    bank_id: number;
    bank?: Bank;
}

export interface SignInStudent {
    email :string;
    password? :string;
}