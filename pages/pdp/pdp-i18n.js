Language Data Model Standard
تعریف
Language Data Model استانداردی است که نحوه نگهداری، سازمان‌دهی و مدیریت متن‌های چندزبانه پروژه را مشخص می‌کند.
هدف این استاندارد این است که:
•	توسعه همزمان چند نفر بدون تداخل انجام شود.
•	مدیریت زبان‌ها ساده و مقیاس‌پذیر باشد.
•	اضافه کردن زبان‌های جدید در آینده آسان باشد.
•	ساختار تمام Featureها یکسان باقی بماند.
 
اصل اول — مالکیت داده‌های زبان (Language Ownership)
هر Feature فقط مسئول نگهداری داده‌های زبان مربوط به خودش است.
ساختار پیشنهادی:
home/
    home.data.js
    home.i18n.js

about/
    about.data.js
    about.i18n.js

women/
    women.data.js
    women.i18n.js

beauty/
    beauty.data.js
    beauty.i18n.js

pdp/
    pdp.data.js
    pdp.i18n.js
هیچ Feature نباید داده‌های زبان Feature دیگری را نگهداری کند.
 
اصل دوم — ساختار فایل
هر فایل i18n باید ساختار یکسانی داشته باشد.
نمونه:
export default {

    fa: {

    },

    en: {

    }

}
نمونه واقعی:
export default {

    fa: {

        pageTitle: "محصولات زنانه",

        emptyMessage: "محصولی یافت نشد",

        sortNewest: "جدیدترین",

        sortPrice: "قیمت"

    },

    en: {

        pageTitle: "Women's Products",

        emptyMessage: "No products found",

        sortNewest: "Newest",

        sortPrice: "Price"

    }

}
 
اصل سوم — Common Language File
تمام متن‌های مشترک پروژه باید فقط در فایل زیر نگهداری شوند:
common.i18n.js
نمونه:
export default {

    fa: {

        home: "خانه",

        search: "جستجو",

        cart: "سبد خرید",

        account: "حساب کاربری"

    },

    en: {

        home: "Home",

        search: "Search",

        cart: "Cart",

        account: "Account"

    }

}
تمام Featureها در صورت نیاز، این فایل را استفاده می‌کنند.
 
اصل چهارم — جلوگیری از تکرار
هیچ توسعه‌دهنده‌ای اجازه ندارد متن‌های مشترک را دوباره داخل Feature خودش تعریف کند.
نمونه نادرست:
home: "خانه"
داخل:
women.i18n.js
نمونه صحیح:
استفاده از مقدار موجود در:
common.i18n.js
 
اصل پنجم — نام کلیدها (Keys)
تمام Keyها باید به زبان انگلیسی نوشته شوند.
نمونه صحیح:
pageTitle
نمونه نادرست:
عنوان_صفحه
 
اصل ششم — نام‌گذاری معنایی
نام Keyها باید مفهوم واقعی متن را بیان کنند، نه ظاهر آن را.
نمونه صحیح:
addToCart

buyNow

pageTitle

emptyMessage
نمونه نادرست:
greenButton

text1

buttonLabel
 
اصل هفتم — ساختار ساده
تا زمانی که نیاز واقعی وجود ندارد، از Nested Object استفاده نشود.
ترجیح:
addToCart

buyNow

sortNewest
به جای:
buttons: {

    addToCart,

    buyNow

}
این ساختار خواناتر است و هنگام Merge نیز احتمال Conflict را کاهش می‌دهد.
 
اصل هشتم — توسعه زبان‌های جدید
برای اضافه کردن زبان جدید، فقط یک بخش جدید به همان ساختار اضافه می‌شود.
نمونه:
export default {

    fa: {

    },

    en: {

    },

    ar: {

    }

}
بدون نیاز به تغییر معماری پروژه.
 
نتیجه
این استاندارد باعث می‌شود:
•	هر Feature مالک داده‌های زبان خودش باشد.
•	توسعه همزمان چند نفر بدون تداخل انجام شود.
•	مدیریت فایل‌ها ساده و قابل نگهداری باشد.
•	اضافه کردن زبان‌های جدید در آینده بدون تغییر ساختار پروژه انجام شود.
•	تمام اعضای تیم از یک ساختار مشترک و استاندارد برای مدیریت داده‌های زبان استفاده کنند.
