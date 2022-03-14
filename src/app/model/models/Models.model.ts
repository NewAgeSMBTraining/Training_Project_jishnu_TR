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
