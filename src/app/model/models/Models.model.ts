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
  
 
  

