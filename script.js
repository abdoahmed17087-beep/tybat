document.getElementById('generateBtn').addEventListener('click', askAI);

async function askAI() {
    const userInput = document.getElementById('userInput').value;
    const resultDiv = document.getElementById('mealResult');
    const loading = document.getElementById('loading');
    
    if (!userInput) return alert("من فضلك اكتب سؤالك!");

    const API_KEY = "API_KEY"; // ضع مفتاحك هنا
    const API_URL = "https://api.cohere.ai/v1/chat"; 

    // التعليمات الثابتة (النظام)
    const systemPrompt = `أنت مساعد خبير في "نظام الطيبات" للدكتور ضياء العوضي. 
    قاعدة البيانات:
    - المسموحات: (أرز، بطاطس، لحوم، كبدة، فواكه، زيتون، زبدة، توست نخالة، جبن مطبوخ).
    - الممنوعات: (دقيق، مكرونة، ألبان، بيض، دجاج، بقوليات، خضروات، شاي أحمر).
    - مهمتك: عند سؤال المستخدم عن أي صنف، اجعل إجابتك حاسمة (مسموح/ممنوع) مع التفسير العلمي والتحذير الطبي في النهاية.`;

    resultDiv.innerText = "";
    loading.style.display = "block";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                message: "المستخدم يسأل: " + userInput,
                preamble: systemPrompt,
                model: "command-r-08-2024",
                temperature: 0.2
            })
        });

        const data = await response.json();
        resultDiv.innerText = data.text;
    } catch (error) {
        resultDiv.innerText = "حدث خطأ في الاتصال، تأكد من مفتاح الـ API.";
    } finally {
        loading.style.display = "none";
    }
}
