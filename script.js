document.getElementById('generateBtn').addEventListener('click', generateMeal);

async function generateMeal() {
    const resultDiv = document.getElementById('mealResult');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('generateBtn');

    // تأكد أن المفتاح هنا هو مفتاح Cohere الصحيح
    const API_KEY = "API_KEY"; 
    const API_URL = "https://api.cohere.ai/v1/chat"; 

    // إعدادات العرض
    resultDiv.innerText = "";
    loading.style.display = "block";
    btn.disabled = true;
const systemPrompt = `
    أنت المساعد الرسمي لمنهج "نظام الطيبات" للدكتور ضياء العوضي.
    مرجعك الوحيد هو القوائم التالية، لا تخرج عنها أبداً:
    
    1. المسموحات (يُسمح بتكرارها يومياً):
    - النشويات: الأرز، البطاطس.
    - البروتينات: اللحوم (خروف، بقري، جملي)، الحمام، الكبدة.
    - الأسماك: مرة واحدة في الشهر فقط.
    - الفواكه: التمور، العنب، الجوافة (بدون بذر)، الرمان (بدون بذر)، التين، الموز، الفراولة، المشمش، البخارة (برقوق).
    - إضافات: زيتون، زبدة، مربى، نوتيلا، عسل، توست النخالة، جبن (شيدر، جودة، فلمنك).
    - المشروبات: الشاي الأخضر فقط.

    2. الممنوعات (يُمنع منعاً باتاً):
    - الدقيق ومشتقاته، المكرونة.
    - المشروبات الغازية، الشاي الأحمر.
    - الحليب ومشتقاته (قريش، أجبان طازجة، رايب).
    - البيض، الدجاج، الجمبري، الحبار.
    - البقوليات (فول، بسلة، لوبيا، فول سوداني).
    - الورقيات، الخضروات، البطيخ، الشمام.

    3. قواعد التشغيل:
    - الأكل عند الجوع فقط.
    - عند تقديم أي نصيحة، وضح السبب العلمي (كيميائي/حيوي) حسب منهج الدكتور ضياء.
    - شجع المستخدم على التدرج في تغيير العادات.
    - إذا سُئلت عن شيء غير موجود في القوائم أعلاه، اعتذر بوضوح لعدم توفر المعلومة في منهج النظام.
    - اختم دائماً بجملة: "هذه المعلومات قائمة على منهج نظام الطيبات للدكتور ضياء العوضي، ولا تغني عن التشخيص الطبي المتخصص".
    `;
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "اقترح لي خطة يوم كامل من نظام الطيبات.",
                preamble: systemPrompt,
                model: "command-r-08-2024",
                temperature: 0.3
            })
        });

        const data = await response.json();
        
        if (data.text) {
            resultDiv.innerText = data.text;
        } else {
            resultDiv.innerText = "حدث خطأ في الاتصال، تأكد من رصيد الـ API.";
            console.error(data);
        }
    } catch (error) {
        resultDiv.innerText = "خطأ في الاتصال! تأكد من تفعيل CORS.";
        console.error(error);
    } finally {
        loading.style.display = "none";
        btn.disabled = false;
    }
}
