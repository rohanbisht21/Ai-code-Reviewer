const  {GoogleGenerativeAI} = require ("@google/generative-ai");


const genAI= new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction:`
    
    You are an code reviewer, who have an expertise in develepment and you
    look for the code and find the problems and
    suggest the solutions to the developer.

    You always try to find the best solutions for the developer
    and also try to make the code more efficient and clean.
    `

});


// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());



async function generateContent(prompt){

    const result = await model.generateContent(prompt);


    return result.response.text();
}


module.exports = generateContent