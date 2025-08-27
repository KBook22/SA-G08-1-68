import type { Billableitem } from "./billableitem";
import type { Employer } from "./employer";
import type { Student } from "./student";
import type { JobCategory } from "./job_category";
import type { EmploymentType } from "./employment_type";
import type { SalaryType } from "./salary_type";

export interface Jobpost {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    status: string;
    image_url: string;
    portfolio_required: string;
    salary: number;
    billableitem_id: number;
    billableitem?: Billableitem;
    employer_id: number;
    employer?: Employer;
    job_category_id: number;
    job_category?: JobCategory;
    location_id: number;
    location: Location;
    employment_type_id: number;
    employment_type?: EmploymentType;
    salary_type_id: number;
    salary_type?: SalaryType;
    student_id: number;
    student?: Student;
}