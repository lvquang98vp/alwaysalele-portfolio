# AlwaysAlele — Project handoff

Tài liệu chính để người phát triển hoặc AI ở cuộc trò chuyện khác tiếp tục project mà không cần đọc lại lịch sử chat.

**Cập nhật gần nhất:** 2026-10-08, múi giờ Asia/Bangkok. Ngày này là thời điểm cập nhật tài liệu, không phải ngày cập nhật profile nghệ sĩ.

## Rule bắt buộc khi cập nhật project

**Bất kỳ ai hoặc AI nào cập nhật project đều phải cập nhật README này trong cùng task và cùng commit/PR nếu có commit.** Rule được ghi trong `AGENTS.md` ở cả workspace gốc và repository `site/` để AI đọc khi làm việc từ một trong hai thư mục.

1. Đọc README trước khi sửa.
2. Cập nhật các mục liên quan để phản ánh trạng thái cuối cùng: tính năng, cách chạy, cấu hình, API, dữ liệu, giới hạn và việc còn chờ.
3. Thêm một mục trong **Nhật ký thay đổi** gồm ngày, thay đổi, lý do, file liên quan, kiểm tra đã thực hiện và việc chưa hoàn tất.
4. Áp dụng cả với thay đổi nội dung, ảnh, dependencies, schema, deployment, rule hoặc tài liệu. Nếu chỉ sửa README, ghi thay đổi ngay tại nhật ký; không tạo vòng lặp sửa tài liệu.
5. Không kết thúc task khi README còn lỗi thời. Không ghi kiểm tra hoặc deployment chưa thực hiện. Không ghi secrets, receipt key hoặc dữ liệu khách hàng.

Đây là quy tắc làm việc qua `AGENTS.md`; hiện chưa có CI/hook tự động chặn commit thiếu cập nhật README.

## Mục tiêu và quyết định của người dùng

- Dựng portfolio dựa trên https://vgen.co/AlwaysAlele, giữ phong cách banner hoa, avatar mèo, màu xanh lime, danh sách dịch vụ và gallery.
- Nội dung giao diện chỉ dùng **tiếng Anh**, giá chỉ dùng **USD**. README dùng tiếng Việt để bàn giao cho chủ project.
- Người dùng đã yêu cầu **không xây đăng nhập và nhắn tin**. Không tự thêm lại các tính năng này.
- Tính năng **đặt commission riêng** trên website: lưu yêu cầu và ảnh tham chiếu thực sự.
- Đã xóa các link Twitter, Instagram, TikTok khỏi sidebar.
- Có tab **Contact** cạnh **Portfolio**. Email chưa được cung cấp, hiển thị `Contact email coming soon.`. Không tự đặt email giả hoặc thêm mailto khi chưa có địa chỉ.
- Người dùng đang xem và thử bản **local**. Các thay đổi local không tự đồng nghĩa với thay đổi bản hosted.

## Trạng thái hiện tại

| Phần | Trạng thái |
| --- | --- |
| Commissions | 7 dịch vụ, nhóm PETS / Other, giá USD, slideshow, chi tiết và terms |
| Portfolio | 9 tác phẩm, gallery, lọc tag/commission, chi tiết và chuyển ảnh |
| Contact | Đã có trên local; email chờ người dùng gửi |
| Lưu dịch vụ / thích tranh | Lưu trên thiết bị qua localStorage; không đồng bộ tài khoản |
| Đặt commission | 3 bước: Customize → Your details → Review; lưu qua API |
| Biên nhận | Request ID, khóa riêng, file TXT tải xuống và tra cứu yêu cầu |
| Backend | Cloudflare Worker, D1 cho đơn, R2 cho ảnh tham chiếu |
| Thanh toán / email tự động | Chưa tích hợp |
| Quản trị đơn / báo giá / cập nhật trạng thái | Chưa có giao diện hoặc API quản trị; đơn mới luôn ở `received` |
| Đánh giá | Hiển thị 5.0 / 17 từ profile nguồn và link VGen; không có hệ thống review riêng |

Thông tin profile, badge, review và mức giá được lấy từ trang nguồn khi dựng bản đầu; chưa có cơ chế đồng bộ tự động. Các tag/nhãn gallery là dữ liệu trong catalog cục bộ.

## Local và hosted

- Repository ứng dụng nằm trong `site/`; workspace cha chứa rule và archive của lần publish đầu.
- Local: http://127.0.0.1:5173/
- Tab trực tiếp: `/#commissions`, `/#portfolio`, `/#contact`. Đây là hash navigation của một trang, không phải các route server riêng.
- Hosted: https://alwaysalele-portfolio.lv-quang-98-vp.chatgpt.site
- Sites project ID: `appgprj_6ac70b4d29ac819198f402a8d790e437`.
- Bản publish đã xác nhận thành công: commit `5fc5252c8578a7c1eb5f86a6a23f79a25f58052a`.
- Việc xóa social và thêm Contact được thực hiện **sau** lần publish đó và mới được xác nhận trên local. Tài liệu/rule của task này cũng chưa publish.
- Hosted hiện là bản private do Sites kiểm soát. Điều này khác với tính năng đăng nhập riêng của ứng dụng; ứng dụng không có UI tài khoản.
- Archive `../alwaysalele-site.tar.gz` là snapshot lần publish đầu, không phải source mới nhất. Luôn dùng source trong `site/`.

## Công nghệ và cấu trúc

### GitHub và danh tính Git

- GitHub repository: https://github.com/lvquang98vp/alwaysalele-portfolio
- Remote `origin`: `https://github.com/lvquang98vp/alwaysalele-portfolio.git`; `remote.pushDefault=origin`.
- Email tác giả commit bắt buộc cho project: `lv.quang.98.vp@gmail.com`, cấu hình bằng `git config --local user.email`. Đây là email Git, **không phải email Contact của portfolio**.
- Trước khi commit/push, kiểm tra `git config user.email` và `git remote -v`. Không sửa Git config global hoặc rewrite lịch sử cũ chỉ để đổi email.
- Email commit không quyết định tài khoản đăng nhập GitHub; push vẫn cần credentials có quyền trên repository. Cấu hình remote chưa chứng minh đã push thành công.
- Remote GitHub riêng với repository hosting do Sites quản lý; giữ project ID và luồng publish Sites khi dùng hosting hiện có.
- Branch GitHub dùng để bàn giao source: `main`. Kiểm tra đồng bộ bằng cách so sánh `git rev-parse HEAD` với `git ls-remote origin refs/heads/main`; email commit phải là email đã quy định.

Node.js >= 22.13.0, npm + `package-lock.json`, React 19, TypeScript, Vinext/Vite với API tương thích Next App Router, Tailwind CSS và CSS riêng, Lucide icons, Cloudflare Workers/D1/R2, Drizzle migrations.

| File / thư mục | Vai trò |
| --- | --- |
| `app/page.tsx` | UI chính và các component Modal, Slider, Terms, CommissionForm, Lookup; Contact nằm tại đây |
| `app/globals.css` | Layout, màu sắc, responsive và style Contact |
| `app/layout.tsx` | Metadata, ngôn ngữ HTML `en`, favicon |
| `lib/catalog.ts` | 7 dịch vụ, giá, phụ phí, ảnh, 9 tác phẩm và hàm `estimate()` |
| `app/api/commissions/route.ts` | POST lưu đơn/ảnh và GET tra cứu bằng khóa |
| `lib/commission-db.ts` | Truy cập DB/BUCKET và SHA-256 receipt key |
| `db/schema.ts` | Bảng `commissions` |
| `drizzle/` | SQL migrations cùng snapshot/journal |
| `public/art/` | 29 file WebP tải từ trang nguồn, gồm banner/avatar |
| `public/favicon.svg` | Favicon mèo theo màu project |
| `scripts/download-art.mjs` | Tải lại các asset nguồn; chạy khi cần, không cần mỗi lần dev |
| `scripts/verify-commissions.mjs` | Kiểm tra API local, có tạo đơn thử và upload ảnh thử |
| `.openai/hosting.json` | Sites identity và binding `DB`, `BUCKET` |
| `vite.config.ts`, `build/`, `scripts/` | Hạ tầng build/Worker/preview của starter; giữ Sites plugin |

`db/index.ts`, component UI và auth helper còn từ starter; commission API hiện dùng `lib/commission-db.ts`. Không coi các helper có sẵn là tính năng đã triển khai. Code UI hiện tập trung trong một file và khá nén; có thể tách component khi có yêu cầu phát triển tiếp.

## Chạy local

Chạy các lệnh từ thư mục `site/`:

```powershell
npm ci
npm run dev
```

Mặc định dev ở port 5173, HMR cập nhật khi sửa file. Dùng URL được server in ra nếu port thay đổi. Không bật thêm server trùng khi một server đã chạy. Có thể dùng trực tiếp `node scripts/run-framework.mjs dev` nếu npm shim gặp lỗi trên Windows.

### Khởi tạo dữ liệu trên máy mới

DB và bucket local nằm trong `.wrangler/state/`, khác dữ liệu hosted. Sau khi cài dependencies, build để sinh cấu hình Wrangler rồi áp dụng migration **chưa được áp dụng**:

```powershell
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_neat_zeigeist.sql
```

Migration đầu đã được áp dụng trên workspace hiện tại; không chạy lại mù quáng. Khi sửa schema, chạy `npm run db:generate`, kiểm tra SQL, giữ migration đã áp dụng bất biến và áp dụng migration mới theo thứ tự. Không tạo/alter bảng trong request runtime.

### Kiểm tra và build

```powershell
node node_modules/typescript/bin/tsc --noEmit
npm run build
# Cần dev server và D1 migration local trước khi chạy:
node scripts/verify-commissions.mjs
```

Script API hardcode localhost:5173 và **ghi dữ liệu thử vào DB/R2 local** mỗi lần chạy. Nó không phải test chỉ đọc và không được đổi sang endpoint production để chạy tùy tiện. `npm start` chạy Worker đã build bằng Wrangler local, không deploy; dùng URL nó in ra.

### Lưu ý Windows đã gặp

- Npm shim đã từng resolve sai `node_modules/npm/bin/npm-cli.js` theo working directory. Fallback đã dùng: `node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" install --no-audit --no-fund`.
- Build qua Sites helper dùng npm shim cục bộ trong `.sites-runtime/bin/npm.cmd`; thư mục này ignored và không có trên máy mới. Lệnh build trực tiếp của project là `node scripts/run-framework.mjs build`.
- Publish helper cần Bash của Git for Windows, không dùng `bash.exe` của WSL khi WSL chưa có Linux. Thêm `C:\Program Files\Git\bin` và `C:\Program Files\Git\usr\bin` trước các đường dẫn khác trong PATH của process khi cần.
- GNU tar cần `TAR_OPTIONS=--force-local` khi archive là đường dẫn Windows dạng `C:/...` để không hiểu dấu `:` là remote host.
- Không commit `.sites-runtime/`, `.wrangler/`, `node_modules/`, build output hoặc credentials. Không đổi global environment chỉ để khắc phục một task.

## Luồng commission và API

UI: chọn service → số pet/character và tùy chọn → màu nền, pose → tên/email/mô tả/ảnh → xem lại và đồng ý terms → gửi → nhận biên nhận. Terms trong UI là bản điều chỉnh cho request trên site này; không phải bản sao nguyên văn toàn bộ VGen terms.

`POST /api/commissions` nhận multipart FormData:

- `service`, `name`, `email`, `description`, `color`, `pose`, `count`, `format`, `background`, `terms`.
- `references`: 4–10 ảnh cho pet, 2–10 ảnh cho chibi/PNGTuber; PNG/JPEG/WebP, tối đa 5 MB/ảnh và 25 MB tổng.
- Kiểm tra field và chữ ký định dạng ảnh; đây không phải quét malware hoặc giải mã kiểm tra toàn bộ ảnh.
- Giá được tính lại ở server bằng catalog, không tin tổng tiền client gửi lên.
- Lưu ảnh vào R2 tại `commissions/<id>/<index>`, lưu metadata vào D1. Cố dọn ảnh đã upload nếu lưu đơn lỗi.
- Thành công trả HTTP 201 với `id`, `token`, `status`, `service`, `estimate`, `createdAt`. Receipt token chỉ trả khi tạo; DB lưu SHA-256 của token.

`GET /api/commissions?id=<request-id>` cần header `Authorization: Bearer <receipt-key>`:

- Trả `id`, service ID, estimate, status và `created_at`; không trả tên/email/mô tả/ảnh.
- Thiếu credentials: 401; sai ID/key: 404; storage lỗi: 503.
- UI yêu cầu nhập ID và private key từ file receipt. Không có email tự động để khôi phục key.

D1 lưu thông tin liên hệ, service, options JSON, estimate, description, reference metadata JSON, status, timestamp và terms version. R2 giữ byte ảnh; ảnh khách hàng không được đưa vào `public/`. localStorage chỉ dùng cho bookmarks/likes trên thiết bị, không phải nguồn lưu đơn.

Giá đầu: pet full $80 (+pet $70), watercolor $40 / full $60 (+pet $30 / $55, nền ước tính +$10), pet scene $95 (+$85), pet half $60 (+$50), chibi $65 (+$50), icon $35 (+$30), PNGTuber $45. Giá watercolor và PNGTuber ở mô tả nguồn có khác mức listing; UI ghi rõ cần báo giá cuối. Chưa có thanh toán.

## Publish và giới hạn còn lại

### Deploy trực tiếp bằng Cloudflare Workers Builds (GitHub)

Project chạy **Vinext/Vite**, không build bằng Next/OpenNext. Log ngày 2026-10-08 cho thấy lệnh deploy `npx wrangler deploy` chạy khi chưa có output, tự nhận Next.js rồi gọi OpenNext migrate. Migration định nâng Wrangler lên 4.148.0 nhưng workers-types đang pin 4.20260515.1, gây `ERESOLVE`. Không sửa bằng `--force` hoặc đổi dependencies theo OpenNext; dùng output Worker có sẵn của Vinext.

Trong Cloudflare Workers Builds:

- Root directory: root của repo GitHub (repo đã chứa nội dung `site/` tại root; không đặt root là `site`).
- Build command: `npm run build`.
- Deploy command: `npm run deploy:cloudflare`.
- Output thực tế: `dist/server/index.js` và `dist/client/`, không phải `.next` và không dùng Pages static-only cho API này.
- Build variables là tùy chọn khi đưa portfolio lên lần đầu: `CF_D1_DATABASE_ID` là UUID database thật, `CF_R2_BUCKET_NAME` là tên bucket R2 đã tạo trong tài khoản deploy. Chưa có biến thì script bỏ binding tương ứng khỏi deploy config, không dùng placeholder local. Để lưu commission cần cả hai binding và migration. Tên Worker là `alwaysalele-portfolio`; logical bindings giữ `DB` và `BUCKET`.

`scripts/deploy-cloudflare.mjs` đọc output `dist/server/wrangler.json`, tạo `dist/server/wrangler.cloudflare.json` với tên Worker và storage thật rồi chạy Wrangler đã pin trong dependencies. Script dừng khi thiếu build hoặc khi storage variable được cung cấp nhưng không hợp lệ. Thiếu storage variable chỉ cảnh báo và vẫn deploy portfolio, không chạy framework autodetection/migration. Không thay manifest hoặc binding của bản Sites; output `dist/` ignored.

Sau khi tạo D1/R2 và trước khi nhận commission, áp dụng migrations vào database Cloudflare riêng (không dùng DB placeholder local):

```powershell
# Sau build và sau khi deploy script đã tạo wrangler.cloudflare.json:
npx wrangler d1 migrations apply DB --remote --config dist/server/wrangler.cloudflare.json
```

Chạy `npm run deploy:cloudflare -- --dry-run` để kiểm tra package Worker mà không upload; có thể chạy không có storage variables; nếu cung cấp thì giá trị phải hợp lệ. Deployment trực tiếp không tự áp dụng migrations và không có access policy private của Sites. Chưa xác nhận deployment thật hoặc provisioning storage trong tài khoản Cloudflare riêng.

Khi cần publish, dùng Sites workflow theo skill hosting của môi trường, giữ project ID và binding hiện có. Workflow chuẩn bị source Git, build còn thiếu, tạo archive rồi gọi native save/deploy; chỉ coi deployment hoàn tất khi status `succeeded` trả URL. Credential lấy mới khi cần, chỉ giữ trong memory/stdin, không chép vào README, source hoặc shell history.

Không tự đổi audience private thành public. Trước khi dùng site nhận khách thật cần xác định cách chủ project đọc/xử lý đơn và liên hệ khách: hiện chưa có admin dashboard, email thông báo, báo giá, cập nhật trạng thái hoặc thanh toán. API chưa có idempotency chống duplicate submission, rate limiting hay spam protection đầy đủ; cần xử lý khi mở công khai. Receipt lookup chỉ chứng minh đơn đã lưu, chưa phải tracking quy trình sản xuất.

WebMCP feature-detect trong browser: `list_commission_services` đọc catalog; `start_commission_request` mở form, không gửi đơn. Có xử lý ID không hợp lệ. Không cần WebMCP để UI hoạt động.

## Việc tiếp theo đã biết

- Chờ email contact từ người dùng; thay placeholder bằng địa chỉ thật và mailto, rồi cập nhật README.
- Nếu người dùng yêu cầu, publish thay đổi Contact/social cùng các sửa tiếp theo.
- Chỉ xây quản trị đơn, thanh toán, email hoặc tính năng khác khi được yêu cầu; không tự thêm đăng nhập/nhắn tin.

## Nhật ký thay đổi

### 2026-10-08 — Dựng bản đầu và publish private

- Dựng portfolio tiếng Anh/USD từ VGen, 7 dịch vụ, 9 tác phẩm, slider/modal, bookmarks/likes, form commission và receipt lookup. File chính: `app/`, `lib/catalog.ts`, `lib/commission-db.ts`, `db/schema.ts`, `drizzle/`, `public/art/`, scripts kiểm tra/tải ảnh.
- Kiểm tra đã thực hiện: TypeScript, build, UI tab/gallery/form và breakpoint mobile; API local kiểm tra count sai, bytes ảnh sai, thiếu ảnh, giá server, lưu đơn và receipt key sai/đúng. WebMCP đã kiểm tra list, mở form và ID sai.
- Publish private đã trả `succeeded` với URL hosted. Chưa có thanh toán, email hay quản trị đơn.

### 2026-10-08 — Xóa social và thêm Contact trên local

- Theo yêu cầu người dùng, xóa Twitter/Instagram/TikTok và thêm Contact cạnh Portfolio; email để chờ cung cấp. File: `app/page.tsx`, `app/globals.css`.
- Đã kiểm tra TypeScript, HTTP local 200 và UI Contact được chọn/hiển thị. Chưa publish thay đổi này.

### 2026-10-08 — Tài liệu bàn giao và rule cập nhật README

- Thay README starter bằng tài liệu project thực tế: yêu cầu, trạng thái local/hosted, cấu trúc, lệnh chạy, API/storage, giới hạn và việc chờ email.
- Thêm `../AGENTS.md` và `AGENTS.md` buộc mọi cập nhật project đi kèm cập nhật README trong cùng task/commit.
- Đối chiếu với source, package scripts, migration, manifest, git status và các kết quả kiểm tra/publish đã ghi nhận. Không chạy lại test hoặc build vì task chỉ sửa tài liệu. Chưa thêm CI/hook tự động và chưa publish các tài liệu mới.

### 2026-10-08 — Email Git và remote GitHub mặc định

- Theo yêu cầu người dùng, đặt `user.email=lv.quang.98.vp@gmail.com` ở Git config local, thêm `origin` tới `lvquang98vp/alwaysalele-portfolio` và đặt `remote.pushDefault=origin`.
- Cập nhật README cùng `AGENTS.md` ở workspace và repository để AI khác giữ đúng email và remote. Không dùng email này cho Contact khi chưa được yêu cầu.
- Đã đọc lại email, remote fetch/push và push default để xác nhận cấu hình. Chưa tạo commit, chưa push GitHub, chưa deploy Cloudflare trong task này; lịch sử commit cũ giữ nguyên.

### 2026-10-08 — Chuẩn bị source cho GitHub main

- Gom thay đổi Contact/social, README bàn giao và rule vào commit để push `origin/main` theo yêu cầu người dùng. Danh tính Git local: `lvquang98vp <lv.quang.98.vp@gmail.com>`.
- Bỏ theo dõi file cache TypeScript `tsconfig.tsbuildinfo` và thêm `*.tsbuildinfo` vào `.gitignore`; không xóa cache local.
- Đã chạy TypeScript và build thành công. Kiểm tra các file đang tracked không tìm thấy file env/PEM/archive hoặc token theo các mẫu đã kiểm tra. Không coi đây là kiểm toán bảo mật đầy đủ.
- Push chỉ được coi hoàn tất sau khi remote main khớp HEAD; kết quả sẽ ghi ở mục xác nhận sau khi push. Không deploy Cloudflare trong task này.

### 2026-10-08 — Xác nhận push GitHub

- Đã push commit ứng dụng `a9c2b3f` lên `origin/main`; GitHub remote trả đúng SHA trùng HEAD khi kiểm tra lại. Commit dùng email `lv.quang.98.vp@gmail.com`.
- Commit tài liệu tiếp theo ghi kết quả xác nhận này; không đổi code hoặc chạy lại các kiểm tra đã pass. Bản hosted Cloudflare/Sites chưa được deploy lại.

### 2026-10-08 — Sửa đường deploy Cloudflare trực tiếp

- Đọc log build người dùng gửi, xác định Wrangler autodetection gọi OpenNext trước khi Vinext được build; xung đột dependencies là lỗi phát sinh từ đường chuyển đổi đó.
- Thêm `scripts/deploy-cloudflare.mjs` và npm script `deploy:cloudflare`, chỉ deploy output Vinext và yêu cầu D1/R2 thật qua build variables. Cập nhật hướng dẫn Cloudflare Build/Deploy và migrations trong README.
- Đã kiểm tra: build, TypeScript và Wrangler `--dry-run` thành công với UUID/bucket fixture chỉ dùng dry-run; không upload hoặc provision tài nguyên. Kiểm tra thiếu D1 variable dừng rõ ràng trước deploy cũng pass. Không dùng fixture cho deploy thật.
- Chưa có D1 database UUID/bucket của tài khoản deploy do người dùng cung cấp. Không deploy thật hoặc tự tạo storage trong task này; cần cập nhật settings trên Cloudflare rồi chạy lại.

### 2026-10-08 — Cho phép deploy portfolio trước khi nối storage

- Log mới xác nhận build thành công nhưng script deploy dừng vì thiếu D1 variable. Đổi `scripts/deploy-cloudflare.mjs` để D1/R2 optional cho lần tạo Worker đầu; thiếu biến sẽ bỏ binding local khỏi config và cảnh báo. Giá trị sai vẫn bị từ chối.
- Không mô phỏng lưu đơn: API commission hiện trả lỗi storage 503 và giữ form khi chưa có đủ DB/BUCKET. Cần nối storage và áp dụng migration trước khi nhận commission.
- Kiểm tra: Wrangler dry-run không có variables và kiểm tra generated config không chứa D1/R2 placeholder; trường hợp variables sai được kiểm tra riêng. Chưa xác nhận deployment thật trong tài khoản Cloudflare người dùng.
