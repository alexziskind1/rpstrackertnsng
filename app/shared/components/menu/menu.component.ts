import { Component } from '@angular/core';

import { NavigationService } from '../../../core/services/navigation.service';
import { PresetType } from '../../models/ui/types';

@Component({
    moduleId: module.id,
    selector: 'pt-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent {

    constructor(
        private navigationService: NavigationService
    ) { }

    public onSelectPresetTap(preset: PresetType) {
        this.navigationService.navigate(['backlog', preset]);
    }

    public onSettingsTap() {
        this.navigationService.navigate(['settings']);
    }
}
