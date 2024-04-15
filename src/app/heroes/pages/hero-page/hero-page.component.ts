import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params //<-- hay esta el params de la url ver en heroes-rputin es el :id
      .pipe(
        delay(100),
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        console.log({ hero });

        return;
      });

    //this.heroesService.getHeroById();
  }

  goback(): void {
    this.router.navigateByUrl('heroes/list');
  }
}
