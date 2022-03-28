export class Loginpage {
    username?: string;
    password?: string;
    token ?: string;
}

export class UserDetailspage {
    id?: any;
    role_id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_code?: string;
    phone?: string;
    password?: string;
    
}

export class forgotPassword {
    email?: string;
    
}


export class otpVerification {
    session_id?: string;
    otp?: string;
   
}

export class resetpassword {
    session_id?: string;
    password?: string;
   
}

export interface paginationData {
    offset?: number;
    limit?: number;
    sort?: string[][] | { [key: string]: 1 | -1 };
    where?: any;
    filters?: any;
    select?: string[];
    populate?: string[];
    search?: string;
    data?: {
      [key: string]: any
    };
}

export class Pagination {
    page!: number;
    limit!: number;
    count!: number;
  }

  export interface UserFilter {
    active?: number | string;
    role_id?: any;
  }

  
export interface ApiResponse {
    data?: any;
    error?: any;
    message?: any;
  }

  export class UserProfilespage {
    id!: number ;
    role_id?: number;
    first_name?:string;
    last_name?:string;
    email?:string;
    phone_code?:string;
    phone?:string;
  }


  export class ChangePassword{
    password?:string;
    old_password?:string;
}



export interface DialogBtn {
  show: boolean;
  text: string;
  disabled?: boolean;
}

export interface DialogResponse {
  status?: boolean;
  data?: any
}

export class DialogData {
  title?: string;
  text?: string;
  close_btn?: DialogBtn | any;
  confirm_btn?: DialogBtn | any;

  constructor(option: { title?: any; text?: any; close_btn?: any; confirm_btn?: any; }) {
    option = option || {};
    // this.title = option.title || 'Are you sure?';
    this.text = option.text || '';
    this.close_btn = option.close_btn || {};
    this.close_btn.show = option.close_btn?.show || true;
    this.close_btn.text = option.close_btn?.text || 'No';
    this.close_btn.disabled = option.close_btn?.disabled || false;
    this.confirm_btn = option.confirm_btn || {};
    this.confirm_btn.show = option.confirm_btn?.show || true;
    this.confirm_btn.text = option.confirm_btn?.text || 'Yes';
    this.confirm_btn.disabled = option.confirm_btn?.disabled || false;
  }
}






 
  

