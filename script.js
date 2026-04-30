// ربط الزر بالدالة عند تحميل الصفحة

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('generateBtn').addEventListener('click', askAI);

});



async function askAI() {

    const userInput = document.getElementById('userInput').value;

    const resultDiv = document.getElementById('mealResult');

    const loading = document.getElementById('loading');

    

    // التأكد من أن المستخدم كتب شيئاً

    if (!userInput.trim()) {

        alert("من فضلك اكتب اسم الأكلة أو سؤالك!");

        return;

    }



    // إعدادات العرض أثناء التحميل

    resultDiv.innerText = "";

    loading.style.display = "block";



    const API_URL = "https://api.cohere.ai/v1/chat"; 



    // التعليمات الثابتة لضبط هوية البوت

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

                message: "هل هذا مسموح في نظام الطيبات؟: " + userInput,

                preamble: systemPrompt,

                model: "command-r-08-2024",

                temperature: 0.2

            })

        });



        const data = await response.json();



        // معالجة الرد وتفادي الـ undefined

        if (data && data.text) {

            resultDiv.innerText = data.text;

        } else {

            resultDiv.innerText = "حدث خطأ في استلام الرد من النظام. تأكد من صلاحية المفتاح.";

            console.error("API Error Details:", data);

        }

    } catch (error) {

        resultDiv.innerText = "خطأ في الاتصال بالخادم. تأكد من تفعيل CORS أو جودة الإنترنت.";

        console.error("Connection Error:", error);

    } finally {

        loading.style.display = "none";

    }

}
