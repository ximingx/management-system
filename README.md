# 



##



###  1. 

初始化项目

```bash
$ npm init vue@latest
```

![image-20230531111533399](md_assets/image-20230531111533399.png)

安装依赖

```bash
$ npm install
```

### 解决vue文件类型未找到

![image-20230531113254374](md_assets/image-20230531113254374.png)

```tsx
// env.d.ts
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
```

