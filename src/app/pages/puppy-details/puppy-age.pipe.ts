import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'puppyAge',
  standalone: true
})
export class PuppyAgePipe implements PipeTransform {

    transform(birthDate: string): string {
        const birth = new Date(birthDate);
        const now = new Date();

        const years = now.getFullYear() - birth.getFullYear();
        const months = now.getMonth() - birth.getMonth();
        const days = now.getDate() - birth.getDate();

        let ageYears = years;
        let ageMonths = months;

        if (months < 0 || (months === 0 && days < 0)) {
            ageYears--;
            ageMonths = (months + 12) % 12;
        }

        if (days < 0) {
            ageMonths--;
            if (ageMonths < 0) {
                ageMonths = 11;
                ageYears--;
            }
        }

        if (ageYears > 0) {
            return ageYears + ' год' + (ageYears > 1 ? 'а' : '');
        } else if (ageMonths > 0) {
            return ageMonths + ' месяц' + (ageMonths > 1 ? 'а' : 'ев');
        } else {
            return 'меньше месяца';
        }
    }

}
