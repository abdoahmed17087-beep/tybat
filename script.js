document.getElementById('generateBtn').addEventListener('click', generateMeal);

async function generateMeal() {
    const resultDiv = document.getElementById('mealResult');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('generateBtn');

    // مفتاحك سليم
    const API_KEY = "api_key"; 
    const API_URL = "https://api.cohere.ai/v1/chat"; 

    resultDiv.innerText = "";
    loading.style.display = "block";
    btn.disabled = true;

    const promptText = `أنت الآن مساعد متخصص في "نظام الطيبات" للدكتور ضياء العوضي.
يجب أن تلتزم بالقواعد التالية بدقة شديدة بناءً على دستور النظام:

1. المسموحات (استخدمها فقط):
   - النشويات: أرز (أبيض أو بسمتي)، بطاطس، توست نخالة (ريتش بيك)، قلقاس.
   - البروتين: لحم ضأن، لحم بقري (مسلوق ومحمر في سمن)، سمك بحري مشوي، تونة (مصفاة من الزيت).
   - الدهون: سمن بلدي، زيت زيتون، زبدة طبيعية.
   - السكريات: تمر، عسل نحل، نوتيلا، شوكولاتة غامقة.
   - الألبان: جبن شيدر، جبن فلمنك فقط.

2. الممنوعات القطعية (لا تقترحها أبدًا):
   - الفراخ، البيض، اللبن السائل، الزبادي.
   - الدقيق الأبيض (فينو، مكرونة، كيك).
   - البقوليات (فول، عدس، فاصوليا).
   - الخضروات الورقية أو الخضراء (سلطة، ملوخية، سبانخ).
   - الزيوت النباتية المهدرجة.

المهمة: اقترح وجبة غداء واحدة كاملة بلهجة مصرية عامية، واشرح ليه الوجبة دي "طيبة" (مثلاً: عشان مفيهاش سموم الفراخ أو الخضار).`;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: promptText,
                // الموديلات المتاحة حالياً (اختر واحد منهم)
                model: "command-r-08-2024" // أو جرب "command-r-plus"
            })
        });

        const data = await response.json();
        
        if (data.text) {
            resultDiv.innerText = data.text;
        } else {
            // في حالة وجود رسالة خطأ من السيرفر بخصوص الموديل
            resultDiv.innerText = "السيرفر لم يرسل نصاً. تحقق من اسم الموديل في الـ Console.";
            console.log("Response Data:", data);
        }
    } catch (error) {
        resultDiv.innerText = "خطأ في الاتصال! تأكد من تفعيل إضافة CORS Unblock.";
    } finally {
        loading.style.display = "none";
        btn.disabled = false;
    }
}