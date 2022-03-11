export class Loginpage {
    username?: string;
    password?: string;
    token ?: string;
}

export class UserDetailspage {
    employeeName!: string;
    email!: string;
    designation!: string;
    grade!: string;
    division!: string;
    password!: string;
    middleName!: string;
    lastName!: string;
    telephone!: string;
    mobile!: string;
    emergencyContact!: string;
    maritalStatus!: string;
    DOB!: string;
    nationality!: string;
    religion!: string;
    height!: string;
    weight!: string;
    Qualification!: string;
    dateOfJoining!: string;
    validPassport!: string;
    passportNumber!: string;
    validUpto!: string;
    role_id!: string;
    
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
