async function geographyQuestions(difficulty: string | null) {
    if(difficulty === null) return;

    const geographyQuestionsRequest = await fetch(`https://opentdb.com/api.php?amount=15&category=22&difficulty=${difficulty}&type=multiple`);
    const serverQuestionResponses = await geographyQuestionsRequest.json();

    return serverQuestionResponses;
}

async function sportsQuestions(difficulty: string | null) {
    if(difficulty === null) return;

    const sportsQuestionsRequest = await fetch(`https://opentdb.com/api.php?amount=15&category=21&difficulty=easy&type=boolean`);
    const serverQuestionResponses =  await sportsQuestionsRequest.json();
    
    console.log(serverQuestionResponses);
    
    return serverQuestionResponses;
}

export { geographyQuestions, sportsQuestions };