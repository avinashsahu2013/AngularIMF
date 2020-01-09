import { Injectable } from '@angular/core';

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard', isAdminOnly: false },
    { state: 'userProfile', name: 'User Profile', type: 'link', icon: 'account_box', isAdminOnly: true },

];

@Injectable()

export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }

}
