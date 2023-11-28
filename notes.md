**TOC**
- [Miscellaneous](#miscellaneous)
- [PART 0](#part-0)
- [PART 1](#part-1)
- [PART 2](#part-2)
  - [a. Rendering collections](#a-rendering-collections)
  - [b. Form](#b-form)
  - [c. Getting data from server](#c-getting-data-from-server)
- [PART 3](#part-3)
  - [a. Node.js \& Express](#a-nodejs--express)
  - [b. Deploying app to internet](#b-deploying-app-to-internet)
  - [c. MongoDB](#c-mongodb)
- [PART 4](#part-4)
  - [a. Backend structure \& Testing 101](#a-backend-structure--testing-101)
  - [b. async/await](#b-asyncawait)
  - [c. users administration](#c-users-administration)
    - [c1. storing users' information in DB](#c1-storing-users-information-in-db)
    - [c2. Token-based authentication](#c2-token-based-authentication)
- [PART 5](#part-5)
  - [a. Frontend login](#a-frontend-login)
  - [b. React props.children and prototypes](#b-react-propschildren-and-prototypes)
  - [c. Testing react frontend](#c-testing-react-frontend)
  - [d. End to end testing](#d-end-to-end-testing)

---

# Miscellaneous

- vite init:
`npm create vite@latest <app name> -- --template react`

- eslint.cjs config:
`'react/prop-types': false`

- json-server comman (package.json):
`"server": "json-server -p3001 --watch db.json"`

- main.jsx - React v18:
```
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App tab='/' />);
```

- set .env keys using terminal powershell:
_*key bắt buộc phải có tiền tố "VITE" nếu setup thông qua terminal CLI.
```
($env:VITE_APP_KEY="54l41n3n4v41m34rv0") -and (npm run dev)
```
- access .env keys:
```
const api_key = import.meta.env.VITE_APP_KEY
```

---

# PART 0

---

# PART 1

---

# PART 2

## a. Rendering collections

## b. Form
- Uncontrolled/Controlled components.

## c. Getting data from server
- `.then` chaining: tham số của mỗi hàm .then sau là kết quả của Promise đứng trước nó. Lưu ý mỗi lần then sẽ chỉ nhận 1 hàm/phương thức với mục đích xử lý tuần tự từng bước. Nếu muốn thực hiện nhiều hàm trong cùng một bước then, có thể sử dụng một anonymous function làm callback cho bước then đó.
      ```then(() => {
      fnc1();
      fnc2();
      ...
      })```

_* console.log() sẽ return undefined, vì vậy không nên đưa nó vào riêng 1 bước .then()._

---

# PART 3

## a. Node.js & Express

- Semantic versoning : ^[major].[minor].[patch]. Các thay đổi ở minor và patch có thể tương thích ngược, nhưng major thì không. Vd: ver 1.69.99 vẫn có thể tương thích với ver 1.1.1, nhưng không tương thích được với 2.0.0.

- ES6 modules = import/export.

- CommonJS module = require.() / module.exports

- NodeJS-repl: (terminal command "node"/exit: Ctrl + D) giao diện dòng lệnh tương tác của Node, dùng để viết code thực thi tức thì, hỗ trợ việc kiểm thử hàm.

- overriding default error msg: res.statusMessage()

- 1 trong những header quan trọng nhất của request là **[Content Type]**. Nó ảnh hưởng đến việc convert kiểu dữ liệu trả về.

- Sử dụng kết hợp điều kiện if và return để xử lý trường hợp request lỗi để tránh thực thi code không cần thiết khi request có lỗi.

- Method HEAD cũng tương tự với GET, nhưng server sẽ không trả về dữ liệu trong response. HEAD được dùng để truy cập các metadata của dữ liệu.

- idempotent - tính luỹ đẳng, đơn điệu. Theo chuẩn RESTful API, ngoại trừ method POST, tất cả các loại request khác đều có tình chất là với cùng một request, dù lặp lại bao nhiêu lần thì nó vẫn cho cùng một kết quả. Nói cách khác, một request không sinh ra side-effect sẽ tạo ra chỉ một kết quả bất kể được gửi bao nhiêu lần.

- Các middleware sẽ được thực thi theo trình tự được khai báo nên cần lưu ý sắp xếp chúng hợp lý. VD, nên khai báo boy-parser trước request logger. Thông thường các middleware sẽ được gọi trước các routes, vì trong route cần parse JSON data để gửi trả response. Nhưng cũng có 1 số middleware có thể được khai báo sau routes, ví dụ middleware dùng để catch các request gửi đến route/endpoint không tồn tại:

```
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```
- Cấu trúc 1 url:
```
http://example.com:80/index.html
  
protocol: http
host: example.com
port: 80
```
- Khi truy cập một trang web, vd http://example.com, trình duyệt sẽ đưa ra yêu cầu tới máy chủ lưu trữ trang web example.com. Server sẽ gửi response là một tệp HTML có thể chứa một hoặc nhiều tham chiếu đến các nội dung/tài nguyên bên ngoài  (có thể được lưu trữ trên cùng hoặc khác máy chủ với trang example.com). Khi trình duyệt nhìn thấy tham chiếu đến một URL trong file HTML nguồn, nó sẽ gửi đi một request. Nếu request này đến từ cùng URL mà file HTML nguồn được tìm nạp thì trình duyệt sẽ xử lý phản hồi mà không gặp bất kỳ sự cố nào. Tuy nhiên, nếu tài nguyên được tìm nạp bằng URL không cùng nguồn gốc (protocol, host, port) như HTML nguồn thì trình duyệt sẽ phải kiểm tra request header [**Access-Control-Allow-origin**]. Nếu nó chứa "*" hoặc URL của HTML nguồn, trình duyệt sẽ xử lý response, nếu không trình duyệt sẽ từ chối xử lý và throw ra lỗi.

## b. Deploying app to internet

***Các bước set-up Render để deploy 1 PJ full stack dựa vào code backend (chạy both ends trên cùng port):**

- Config PORT trong file index với `process.env.PORT`

- Copy production build code frontend (dist folder) để serve static files cho backend: `app.use(express.static("dist"));`. Có thể thêm script để automate quá trình build code frontend và copy folder dist vào root của code backend:
```
"build:ui": "@powershell Remove-Item -Recurse -Force dist && cd ../frontend && npm run build && @powershell Copy-Item dist -Recurse ../backend",
"deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push",
```

***Testing (chạy FE và BE trên 2 port riêng - dev mode):**

- Dùng middleware cors để cho phép kết nối FE và BE đang chạy trên 2 port khác nhau.

- Config proxy để kết nối code FE (ở dev mode) với backend qua file vite.config.js (frontend):
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
```
* Với cả 2 trường hợp, cần lưu ý config baseUrl trong các services của FE không chứa origin "http://locolhost:{port}' để tránh conflict.

## c. MongoDB
- Là một dạng document / NoSQL database.

- Query syntax: https://www.mongodb.com/docs/manual/reference/operator/query/

- set các biến môi trường với middleware dotenv. Lưu ý sử dụng lệnh `require('dotenv').config();` tại file có truy cập đến biến môi trường.

_* Ngoài cách sử dụng doenv, còn có thể gán biến môi trường bằng CLI terminal trong khi khởi chạy app: `API_KEY=<key> npm run dev`_

_* Lưu ý rằng các handler của express router (tức hàm nhận req và res làm tham số) bản chất không phải là async function, cho nên cần sử dụng từ khóa async/await (cách này được khuyên dùng hơn so với kiểu .then() chains) nếu muốn xử lý promise bên trong các handler này. Đồng thời kết hợp thêm try/catch để phát hiện chính xác và xử lý lỗi. Điều này đặc biệt quan trọng vì status lỗi mặc định từ server thường rất chung chung hoặc gây nhầm lẫn về nguyên nhân gây lỗi (wtf is "Internal Server Error" !?). Tốt nhất là nên dùng middleware logger để kiểm tra output và errorhandler báo chính xác lỗi khi tương tác với server._

- Đối với việc update, chỉnh sửa data, data được gửi đi trong request nên là data đã được chỉnh sửa. Tức là nên viết logic xử lý biến đổi data ở frontend, sau đó gửi data đã biến đổi đó để backend cập nhật dữ liệu trên DB; thay vì viết logic biến đổi data ở route. Như vậy sẽ tránh được việc vừa phải thực hiện xử lý logic vừa thực hiện một Promise.

- Với các route chỉ trả về `res.status()` (vd 204 hoặc 303), nên dừng thêm `.send()` để cho biết request đó đã success, đặc biệt là khi ở phía frontend cần chờ kết quả của request đó để thực hiện một việc gì đó kế tiếp (vd hiển thị thông báo kết quả của thao tác).

---

# PART 4

## a. Backend structure & Testing 101

- Việc tổ chức cấu trúc code backend hợp lý có thể hỗ trợ việc test API call nhanh chóng mà không phải thông qua HTTP network.

**Testing process:**

- **Unit Test:** thực hiện đối với các đơn vị nhỏ lẻ, ví dụ 1 hàm chức năng.

  + cài đặt thư viện test: `npm i --save-dev jest`
  + config thư viện test (chỉnh sửa file package.json và .eslintrc.js, etc...)
  + Tạo file unit test testingFnc.test.js trong thư mục **_tests_**, import function cần test và tiến hành kiểm thử:
  
  ```
  describe('<testingFnc>', ()=> {
    test('<test's name>', () => {
    const result = testingFnc(params)

    expect(result).toBe(<expectedResult>)
    })
  })
  ```
    * describe: để nhóm các test case của 1 unit
    * test: 
        1st params = log/case description
        2nd params = callback to execute testing logic
    * expect: received value from testing case
    * toBe: the expected value when unit work correctly

  + chỉnh sửa script test: `"test": "jest --verbose"`
  + run all tests: `npm test`
  + jest tips: 
    * dùng `test.only()` để chỉ chạy 1 test case đang cần debug
    * dùng `npm test -- <path...>/<test file>` để chạy riêng từng file test
    * có thể dùng `npm test -- -t "test's name"/"description"` để chạy riêng lẻ 1 test case/group
    * khi kết quả test object, nên dùng `toEqual()` / `toStrictEqual()` thay cho `toBe()`
    * dùng `toContain()` để tìm 1 giá trị trong mảng kết quả.
    * tham số thứ 3 của method `test()` là test timeout, tính bằng ms
    * method `beforeEach()` và `afterAll()` cho phép thực hiện các công việc chuẩn bị khi test với database.
    * package supertest có thể được xem là một "phần mở rộng" của jest, cho phép test APIs mà không cần chạy server.

- **Intergration Test**: test tích hợp để kiểm thử sự tương tác giữa các modules / components

  + set NODE_ENV = development / test / production để phân biệt các chế độ khơi chạy ứng dụng (theo giai đoạn phát triển) và sử dụng biến môi trường phù hợp (vd khi test cần dùng 1 DB riêng, khi dev thì kích hoạt middleware logger hỗ trợ, ...). Cần cài đặt thêm cross-env và tinh chỉnh script để sử dụng.

## b. async/await

- Cho phép viết code bất đồng bộ bằng cú pháp đồng bộ, loại bỏ hoàn toàn callback hell và còn làm tốt hơn cả việc dùng chaining .then()

- 1 sự đánh đổi khi sử dụng async/await ở backend routers là việc phải dùng kèm thêm cả try/catch để xử lý lỗi. Nhưng điều này có thể được giải quyết bằng cách sử dụng thư viện express-async-errors và khai báo nó trong file app.js trước khi khai báo các router. Với package này, try/catch và kể cả next (nếu có sử dụng errorHandler middleware) cũng sẽ được thực thi mà không cần được viết ra tường minh.

- Lưu ý sử dụng thêm `Promise.all()` khi xử lý cùng lúc nhiều promise để đảm bảo code chạy theo trình tự mong muốn; ví dụ khi save 1 array chứa các object vào DB

## c. users administration

### c1. storing users' information in DB

- "Relationship" btw user & user's resources

- Password hash - NEVER let it stored as plain text in DB

**_* MongoDB & mongoose tips_**

  + id thường sẽ được dùng làm ref để liên kết user và các resources.
    
  + Dùng package mongoose-unique-validator để xác thực tính đơn nhất của dữ liệu.
  
  + MongoDB là một dạng non-relational DB, cho nên nó vốn không hỗ trợ join-query (truy vấn dữ liệu kết hợp nhiều bảng dữ liệu). Mongoose giúp khắc phục nhược điểm này, ví dụ bằng thuộc tính `ref:` khi thiết kế schema hoặc phương thức populate() khi trả dữ liệu ở route. Tuy nhiên, cần lưu ý bản chất thực sự đây vẫn là việc thực hiện liên tiếp nhiều truy vấn đơn lẻ để gộp dữ liệu giữa các bảng, và không như relational DB, việc truy vấn này của mongoose sẽ không đảm bảo tính transactional - tức là đảm bảo trạng thái nguyên vẹn của dữ liệu.
  
  + Khi populate, có thể lựa chọn trường dữ liệu cần join bằng cách sử dụng cú pháp: `{keyname1: 1, keyname2: 1}` 

### c2. Token-based authentication
- JWT (JSON Web Tokens):
1. Người dùng nhập thông tin đăng nhập (username & password)
2. Server kiểm tra thông tin đăng nhập, nếu đúng sẽ tạo 1 JWT token bao gồm thông tin người dùng, thời gian hết hạn. Token này được mã hóa bằng thuật toán HS256 kết hợp sử dụng secret key (.env).
3. Token JWT được gửi trả về cho người dùng.
4. Với mỗi request tiếp theo, người dùng sẽ gửi token JWT này trong header Authorization.
5. Server sẽ giải mã token JWT, kiểm tra hạn sử dụng, tính hợp lệ và lấy thông tin người dùng từ payload.
6. Nếu token hợp lệ, người dùng được xác thực và cho phép truy cập vào tài nguyên.
7. Nếu token không hợp lệ, truy cập sẽ bị từ chối.
8. Quá trình này giúp xác thực người dùng mà không cần lưu trữ phiên làm việc trên server.
Như vậy JWT giúp xác thực người dùng 1 cách stateless và an toàn. Token JWT chứa đựng thông tin xác thực đã được mã hóa.

- Hạn chế của token-based authentication:

+ server/API blind trust in token holder. Miễn là người dùng cung cấp token hợp lệ, server vẫn tiếp tục cho phép người dùng truy cập. Tuy nhiên trên thực tế, quyền truy cập của người dùng có thể đã bị huỷ (do bị ban, bị restrict, ...); nhưng nếu họ vẫn đang nắm giữ một token hợp lệ và chưa hết hạn từ phiên đăng nhập trước; họ vẫn có thể truy cập tài nguyên bằng token này. Nghĩa là một khi đã cấp token cho người dùng, server không thể chủ động thu hồi/huỷ token này để hạn chế khả năng truy cập của người dùng; từ đó ảnh hưởng đến khả năng bảo mật của ứng dụng. Một giải pháp đơn giản đó là đặt expire time ngắn để nếu có bị hack; token cũng chỉ có giá trị sử dụng trong thời gian ngắn; nhưng đổi lại, nó yêu cầu người dùng phải đăng nhập lại thường xuyên.

+ Server-side-session: Giải pháp này cho phép server chủ động hơn trong việc kiểm soát token của người dùng. Với SSS, token được cấp chỉ đơn giản là 1 string ngẫu nhiên, không dùng payload thông tin người dùng để mã hoá nữa. Token sau đó được lưu vào DB để tham chiếu đến người dùng tương ứng. Việc xác thực token vẫn diễn ra với mỗi request, nhưng logic của việc xác thực lúc này sẽ là tìm kiếm trong DB để xem có user nào sở hữu 1 token trùng với token mà browser gửi đi hay không. Và bằng cách này, server hoàn toàn kiểm soát quyền truy cập của người dùng đơn giản bằng cách giữ lại hoặc xoá đi token đó trong DB. Tuy nhiên, hệ quả là nó làm giảm hiệu năng khi đòi hỏi việc lưu trữ token trên DB; cũng như phải verify sự tồn tại của token (chính xác tìm kiếm trong DB) với mỗi lượt request. Token lúc này sẽ là stateful so với stateless khi triển khai JWT thông thường.

+ So sánh một cách cụ thể, với việc triển khai JWT thông thường, server chỉ yêu cầu request gửi kèm 1 token còn hiệu lực; việc xác thực thông tin trong token chỉ xảy ra với những endpoint/operation cần đến yếu tố tác nhân (vd: thay đổi data của user nào?). Nghĩa là một người dùng mất quyền truy cập vẫn có truy cập các tài nguyên kiểm soát lỏng lẻo (vd truy cập trang chủ). Trong khi với SSS, việc xác thực token-người dùng luôn được thực hiện, giúp hạn chế tối đa sự xâm phạm của người dùng không có quyền.

---

# PART 5

## a. Frontend login

_* Lưu ý khi sử dụng localStorage: Giá trị được lưu thuộc dạng DOMstring (tương tự kiểu string của JS), cho nên không thể trực tiếp setItem với 1 obj mà phải chuyển sang dạng chuỗi JSON (`JSON.stringify()`). Tương tự, khi đọc giá trị từ localStorage, cần parse (`JSON.parse()`) nó về đúng kiểu dữ liệu gốc._

- Token lưu trữ ở localStorage có thể bị đánh cắp bằng hình thức tấn công XSS (Cross-site scripting). Khi lưu token dưới dạng httpOnly cookies, mã JS có thể sẽ không truy cập được token; nhưng đây vẫn không phải giải pháp bảo mật tối ưu.

## b. React props.children and prototypes

- `{props.children}` được dùng để render 1 component con bên trong component cha, với điều kiện component cha phải sử dụng cặp tag đóng mở: 

```
<Parent>
//...states and logics
return(
//...
{props.children} //component con được render bên trong component cha
//...
)
</Parent>
``` 
- Ứng dụng: thường dùng để viết các conditional rendering component, ví dụ các toggable component.

- Nên cân nhắc việc đặt state hợp lý, dùng ở đúng nơi cần dùng; tránh lạm dụng lifting state up và nhồi nhát tất cả states vào component App.

- React `useRef()`: https://react.dev/learn/referencing-values-with-refs

  + Dùng để lưu một giá trị không dùng cho việc render (mutable nhưng không phải state), ví dụ tham trị trong một event handler hay id của một interval (để clear interval đó). Việc thay đổi giá trị này (ref.current) sẽ không trigger re-render.
  
  + Khi khai báo biến `eleRef = useRef()`, sau đó đặt nó vào một component bằng props ref `<MyComponent ref={eleRef}/>`, ta có thể dùng biến `eleRef` để tham chiếu đến `<MyComponent/>`. 
  
  + Thông qua ref, ta thậm chí có thể gọi được các prop/state/method của `<MyComponent/>` ở bên ngoài component này. Để làm điều đó, trước tiên cần  bọc component bằng phương thức `React.forwardRef()` để cho phép React có thể truy cập và ghi lại prop/state/method của component vào ref. Kế tiếp, cần sử dụng phương thức `useImerativeHandle()` để khai báo cụ thể các phương thức/state/method mà component này muốn chia sẻ. Sau đó, khi đứng ở một component khác, ta vẫn có thể gọi đến và sử dụng các prop/state/method của `<MyComponent/>` như các biến toàn cục.

- Nếu không sử dụng async/await mà dùng promise và chaining .then(), phải sử dụng phương thức `.catch()` thay cho try/catch block để hanlde lỗi trong quá trình xử lý bất đồng bộ.

- Tương tự với việc sử dụng moongose để validate/set required cho dữ liệu; prop-types được dùng để kiểm tra các prop truyền cho component có chính xác / đầy đủ hay không.

## c. Testing react frontend

- `npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-env @babel/preset-react`

- coverage: tính bao quát của test suite đối với từng component.

## d. End to end testing

- `npm install --save-dev cypress`