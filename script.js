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
const promptText = `أنت الآن "مخطط يوم الطيبات الذكي". وظيفتك تصميم يوم كامل لمتبع نظام الدكتور ضياء العوضي.
يجب أن يكون الرد مرتباً كالتالي:

1. **نصيحة الصيام**: ذكّر المستخدم بفضل صيام (الإثنين والخميس) أو (الأيام البيض 13 و14 و15 من الشهر الهجري) إذا كان اليوم مناسباً، وشجعه على صيامهم.
2. **الفطار**: (اقتراح من: توست نخالة ريتش بيك، جبن شيدر أو فلمنك، تمر، عسل، نوتيلا).
3. **الغداء**: (اقتراح من: أرز أبيض/بسمتي، بطاطس محمرة بسمن بلدي، لحم ضأن أو بقري مسلوق ومحمر، سمك بحري مشوي).
4. **العشاء**: (وجبة خفيفة من المسموحات).
5. **ممنوعات اليوم**: ذكّره بلهجة مصرية يبعد تماماً عن (الفراخ، البيض، اللبن، الخضار الأخضر، البقوليات).

استخدم رموز تعبيرية (Emojis) ولهجة مصرية مشجعة جداً وكأنك دكتور ضياء بيكلمه.`;

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
