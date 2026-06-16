import faqData from "./faqData";
import bibleData from "./bibleData";

function extractBibleText(data) {
    const texts = [];
    data.forEach(chapter => {
        texts.push(chapter.title);
        const processClauses = (clauses) => {
            clauses?.forEach(c => {
                if (c.title) texts.push(c.title);
                c.text?.forEach(t => texts.push(t.content));
                c.list?.forEach(l => texts.push(l));
            });
        };
        chapter.sections?.forEach(s => {
            texts.push(s.title || "");
            s.text?.forEach(t => texts.push(t.content));
            s.list?.forEach(l => texts.push(l));
        });
        chapter.subchapters?.forEach(sub => {
            processClauses(sub.clauses);
        });
    });
    return texts.join(" ");
}

const staticIndex = [
    {
        path: "/students/timetable",
        name: "Календарный учебный график",
        content: "календарный учебный график расписание сессия экзамен каникулы практика скачать"
    },
    {
        path: "/about/info",
        name: "О факультете",
        content: "факультет заочного обучения декан альмухаметов история достижения выпускники бакалавриат магистратура специалитет спо контакты адрес телефон"
    },
    {
        path: "/about/sociallinks",
        name: "Социальные сети",
        content: "вконтакте vk telegram youtube социальные сети контакты группа факультет"
    },
    {
        path: "/documents",
        name: "Документы",
        content: "документы студентов перевод отчисление восстановление справка академический отпуск студенческий билет"
    },
    {
        path: "/cards",
        name: "Направления подготовки",
        content: "направления специальности бакалавриат магистратура специалитет спо поступление план приёма бюджет платно"
    },
    {
        path: "/about/bible",
        name: "Правила пользования библиотекой",
        content: extractBibleText(bibleData)
    },
    ...faqData.map((item, i) => ({
        path: "/abiturient/faq",
        name: `FAQ: ${item.question.slice(0, 60)}...`,
        content: item.question + " " + item.answer.replace(/<[^>]+>/g, "")
    }))
];

export default searchIndex;