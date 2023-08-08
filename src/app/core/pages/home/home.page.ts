import { OnInit } from '@angular/core'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading = false
  app: string = environment.NameApp
  appAbr = environment.NameAppAbr
  Sistema = environment.NameSystem
  constructor(private readonly router: Router) { }
  ngOnInit() {
    this.loading = true
    setTimeout(() => {
      console.log('this.loading', this.loading)
      this.loading = false
      console.log('this.loading', this.loading)
    }, 3000)
  }

  logout(): void {
    this.router.navigateByUrl('auth', { replaceUrl: true })
  }
}
