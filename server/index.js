// require('dotenv').config()
import * as dotenv from 'dotenv'
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Configuration, OpenAIApi } = require("openai");

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Express API 
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

app.post("/", async (req, res) => {
    const { model, prompt, stops, temperature, max_tokens, top_p, frequency_penalty, presence_penalty } = req.body
    const response = await openai.createCompletion({
        model: model,
        prompt: prompt,
        temperature: temperature,
        max_tokens: max_tokens,
        top_p: top_p,
        frequency_penalty: frequency_penalty,
        presence_penalty: presence_penalty,
        stop: stops,
    });
    res.json({
        completionText: response.data.choices[0].text,
        promptPassed: response.config.data,
        response: response.data.choices[0]
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});