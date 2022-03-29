import moment from "moment"

export interface entryEvent{
    _id:string,
    title: string,
    start: Date,
    end:Date,
    user:User
  }

  export interface EventLoading{
    //_id:string,
    title: string,
    notes:string,
    start: Date,
    end:Date,
    // user:User,
  }
  export interface UserLoading{
    lEmail:string | null ,
    lPassword:string | null 
  }
  export interface RegisterLoading{
    name:string | null ,
    rEmail:string | null,
    rPassword:string | null,
    rConfirmPassword:string | null,
  }

  export interface Style{
    backgroundColor:string,
    borderRadius:string,
    opacity:number,
    display:string,
    color:string
  }  

  export interface User{
    uid:string,
    name:string
  }  

  export interface initialStateCalendarI{
    events: entryEvent[] | [],
    activeEvent:entryEvent | null

}

export interface activeEventI{
  _id:string,
  title: string,
  start: momentType,
  end:momentType,
  user:{
      uid:string,
      name:string
  }

}


  export type momentType= ReturnType<typeof moment>