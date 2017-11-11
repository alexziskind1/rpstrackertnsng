import { Component, OnInit } from '@angular/core';

//import { Store } from '../../../core/app-store';
import { NavigationService } from '../../../core/services/navigation.service';
import { PresetType } from '../../../shared/models/ui/types';

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

    public onSelectPresetTap(preset: PresetType) {
        this.navigationService.navigate(['backlog', preset]);
    }
}
