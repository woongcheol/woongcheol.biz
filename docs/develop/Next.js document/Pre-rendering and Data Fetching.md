---
date: '2023-07-02'
log: '00036'
---

:::info
다음은 **[Next.js 공식 문서](https://nextjs.org/learn/foundations/about-nextjs)**를 참고한 글입니다.
:::

### 배울 내용
---
- Next.js’ [pre-rendering](https://nextjs.org/docs/basic-features/pages#pre-rendering) feature
- The two forms of pre-rendering: [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) and [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering)
- Static Generation [with data](https://nextjs.org/docs/basic-features/pages#static-generation-with-data), and [without data](https://nextjs.org/docs/basic-features/pages#static-generation-without-data)
- getStaticProps and how to use it to import external blog data into the index page.  
- Some useful information on getStaticProps

### Pre-rendering
---

<img src="https://i.ibb.co/JyR1vM8/Untitled.png"/>

**들어가기에 앞서**
- 기본적으로 Next.js는 모든 페이지를 사전 렌더링한다.
- 즉, Next.js는 클라이언트 측 JavaScript에서 모든 작업을 수행하는 대신 미리 각 페이지에 대한 HTML을 생성한다.
- 사전 렌더링은 더 나은 성능과 SEO를 가져올 수 있다.
- 생성된 각 HTML은 해당 페이지에 필요한 최소한의 JavaScript 코드와 연결된다.
- 페이지가 브라우저에 의해 로드되면 해당 JavaScript 코드가 실행되어 페이지가 완전히 상호 작용하도록 해야한다.

<br/>

**사전 렌더링이 진행 중인지 확인**
1. 브라우저에서 JavaScript 비활성화([Chrome 설정 방법](https://developer.chrome.com/docs/devtools/javascript/disable/))
2. 이 [페이지](https://next-learn-starter.vercel.app/) 액세스
3. 앱이 JavaScript 없이 렌더링되는 것을 확인할 수 있음
    - 이는 Next.js가 앱을 정적 HTML로 미리 렌더링하여 JavaScript를 실행하지 않고도 앱 UI를 볼 수 있기 때문

<br/>

**사전 렌더링이 되지 않을 경우**
1. 브라우저에서 JavaScript 활성화
2. 이 [페이지](https://create-react-template.vercel.app/) 액세스
3. 브라우저에서 JavaScript 비활성화
4. 다시 [페이지](https://create-react-template.vercel.app/) 액세스

### Pre-rendering and Data Fetching
---

**들어가기에 앞서**

- Next.js에는 정적 생성 및 서버 측 렌더링이라는 두가지 사전 렌더링 형식이 있다.
- 차이점은 페이지에 대한 HTML을 생성할 때 이다.
    - 정적 생성은 빌드 시 HTML을 생성하는 사전 렌더링 방법이다. 미리 렌더링된 HTML이 각 요청에 의해 재사용된다.
    - 서버측 렌더링은 각 요청에서 HTML을 생성하는 사전 렌더링 방법이다.
- 개발 모드에서는 모든 요청마다 사전 렌더링을 한다.(정적 생성 포함) 단 프로덕션 전환 시 정적 생성은 모든 요청이 아닌 빌드 시 한번만 발생한다.

<br/>

**정적 생성**
<img src="https://i.ibb.co/vQWSQss/Untitled-1.png"/>

**서버 측 렌더링**

<img src="https://i.ibb.co/Hx9bYxs/Untitled-2.png"/>

<br/>

**Per-page Basis**
<img src="https://i.ibb.co/FzxPh8S/Untitled-3.png"/>

- 각 페이지에 사용한 사전 렌더링 유형을 선택할 수 있다.
- 대부분의 페이지에는 정적 생성을 사용하고, 다른 페이지에는 서버 측 렌더링을 적용하여 하이브리드 Next.js 앱을 만들 수 있다.

<br/>

**정적 생성과 서버 측 렌더링을 사용해야 하는 경우**

- 페이지를 한 번 빌드하고 CDN에서 제공할 수 있으므로 가능한 한 정적 생성을 사용하는 것이 좋다.
- 이렇게 하면 요청이 있을 때마다 서버에서 페이지를 렌더링하는 것보다 훨씬 빠르다.
- 다음을 포함해 다양한 유형의 페이지에 대해 정적 생성을 사용할 수 있다.
    - 마케팅 페이지
    - 블로그 게시물
    - 전자상거래 제품 목록
    - 도움말 및 설명서
- 반면 정적 생성은 사용자 요청보다 먼저 페이지를 미리 렌더링할수 없는 경우 좋은 생각이 아니다. 이러한 경우 서버측 렌더링을 사용할 수 있다.
    - 페이지에 자주 업데이트되는 데이터가 표시되거나 페이지 컨텐츠가 모든 요청에서 변경될 수 있을 경우 등
    - 속도는 느려지지만 미리 렌더링된 페이지는 항상 최신 상태를 유지한다.
    - 또는 사전 렌더링을 건너뛰고 클라이언트 측 JavaScript를 사용하여 자주 업데이트 되는 데이터를 채울 수 있다.
- **Next13부터는 컴포넌트별로 적용할 수 있다.**

### Static Generation with and without Data
---

**들어가기에 앞서**
- 정적 생성은 데이터 유무에 관계없이 수행할 수 있다.
- 외부 데이터를 가져올 필요가 없는 페이지는 앱이 프로덕션 용으로 빌드될 때 자동으로 정적으로 생성된다.
- 그러나 일부 페이지의 경우 외부 데이터를 먼저 가져오지 않고는 HTML을 렌더링하지 못할 수 있다.
- 파일 시스템에 액세스 하거나 외부 API를 가져오거나 빌드 시 DB 쿼리를 해야할 경우가 있다.
- 이러한 경우 Next.js는 데이터를 사용한 정적 생성을 지원한다.  

<br/>

**데이터가 없는 정적 생성**
<img src="https://i.ibb.co/p0Lwccz/Untitled-4.png"/>

<br/>

**데이터가 있는 정적 생성**
<img src="https://i.ibb.co/G3Rnj8T/Untitled-5.png"/>

<br/>

**Static Generation with Data using getStaticProps**

```jsx
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

**참고: 개발 모드에서는 각 요청에 대해 getStaticProps가 대신 실행된다.**

<aside> 💡 기본적으로 getStaticProps를 사용하면 Next.js에 "이 페이지에는 몇 가지 데이터 종속성이 있으므로 빌드 시 이 페이지를 미리 렌더링할 때 먼저 종속성을 해결하세요!"라고 말할 수 있다.

</aside>

### 간단한 블로그 아키텍처 만들기

---

**들어가기에 앞서**

1. 이 예제의 블로그 게시물은 응용 프로그램의 디렉터리에 로컬 마크다운으로 저장된다.
2. 외부 데이터 소스에서 가져오지 않으며, 파일 시스템에서 데이터를 읽어야 한다.

<br/>

**파일 시스템을 읽기 위한 유틸리티 함수 만들기**

- 요구사항
    - 각 마크다운 파일을 구문분석 : title, date, file name
    - 인덱스 페이지에 날짜별로 정렬된 데이터를 나열

```jsx
import fs from 'fs';  // 파일 시스템 모듈(fs)을 가져옴
import path from 'path';  // 경로 모듈(path)을 가져옴
import matter from 'gray-matter';  // gray-matter 모듈을 가져옴

const postsDirectory = path.join(process.cwd(), 'posts');  // 현재 작업 디렉토리의 'posts' 경로를 postsDirectory 변수에 저장

export function getSortedPostsData() {

  // /posts 디렉토리의 파일 이름들을 가져옴
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {

    // 파일 이름에서 ".md"를 제거하여 id를 얻음
    const id = fileName.replace(/\\.md$/, '');

    // 마크다운 파일을 문자열로 읽음
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matter를 사용하여 포스트 메타데이터 섹션을 구문 분석함
    const matterResult = matter(fileContents);

    // id와 데이터를 결합하여 반환
    return {
      id,
      ...matterResult.data,
    };
  });
  
  // 날짜별로 포스트를 정렬하여 반환
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
```

<br/>

**블로그 데이터 가져오기**

<img src="https://i.ibb.co/7gN4mHC/Untitled-6.png"/>

### Implement getStaticProps

---

```jsx
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
```

### getStaticProps Details

---

**외부 API 가져오기**

```jsx
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return res.json();
}
```

<aside> 💡 Next.js는 클라이언트와 서버 모두에서 fetch()를 폴리필하기 때문에 임포트할 필요가 없다.

</aside>

<br/>

**DB 쿼리**

```jsx
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

- getStaticProps는 서버 측에서만 실행된다.
- 클라이언트 측에서는 실행되지 않고 브라우저용 JS 번들에도 포함되지 않는다.
- 이로 인해, 데이터베이스 쿼리와 같은 코드를 브라우저로 전송하지 않고도 작성할 수 있다.

<br/>

**Development vs. Production**

- 개발(npm run dev 또는 yarn dev)에서는 모든 요청에 대해 getStaticProps가 실행된다.
- 프로덕션에서는 빌드 시점에 getStaticProps가 실행된다. 그러나 이 동작은 getStaticPaths가 반환하는 폴백 키를 사용하여 개선할 수 있습니다.
- 빌드 시 실행되도록 되어 있기 때문에 쿼리 매개 변수 또는 HTTP 헤더와 같이 요청 시에만 사용할 수 있는 데이터를 사용할 수 없다.

<br/>

**페이지 내에서만 허용**

- getStaticProps는 페이지에서만 내보낼 수 있다. 페이지가 아닌 파일에서는 내보낼 수 없다.
- 제한의 이유 중 하나는 페이지가 렌더링되기 전에 React에 필요한 모든 데이터가 있어야 하기 때문이다.

<br/>

**요청 시간에 데이터를 가져와야 하는 경우 어떻게 해야 합니까?**

- 정적 생성은 빌드 시 한 번 발생하므로 자주 업데이트되거나 사용자 요청마다 변경되는 데이터에는 적합하지 않다.
- 데이터가 변경될 가능성이 있는 경우 **[서버 측 렌더링을](https://nextjs.org/docs/basic-features/pages#server-side-rendering)** 사용할 수 있다.

### Fetching Data at Request Time
---

<img src="https://i.ibb.co/xX0Rwhg/Untitled-7.png"/>

**들어가기에 앞서**
- 빌드 시간이 아닌 요청 시간에 데이터를 가져와야 하는 경우 서버 측 렌더링을 시도할 수 있다.
- 서버 측 렌더링을 사용하려면 페이지에서 getStaticProps 대신 getServerSideProps를 적용해야한다.

<br/>

**Using getServerSideProps**

```jsx
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

- getServerSideProps는 요청 시 호출되므로 매개변수(컨텍스트)에 요청 관련 매개변수가 포함된다.
- 요청 시 데이터를 가져와야 하는 페이지를 미리 렌더링해야 하는 경우에만 getServerSideProps를 사용해야한다.
- 서버가 모든 요청에 대해 결과를 계산해야 하고 추가 구성 없이는 CDN에서 결과를 캐시할 수 없기 때문에 첫 번째 바이트까지의 시간(TTFB)이 getStaticProps보다 느리다.

<br/>

**Client-side Rendering**
<img src="https://i.ibb.co/W2XW73F/Untitled-8.png"/>

- 데이터를 미리 렌더링할 필요가 없는 경우 클라이언트 측 렌더링을 사용할 수 있다.
    - 외부 데이터가 필요하지 않은 페이지 부분을 정적으로 생성한다.
    - 페이지가 로드되면 JavaScript를 사용해 클라이언트에서 외부 데이터를 가져오고 나머지 부분을 채운다.
- 이러한 접근 방식은 사용자 대시보드 페이지에 적합하다.
    - 대시보드는 비공개의 사용자별 페이지이므로 SEO와 관련이 없고, 페이지를 미리 렌더링할 필요가 없다.
    - 데이터는 자주 업데이트 되므로 요청 시 데이터를 가져와야 한다.

<br/>

**SWR**
- SWR는 데이터 가져오기를 위한 React 후크이다.
- 데이터를 가져오는 경우 이 방법을 권장한다. 캐싱, 재검증, 포커스 추적, 일정 간격으로 다시 가져오기 등을 처리할 수 있다.
- 사용 예시
```jsx
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```