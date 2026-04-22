document.getElementById('generateBtn').addEventListener('click', generateMeal);

async function generateMeal() {
    const resultDiv = document.getElementById('mealResult');
    const loading = document.getElementById('loading');
    const btn = document.getElementById('generateBtn');

    // تأكد إن المفتاح ده هو اللي ظاهر في صفحة API Keys عندك
    const API_KEY = "71utW2oq4OTebDw2EavzhiAwPynKz0f5TTkdRgHL"; 
    const API_URL = "https://api.cohere.ai/v1/chat"; 

    resultDiv.innerText = "";
    loading.style.display = "block";
    btn.disabled = true;

    // التعليمات الدقيقة من صور نظام الطيبات
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
                model: "command-r-08-2024" 
            })
        });

        const data = await response.json();
        
        if (data.text) {
            resultDiv.innerText = data.text;
        } else {
            // لو المفتاح لسه فيه مشكلة هيطبع الرسالة دي
            resultDiv.innerText = "المفتاح غير صحيح أو الرصيد انتهى. راجع صفحة الـ API Keys.";
            console.log("Error Detail:", data);
        }
    } catch (error) {
        resultDiv.innerText = "خطأ في الاتصال! فعل إضافة CORS Unblock.";
    } finally {
        loading.style.display = "none";
        btn.disabled = false;
    }
}
