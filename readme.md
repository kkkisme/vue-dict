## Vue-dict plugin

| option   |     type       |  default |
|:----------:|:-------------:|------:|
| request |  `(dictKeys) => Promise` | / |

### Use Case

- main.js
```js
import Vue from 'vue'
import dictPlugin from './path/to/dict'

Vue.use(dictPlugin, {
  request: (keys) => {
    return new Promise(resolve => {
      setTimeout(function(dict) {
        // cacheBySessionStorage(dict)
        // const dict = getDictFromSessionStorageByKeys(keys)
        resolve(dict)
      }, 1000, [
        // you should transform dict data to this structure
        {
          dict: 'GENDER',
          value: [
            {label: '男', value: '1'},
            {label: '女', value: '2'}
          ]
        },
        {
          dict: 'TYPE',
          value: [
            {label: '高级', value: '1'},
            {label: '中级', value: '2'}
          ]
        }
      ])
    })
  }
})
```
- MyComponent.vue
```vue
<template>
    <div>
      <div>{{dict.GENDER}}</div>
      <div>{{dict.myType}}</div>
    </div>
</template>

<script >
export default {
  name: 'MyComponent',
  dict: ['GENDER', ['TYPE', 'myType']]
}
</script>
```

