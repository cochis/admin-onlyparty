import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() titulo: string | undefined
  back = false
  constructor() {
    if (this.titulo != undefined) {
      console.log('this.titulo', this.titulo)
      if (
        this.titulo == 'Login' ||
        (this.titulo == 'Home' && this.titulo !== undefined)
      ) {
        this.back = true
      } else {
        this.back = false
      }
      console.log('this.back', this.back)
    }
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    if (
      this.titulo == 'Login' ||
      (this.titulo == 'Home' && this.titulo !== undefined)
    ) {
      this.back = true
    } else {
      this.back = false
    }
  }
}
