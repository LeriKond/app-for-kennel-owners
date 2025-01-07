import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from 'docx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class LitterExportService {

  constructor() { }

    // generatePDF(litter: any) {
    //     console.log(litter);
    //     const doc = new jsPDF();
    //
    //     doc.setFont('DejaVuSans', 'normal');
    //
    //     doc.setFontSize(16);
    //     doc.text('Отчёт о помёте', 10, 10);
    //
    //     // Добавление основной информации
    //     doc.setFontSize(12);
    //     doc.text(`Дата рождения: ${litter.birthDate}`, 10, 20);
    //     doc.text(`Родители: ${litter.parents}`, 10, 30);
    //     doc.text(`Владелец: ${litter.owner}`, 10, 40);
    //     doc.text(`Количество щенков: ${litter.totalPuppies}`, 10, 50);
    //     doc.text(`Количество сук: ${litter.totalFemales}`, 10, 60);
    //     doc.text(`Количество кобелей: ${litter.totalMales}`, 10, 70);
    //
    //     // Таблица щенков
    //     const tableData = litter.puppies.map((puppy, index) => [
    //         index + 1,
    //         puppy.name,
    //         puppy.gender === 'male' ? 'Кобель' : 'Сука',
    //         puppy.color,
    //         puppy.tagNumber,
    //     ]);
    //
    //     (doc as any).autoTable({
    //         head: [['#', 'Имя', 'Пол', 'Окрас', 'Клеймо']],
    //         body: tableData,
    //         startY: 80,
    //     });
    //
    //     // Сохранение PDF
    //     doc.save(`Информация о помете-${litter.birthDate}.pdf`);
    // }

    generateDocx(litter: any) {
        // Создаем новый документ с конфигурацией
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph({
                            text: 'Отчёт о помёте',
                            heading: 'Title',
                        }),
                        new Paragraph(`Дата рождения: ${litter.birthDate}`),
                        new Paragraph(`Родители: ${litter.parents}`),
                        new Paragraph(`Владелец: ${litter.owner}`),
                        new Paragraph(`Количество щенков: ${litter.totalPuppies}`),
                        new Paragraph(`Количество сук: ${litter.totalFemales}`),
                        new Paragraph(`Количество кобелей: ${litter.totalMales}`),
                        new Paragraph(''), // Пустая строка перед таблицей

                        // Таблица с информацией о щенках
                        new Table({
                            rows: [
                                // Заголовок таблицы
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph('№')] }),
                                        new TableCell({ children: [new Paragraph('Имя')] }),
                                        new TableCell({ children: [new Paragraph('Пол')] }),
                                        new TableCell({ children: [new Paragraph('Окрас')] }),
                                        new TableCell({ children: [new Paragraph('Клеймо')] }),
                                    ],
                                }),
                                // Строки с данными щенков
                                ...litter.puppies.map((puppy: any, index: number) =>
                                    new TableRow({
                                        children: [
                                            new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                                            new TableCell({ children: [new Paragraph(puppy.name)] }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph(puppy.gender === 'male' ? 'Кобель' : 'Сука'),
                                                ],
                                            }),
                                            new TableCell({ children: [new Paragraph(puppy.color)] }),
                                            new TableCell({ children: [new Paragraph(puppy.tagNumber)] }),
                                        ],
                                    })
                                ),
                            ],
                        }),
                    ],
                },
            ],
        });

        // Генерация и сохранение файла
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `Данные о помете-${litter.birthDate}.docx`);
        });
    }
}
