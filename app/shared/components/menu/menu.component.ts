import { Component, OnInit } from '@angular/core';
import { Preset } from '../../models/ui';
import { Store } from '../../../core/app-store';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
    moduleId: module.id,
    selector: 'pt-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent implements OnInit {

    constructor(
        private navigationService: NavigationService
    ) { }

    public ngOnInit() { }

    public onSelectPresetTap(preset: Preset) {
        this.navigationService.navigate(['/backlog', preset]);
    }

    public onLogoutTap(args) {
        this.navigationService.navigate(['/auth', 'logout']);
    }

}
