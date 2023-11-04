export const TITLE_PROPERTY_NAME = 'Заголовок';
export const SUM_PROPERTY_NAME = 'Сумма';
export const EXPENSE_REGEXP =
    /^\[\d{2}\.\d{2}\.\d{4} в \d{2}:\d{2}\]\nПокупка [а-яА-Я,ё]{1,}\n((\d{1,3}.\d{1,3})|(\d{1,3}))\,\d{2}.{1}₽\n[а-яА-Я,ё]{1,}.{1}••.{1}\d{4}\nБаланс:\s.{1,}/g;
export const NOT_VALID_EXPENSE_STRING_ERROR = 'Передан не валидный расход';
