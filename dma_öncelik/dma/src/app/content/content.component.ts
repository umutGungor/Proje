import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['../../styles.css']
})
export class ContentComponent implements OnInit {
  ngOnInit(): void {
    const isPageReloaded = sessionStorage.getItem('isPageReloaded');
    if (!isPageReloaded) {
      sessionStorage.setItem('isPageReloaded', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('isPageReloaded');
    }
  }
}




