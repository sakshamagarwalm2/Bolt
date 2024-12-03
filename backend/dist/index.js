"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
exports.getGroqChatCompletionStream = getGroqChatCompletionStream;
/// <reference types="node" />
require("dotenv").config();
const groq_sdk_1 = __importDefault(require("groq-sdk"));
// Initialize Groq client with explicit type
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        var _d, _e;
        try {
            // STREAM: Add stream option to enable streaming response
            const stream = yield getGroqChatCompletionStream();
            // STREAM: Collect the streamed content
            let fullContent = '';
            try {
                // STREAM: Iterate through the streamed chunks
                for (var _f = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a; _f = true) {
                    _c = stream_1_1.value;
                    _f = false;
                    const chunk = _c;
                    // STREAM: Check if the chunk contains a content delta
                    const contentDelta = (_e = (_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content;
                    if (contentDelta) {
                        // STREAM: Print each chunk in real-time
                        process.stdout.write(contentDelta);
                        // STREAM: Accumulate the full content
                        fullContent += contentDelta;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_f && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // STREAM: Add a newline after streaming is complete
            console.log('\n');
        }
        catch (error) {
            console.error("Error in main function:", error);
        }
    });
}
function getGroqChatCompletionStream() {
    return __awaiter(this, void 0, void 0, function* () {
        // Define messages with explicit typing
        const messages = [
            {
                role: "user",
                content: "what is 2+2",
            },
        ];
        // STREAM: Create chat completion with streaming enabled
        return groq.chat.completions.create({
            messages,
            model: "llama3-8b-8192",
            max_tokens: 1000,
            temperature: 0.7,
            stream: true,
        });
    });
}
// Immediately invoke the main function
main().catch(console.error);
