export interface AddExpenseDto {
    /**
     * Дата расхода
     */
    date: string;
    /**
     * Заголовок
     */
    title: string;
    /**
     * Сумма
     */
    sum: number;
    /**
     * Счет
     */
    billNumber: string;
}
