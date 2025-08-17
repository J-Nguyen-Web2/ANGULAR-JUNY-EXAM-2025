import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Theme } from '../../../models/theme.model';
import { RouterLink } from '@angular/router';
import { ShortTitlePipe } from '../../../shared/pipe/short-title-pipe';

@Component({
  selector: 'app-catalog-item',
  imports: [RouterLink, ShortTitlePipe],
  templateUrl: './catalog-item.html',
  styleUrl: './catalog-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class CatalogItem {
  @Input() theme!: Theme
}
