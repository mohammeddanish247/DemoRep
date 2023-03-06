export interface IUserData {
        LeadID:string,
        Cred : string,
        UserName:string,
        BoilerMake:string,
        BoilerModel:string,
        RenwealDate:string,
        Address:string,
        NameofAccount:string,
        HomePhone:string,
        Mobile:string,
        Market_Mobile:boolean,
        Market_Phone:boolean,
        Market_Email:boolean,
        Market_Post:boolean,
        Market_SMS:boolean,
        Eligibility:boolean,
        GroupID:number,
        TeamId:number,
        ExcessAmount:number
}


export interface IDocument {
        imgUrl : string , 
        imgText : string,
        currentLink : string,
        renewalLink : string,
}

export interface IUserCredential {
        Cref : string,
        LastName : string
}

