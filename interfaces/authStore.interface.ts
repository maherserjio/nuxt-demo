export interface ILoginParams {
    fcm_token: string | null,
    captcha_token: string,
    email: string,
    password: string,
    device: IDevice,
};

export interface ILogoutParams {
    fcm_token: string,
    captcha_token: string,
    device: IDevice,
    profileId : number
};

export interface ILoginResponse{
    set: number
    message: any
    error_key: any
    data: ILoginResponseData
    profiles: IProfile[]
}

  export interface ILoginResponseData {
    auth_token: string
    unique_id: string
    uuid: any
    login: string
    name: string
    firstName: string
    lastName: string
    gender: number
    phone: any
    email: string
    country: number
    country_state: number
    registered: number
    avatar: string
    package: any
    settings: any[]
    actions: any[]
    birthday: any
    ignore_privacy: number
  }
  
  export interface IProfile {
    id: string
    title: string
    age_rating: number
    logo: string
    avatar: any
  }



export interface IDevice {
    device_os: string,
    device_type: string,
    uniq_device_id: string
}