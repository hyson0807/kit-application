import {internalAction, mutation} from "./_generated/server";
import { v } from "convex/values";
import {api, internal} from "./_generated/api";

// ✅ 내부 액션
export const generateAIResponse = internalAction({
    args: {
        question: v.string(),
        clerkId: v.string(),
        questionId: v.id("questions"),
    },
    handler: async (ctx, args) => {
        const question = args.question;

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
        const PINECONE_API_KEY = process.env.PINECONE_API_KEY || '';
        if (!OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
        if (!PINECONE_API_KEY) throw new Error("Missing PINECONE_API_KEY");


        try {
            // ✅ 키를 함수로 전달
            const embeddedQuestion = await getEmbedding(question, OPENAI_API_KEY);
            const replyedData = await queryPinecone(embeddedQuestion, PINECONE_API_KEY);

            const context = replyedData.map((m: { metadata?: { text?: string } }) => m.metadata?.text || '').join('\n');

            const answer = await generateAnswer(question, context, OPENAI_API_KEY);
            console.log('GPT 답변:', answer);

            await ctx.runMutation(api.openai.importAnswer, {
                answer: answer,
                questionId: args.questionId

            })

        } catch (err) {
            console.error("generateAIResponse 오류:", err);
        }


    },
});


const getEmbedding = async (question: string, apiKey: string) => {
    const response = await fetch("https://api.openai.com/v1/embeddings", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input: question,
            model: "text-embedding-3-small",
            dimensions: 512,
        }),
    });

    const result = await response.json();
    return result.data[0].embedding;
};

const queryPinecone = async (vector: number[], apiKey: string) => {
    const response = await fetch("https://chatbot0-p3qnqqr.svc.aped-4627-b74a.pinecone.io/query", {
        method: "POST",
        headers: {
            "Api-Key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            vector: vector,
            topK: 5,
            includeMetadata: true,
        }),
    });

    const resData = await response.json();
    return resData.matches;
};

const generateAnswer = async (question: string, context: string, apiKey: string) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant chat-bot. Use the context to answer the user question.",
                },
                {
                    role: "user",
                    content: `질문: ${question}\n\n참고자료:\n${context}`,
                },
            ],
        }),
    });

    const resData = await response.json();
    return resData.choices[0].message.content;
};

export const importAnswer = mutation({
    args: {
        answer: v.string(),
        questionId: v.id("questions"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.questionId, {
            answer: args.answer
        })
    }
})


