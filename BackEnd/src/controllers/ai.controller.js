const aiService = require ("../services/ai.service")


module.exports.getReview = async (req,res)=>{
    const code = req.query.code;

    if(!code){
        return res.status(400).send("Prompt is required");
    }

    const response = await aiService(code);

    res.send(response);
}