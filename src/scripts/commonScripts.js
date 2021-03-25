const mistakes = {
    0: "pass",
    1: "too many symbols",
    2: "not enough symbols",
    3: "regular not passed",
    4: "number too big",
    5: "number too small",

}


export const checkStringInput = (str, max, min, re = /./) => {
    if (str.length > max){
        return mistakes[1]
    }
    if (str.length < min){
        return mistakes[2]
    }
    if (re.test(String(str).toLowerCase())){
        return mistakes[3]
    }
    return mistakes[0]
}

export const checkIntInput = (num, maxNum, minNum) => {
    if (num > maxNum){
        return mistakes[4]
    }
    if (num < minNum){
        return mistakes[5]
    }
    return mistakes[0]
}


export const getGradeValues = (grade) => {
    switch(grade) {
        case 'internship':  
            return 'Стажер'
        case 'junior':  
            return 'Начинающий специалист'
        case 'middle':  
            return 'Специалист'
        case 'senior':  
            return 'Главный специалист'
        case 'director':  
            return 'Управляющий отдела'
        case 'senior-director':  
            return 'Генеральный директор'
      
        default:
            break
    }
}

export const getEducationValues = (education) => {
    switch(education) {
        case 'course':  
            return 'Курсы'
        case 'primary':  
            return 'Начальное образование (4 класса)'
        case 'basic':  
            return 'Среднее общее образование (9 классов)'
        case 'secondary':  
            return 'Среднее полное образование (11 классов)'
        case 'post-secondary':  
            return 'Среднее профессиональное образование'
        case 'bachelor':  
            return 'Высшее (бакалавриат)'
        case 'specialist':  
            return 'Высшее (специалитет)'
        case 'master':  
            return 'Высшее (магистратура)'
        case 'PhD-asp':  
            return 'Аспирантура'
        case 'PhD-doc':  
            return 'Докторантурa'
      
        default:
            break
      }
}

export const getWorkTypeValues = (workType) => {
    switch(workType) {
        case 'part-day':  
            return 'неполный день'
        case 'full-day':  
            return 'полный день'
        case 'part-time':  
            return 'неполная занятость'
        case 'full-time':  
            return 'полная занятность'
        case 'volunteer':  
            return 'волонтерство'
        case 'one-time-job':  
            return 'разовое задание'
        case 'flexible-schedule':  
            return 'гибкий график'
        case 'shift-schedule':  
            return 'сменный график'
        case 'shift-method':  
            return 'вахтовый метод'
        case 'remote':  
            return 'удаленная работа'
      
        default:
            break
    }
}

export const getLanguageValues = (language) => {
    switch(language) {
        case 'A1':  
            return 'A1 - начинающий (Beginner)'
        case 'A2':  
            return 'A2 - предпродвинутый (Pre-Intermediate)'
        case 'B1':  
            return 'B1 - продвинутый (Intermediate)'
        case 'B2':  
            return 'B2 - предпрофессиональный (Upper-Intermediate)'
        case 'C1':  
            return 'C1 - Профессиональный (Advanced)'
        case 'C2':  
            return 'C2 - Владение в совершенстве (Mastery)'
        
        default:
            break
    }
}