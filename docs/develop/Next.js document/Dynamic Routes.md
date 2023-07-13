---
date: '2023-07-03'
log: 00038 
---

:::info
다음은 **[Next.js 공식 문서](https://nextjs.org/learn/foundations/about-nextjs)**를 참고한 글입니다.
:::

### 배울 내용
---
- How to statically generate pages with [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) using [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).
- How to write [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) to fetch the data for each blog post.
- How to render markdown using [`remark`](https://github.com/remarkjs/remark).
- How to pretty-print date strings.
- How to link to a page with [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes).
- Some useful information on [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes).

### Page Path Depends on External Data
---

<img src="https://i.ibb.co/V3b4kZr/page-path-external-data.png"/>

**들어가기에 앞서**
- 외부 데이터에 의존하는 경로가 있는 페이지를 정적으로 생성할 수 있다.
- 이를 통해 Next.js에서 동적 URL이 활성화됩니다.

<br/>

**동적 경로로 페이지를 생성하는 방법**
<img src="https://i.ibb.co/PxCJYqW/how-to-dynamic-routes.png"/>

- 각 게시물의 경로를 갖기 위해 /posts/\<id\>의 형태로 구현한다. 여기서 id는 최상위 posts 디렉토리 하위에 있는 마크다운 파일 이름이다.
- pages/posts 아래에 \[id\].js 라는 페이지를 생성한다. \[로 시작되어 \]로 끝나는 경우 Next.js에서 동적 경로로 사용된다.
- pages/posts/\[id\].js 소스코드 작성

```jsx
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // id 값 반환 메서드
}

export async function getStaticProps({ params }) {
  // params.id를 사용하여 블로그 게시물에 필요한 데이터를 가져오기
}
```

### getStaticPaths 구현
---

**구현하기**
- pages/posts 내부에 \[id\].js 생성
- pages/posts 내부에 있는 first-post.js 삭제
- lib/posts.js 구현
```jsx
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
```

**중요** : 반환된 목록은 단순한 문자열 배열이 _아니라_ 위의 주석처럼 보이는 개체 배열이어야 한다 **.** 각 개체에는 키가 있어야 하며 키가 `params`있는 개체를 포함해야 한다. ( 파일 이름에 `id`사용하기 때문 ). 그렇지 않으면 getStaticPaths가 실패한다.

- getAllPostIds 구현
```js
import { getAllPostIds } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```
- getStaticPaths적용
```js
import { getAllPostIds } from '../../lib/posts';
space
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
```

### getStaticProps 구현
---

**getPostDate 구현**
- 주어진 ID로 게시물을 렌더링하는 데 필요한 데이터를 가져와야 한다.
```jsx
export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
```

<br/>

**getStaticProps를 통해 데이터 불러오기**
```js
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

<br/>

**POST 컴포넌트 적용**
```jsx
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
```