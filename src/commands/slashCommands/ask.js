const { SlashCommandBuilder } = require('@discordjs/builders');
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask a question and get an answer from OpenAI')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The prompt for the OpenAI API')
                .setRequired(true)),

    async execute(interaction) {
        // Get the prompt from the user
        const prompt = interaction.options.get('prompt').value;

        // Configure the OpenAI API
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        try {
            // Make a request to the OpenAI API and send the response back to the user
            const result = await openai.completions.create({
                model: 'text-davinci-002',
                prompt,
                max_tokens: 1024,
                n: 1,
                stop: ['\n']
            });

            const answer = result.data.choices[0].text.trim();
            interaction.reply({
                content: `Here's your response: ${answer}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'There was an error processing your request.',
                ephemeral: true
            });
        }
    }
}
