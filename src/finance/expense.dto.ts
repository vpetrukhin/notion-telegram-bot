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
    sum: string;
    /**
     * Счет
     */
    billNumber: string;
}
