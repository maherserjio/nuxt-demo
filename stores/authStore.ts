import { defineStore } from "pinia";
import { useApi } from "../composables/useApi";
import { v4 as uuidv4 } from 'uuid';
import type { IDevice, ILoginParams, ILoginResponse, ILogoutParams } from "~/interfaces/authStore.interface";


export const useAuthStore = defineStore("auth", {
    state: () => ({
        isLoggedIn: false,
        loading: false,
        auth_token: '',
        profileId: 0
    }),
    getters: {
        getIsLoggedIn: (state) => state.isLoggedIn,
        getAuthToken: (state) => state.auth_token,
        getIsLoading: (state) => state.loading,
    },
    actions: {
        async signIn(email: string, password: string, router: any) {
            this.loading = true;
            const loginParams: ILoginParams = getLoginParams(email, password);
            const api = useApi();
            await api({
                method: 'post',
                url: '/login/signin',
                data: {
                    email,
                    password,
                    fcm_token: loginParams.fcm_token,
                    captcha_token: loginParams.captcha_token,
                    device_type: loginParams.device.device_type,
                    device_os: loginParams.device.device_os,
                    uniq_device_id: loginParams.device.uniq_device_id
                }
            },).then((res) => {
                const loginResponse: ILoginResponse = res.data;
                this.$patch({
                    isLoggedIn: true,
                    auth_token: loginResponse.data.auth_token,
                    profileId: +loginResponse.profiles[0].id
                })
                router.replace({ path: '/' });
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false;
            })
        },




        async signOut() {
            this.loading = true;
            const logoutParams: ILogoutParams = getLogoutParams(this.profileId);
            const api = useApi();
            await api({
                method: 'post',
                url: '/logout',
                headers: {
                    'Profile': logoutParams.profileId,
                    'Deviceid': logoutParams.device.uniq_device_id,
                    'Devicetype': logoutParams.device.device_type,
                    'Fcmtoken': logoutParams.fcm_token,
                }
            },).then((res) => {
                this.$patch({
                    isLoggedIn: false,
                    profileId: 0,
                    auth_token: ''
                })
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                this.loading = false;
            });
        }
    },


});


// Create a function to generate a unique device ID
export function generateDeviceId() {
    // Generate a random UUID
    const randomUUID = uuidv4();
    const deviceId = randomUUID;
    // Return the generated device ID
    return deviceId
}

export function getDeviceInfo(): IDevice {
    const deviceInfo = {
        device_os: '',
        device_type: '',
        uniq_device_id: ''
    };

    const userAgent = window.navigator.userAgent;
    if (/(android)/i.test(userAgent)) {
        deviceInfo.device_os = 'Android';
    } else if (/(iphone)/i.test(userAgent)) {
        deviceInfo.device_os = 'iOS';
    } else if (/(ipad)/i.test(userAgent)) {
        deviceInfo.device_os = 'iPadOS';
    } else if (/(win)/i.test(userAgent)) {
        deviceInfo.device_os = 'Windows';
    } else if (/(mac)/i.test(userAgent)) {
        deviceInfo.device_os = 'MacOS';
    } else if (/(linux)/i.test(userAgent)) {
        deviceInfo.device_os = 'Linux';
    } else if (/(cros)/i.test(userAgent)) {
        deviceInfo.device_os = 'Chrome OS';
    } else {
        deviceInfo.device_os = 'Unknown';
    }
    if (/(tablet|ipad|playbook|silk-tablet|kindle)/i.test(userAgent)) {
        deviceInfo.device_type = 'Tablet';
    } else if (
        /(mobi|opera mini|iphone)/i.test(userAgent) ||
        /(android)/i.test(userAgent) && /(mobile)/i.test(userAgent)
    ) {
        deviceInfo.device_type = 'Mobile';
    } else {
        deviceInfo.device_type = 'Desktop';
    }

    return deviceInfo;
}

function getLoginParams(email: string, password: string): ILoginParams {
    let uniqDeviceId = localStorage.getItem("uniqDeviceId");

    let deviceInfo: IDevice = getDeviceInfo();
    if (!uniqDeviceId) {
        uniqDeviceId = generateDeviceId();
        localStorage.setItem("uniqDeviceId", uniqDeviceId);
    }
    deviceInfo.uniq_device_id = uniqDeviceId;

    return {
        fcm_token: null,
        captcha_token: '',
        email,
        password,
        device: deviceInfo
    };
}


function getLogoutParams(profileId: number): ILogoutParams {
    let uniqDeviceId = localStorage.getItem("uniqDeviceId");

    let deviceInfo: IDevice = getDeviceInfo();
    if (!uniqDeviceId) {
        uniqDeviceId = generateDeviceId();
        localStorage.setItem("uniqDeviceId", uniqDeviceId);
    }
    deviceInfo.uniq_device_id = uniqDeviceId;
    return {
        fcm_token: '',
        captcha_token: '',
        device: deviceInfo,
        profileId
    };
}