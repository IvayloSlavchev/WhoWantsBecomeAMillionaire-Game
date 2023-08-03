async function musicQuestions(difficulty: string | null) {
    if(difficulty === null) return;

    const musicQuestionsRequest = await fetch(`https://opentdb.com/api.php?amount=15&category=12&difficulty=${difficulty}&type=multiple`);
    const serverQuestionResponses = await musicQuestionsRequest.json();

    return serverQuestionResponses;
}

async function filmsQuestions(difficulty: string | null) {
    if(difficulty === null) return;

    const filmsQuestionsRequest = await fetch(`https://opentdb.com/api.php?amount=15&category=11&difficulty=${difficulty}&type=multiple`);
    const serverQuestionResponses =  await filmsQuestionsRequest.json();
    
    console.log(serverQuestionResponses);
    
    return serverQuestionResponses;
}

export { musicQuestions, filmsQuestions };