import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { questionsList } from './questions/questionsList';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('slider', { static: true }) slider: ElementRef | undefined; // aggiungere { static: true } altrimenti problemi nel caricamento GSAP
  @ViewChild('answer', { static: true }) answer: ElementRef | undefined;
  @ViewChild('questionContainer', { static: true }) questionContainer:
    | ElementRef
    | undefined;
  @ViewChild('menu', { static: true }) menu: ElementRef | undefined;
  @ViewChild('search', { static: true }) search: ElementRef | undefined;
  @ViewChild('logo', { static: true }) logo: ElementRef | undefined;
  @ViewChild('main', { static: true }) main: ElementRef | undefined;
  @ViewChild('actions', { static: true }) actions: ElementRef | undefined;
  @ViewChild('progress', { static: true }) progress: ElementRef | undefined;

  currentQuestionIndex = 0;
  progressValue: any;
  questions = questionsList;

  constructor(private cdr: ChangeDetectorRef) {}
  /* Interagendo con l'applicazione lo stato muta e l'app deve reagire di conseguenza.
 Per rendere i componenti reattivi al cambiamento dei dati e stato si usa il Change Detection. */

  ngOnInit(): void {
    this.initAnimations();
    this.increaseProgressValue();
  }

  // Blocco Animazione GSAP onInit
  initAnimations() {
    gsap.from(this.main?.nativeElement, {
      delay: 0.2,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    gsap.from(this.questionContainer?.nativeElement.childNodes, {
      delay: 0.5,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.menu?.nativeElement.childNodes, {
      delay: 0.4,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.search?.nativeElement.childNodes, {
      delay: 0.8,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.logo?.nativeElement, {
      delay: 0.3,
      duration: 0.4,
      opacity: 0,
      y: -20,
      stagger: 0.15,
    });
    gsap.from(this.actions?.nativeElement.childNodes, {
      delay: 0.6,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
    gsap.from(this.progress?.nativeElement.childNodes, {
      delay: 0.7,
      duration: 0.4,
      opacity: 0,
      y: -20,
    });
  }

  get question(): any {
    return this.questions[this.currentQuestionIndex];
  }

  increaseProgressValue() {
    this.progressValue =
      (100 * (this.currentQuestionIndex + 1)) / this.questions.length;
    if (this.currentQuestionIndex === 0) {
      gsap.to(this.slider?.nativeElement, {
        delay: 0.7,
        duration: 0.6,
        width: `${this.progressValue}%`,
      });
    } else {
      gsap.to(this.slider?.nativeElement, {
        duration: 0.6,
        width: `${this.progressValue}%`,
      });
    }
  }

  onSelect(answer: HTMLDivElement) {
    this.answer?.nativeElement.childNodes.forEach((node: HTMLDivElement) => {
      if (node.classList && node.classList.contains('selected')) {
        node.classList.remove('selected');
        console.log(
          this.answer?.nativeElement,
          this.answer?.nativeElement.childNodes
        );
      }
    });
    answer.classList.add('selected');
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      gsap.to(this.questionContainer?.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          this.currentQuestionIndex++;
          this.increaseProgressValue();
          //this.cdr.detectChanges();
          gsap.to(this.questionContainer?.nativeElement.childNodes, {
            duration: 0.4,
            opacity: 1,
            y: 0,
            stagger: 0.2,
          });
        },
      });
    }
  }

  previous() {
    if (this.currentQuestionIndex > 0) {
      gsap.to(this.questionContainer?.nativeElement.childNodes, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        stagger: 0.15,
        onComplete: () => {
          if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.increaseProgressValue();
            //this.cdr.detectChanges();
            gsap.to(this.questionContainer?.nativeElement.childNodes, {
              duration: 0.4,
              opacity: 1,
              y: 0,
              stagger: 0.15,
            });
          }
        },
      });
    }
  }
}
