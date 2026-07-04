Folder Structure
تعریف
Folder Structure یا ساختار پوشه‌های پروژه مشخص می‌کند فایل‌ها و پوشه‌های پروژه چگونه سازمان‌دهی شوند تا:
    • توسعه هم‌زمان چند نفر بدون تداخل انجام شود.
    • وابستگی بین بخش‌ها کاهش یابد.
    • Logic مشترک فقط یک‌بار نوشته شود.
    • هر توسعه‌دهنده فقط مسئول Feature خود باشد.
در این پروژه، ساختار پوشه‌ها بر اساس Page Type طراحی شده است، نه بر اساس Category یا Collection.

ساختار نهایی پروژه
project/

├── index.html
│
├── assets/
│
│   ├── css/
│   │
│   │   ├── style.css
│   │   │
│   │   └── pages/
│   │
│   │       home.css
│   │       about.css
│   │       contact.css
│   │       sale.css
│   │       plp.css
│   │       pdp.css
│   │       error.css
│   │
│   ├── js/
│   │
│   │   ├── main.js
│   │   │
│   │   ├── modules/
│   │   │
│   │   │   ├── cart/
│   │   │   │     cart.js
│   │   │   │
│   │   │   ├── drawer/
│   │   │   │     drawer.js
│   │   │   │
│   │   │   ├── search/
│   │   │   │     search.js
│   │   │   │
│   │   │   ├── toast/
│   │   │   │     toast.js
│   │   │   │
│   │   │   ├── storage/
│   │   │   │     storage.js
│   │   │   │
│   │   │   ├── utils/
│   │   │   │     utils.js
│   │   │   │
│   │   │   └── i18n/
│   │   │         i18n.js
│   │   │
│   │   └── engines/
│   │
│   │       home/
│   │           home-engine.js
│   │
│   │       about/
│   │           about-engine.js
│   │
│   │       contact/
│   │           contact-engine.js
│   │
│   │       sale/
│   │           sale-engine.js
│   │
│   │       plp/
│   │           plp-engine.js
│   │
│   │       pdp/
│   │           pdp-engine.js
│   │
│   │       error/
│   │           error-engine.js
│   │
│   ├── images/
│   └── icons/
│
├── pages/
│
│   ├── home/
│   │
│   │   home.html
│   │   home.js
│   │   home.data.js
│   │   home.preview.js
│   │   home.i18n.js
│   │
│   ├── about/
│   │
│   │   about.html
│   │   about.js
│   │   about.data.js
│   │   about.preview.js
│   │   about.i18n.js
│   │
│   ├── contact/
│   │
│   ├── sale/
│   │
│   ├── error/
│   │
│   ├── plp/
│   │
│   │   ├── women/
│   │   ├     |── women-accessories/ 
│   │   ├     |── women-shows-&-bags/ 
│   │   ├     |── women-clothing/
│   │   │	   |___women-dresses/
│   │   │	   |___women-jeans/
│   │   │	   |___women-coats/
│   │   │  	   | w-cl.html
│   │   │  	   | w-cl.js
│   │   │  	   | w-cl-data.js
│   │   │  	   | w-cl-preview.js
│   │   │  	   | w-cl-i18n.js
│   │   │
│   │   ├── Men/
│   │   ├── Kids/
│   │   ├── Beauty/
│   │   ├── Personal-Care/
│   │   └── ...
│   │
│   └── pdp/
│
│       └── product/
│
│           pdp.html
│           pdp.js
│           pdp-data.js
│           pdp-preview.js
│           product-i18n.js
│           
│
├── dist/
│
└── docs/

قوانین Folder Structure
1. Design System
تمام Design System فقط داخل:
assets/css/style.css
قرار می‌گیرد.
تمام صفحات فقط همین فایل را Import می‌کنند.

2. Page CSS
هر Template فقط یک فایل CSS دارد.
    • home.css
    • plp.css
    • pdp.css
    • about.css
    • contact.css
    • sale.css
    • error.css
تمام صفحات هم‌نوع از همان فایل استفاده می‌کنند.

3. Core Modules
تمام قابلیت‌های مشترک فقط داخل:
assets/js/modules/
توسعه داده می‌شوند.

4. Page Engines
تمام منطق مشترک صفحات فقط داخل:
assets/js/engines/
قرار می‌گیرد.

5. Collection Ownership
هر Collection فقط مالک فایل‌های زیر است:
    • collection.html
    • collection-data.js
    • preview.js
    • locales/fa.js
    • locales/en.js
این فایل‌ها فقط توسط توسعه‌دهنده همان Collection مدیریت می‌شوند.

6. Mock Data
Mock Data کنار همان Collection نگهداری می‌شود.
هیچ پوشه مرکزی برای Mock Data وجود ندارد.

7. Language Data
هر صفحه یا Collection فایل‌های ترجمه خودش را دارد.
تمام ترجمه‌های اختصاصی همان بخش داخل پوشه:
locales/
نگهداری می‌شوند.

8. i18n Module
ماژول i18n فقط شامل منطق تغییر زبان است.
هیچ متن ترجمه‌ای داخل i18n قرار نمی‌گیرد.
تمام داده‌های ترجمه داخل پوشه‌های locales صفحات و Collectionها نگهداری می‌شوند.

9. Preview
فایل preview.js فقط برای تست محلی توسعه‌دهنده استفاده می‌شود.
در Phase Page Engine حذف شده و Engine مشترک جایگزین آن خواهد شد.

10. Shared Logic
هیچ Collection اجازه توسعه Logic مشترک را ندارد.
تمام Logicهای مشترک فقط داخل:
    • Core Modules
    • Page Engines
توسعه داده می‌شوند.

قوانین i18n
    • ماژول i18n فقط موتور تغییر زبان است.
    • موتور i18n توسط Core Developer توسعه داده می‌شود.
    • هر توسعه‌دهنده فایل‌های ترجمه Feature خود را می‌نویسد.
    • هیچ فایل مرکزی برای تمام ترجمه‌های پروژه وجود ندارد.
    • این معماری باعث کاهش Merge Conflict و استقلال کامل اعضای تیم می‌شود.
    • کنند.
    • هیچ فایل اصلی با نام‌های عمومی مانند index.js، data.js، fa.js یا en.js ایجاد نمی‌شود.
    • هر Collection مالک فایل‌های خودش است.
    • تمام Logic مشترک فقط داخل modules و engines قرار می‌گیرد.
    • تمام Mock Data کنار همان Feature نگهداری می‌شود.
    • تمام فایل‌های ترجمه کنار همان Feature نگهداری می‌شوند.
    • پوشه dist فقط برای نسخه Production است و هیچ توسعه‌دهنده‌ای داخل آن کدنویسی نمی‌کند.
    • تمام مستندات پروژه داخل پوشه docs نگهداری می‌شوند.
