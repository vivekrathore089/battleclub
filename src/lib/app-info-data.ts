export type AppInfo = {
    oneAccountPerDevice: boolean;
    supportNumber: string;
    appLink: string;
    maintenanceMode: boolean;
    forceUpdate: boolean;
    latestAppLink: string;
};

export const appInfo: AppInfo = {
    oneAccountPerDevice: true,
    supportNumber: '910000000000',
    appLink: 'https://play.google.com/store/apps/details?id=com.battleclub.app',
    maintenanceMode: false,
    forceUpdate: false,
    latestAppLink: 'https://play.google.com/store/apps/details?id=com.battleclub.app',
};
