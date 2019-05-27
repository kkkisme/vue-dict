export default {
  install (Vue, options={}) {
    Vue.mixin({
      data() {
        if (process.env.NODE_ENV !== 'production') {
          return {
            dict: {
              __isDictPlugin__: true
            }
          }
        }
        return {
          dict: {}
        }
      },
      created() {
        if (
          process.env.NODE_ENV !== 'production'
          && ((this.data && !this.data.__isDictPlugin__) || [0, '', null].includes(this.dict))
        ) {
          throw new Error(`Do not set 'dict' in data function since you use vue-dict plugin`)
        }

        const {request} = options
        const dict = this.$options.dict
        if (dict && Array.isArray(dict)) {
          const dictKeys = trans2DictKeys(dict)
          const vmDataKeys = trans2DataKeys(dict)
          initState(this, vmDataKeys)
          request(dictKeys).then(res => {
            setData(this, res, dictKeys, vmDataKeys)
          })
        }
      }
    })
  }
}


function trans2DictKeys(dict) {
  return dict.reduce((acc, cur) => {
    if (typeof cur === 'string' && cur) {
      acc.push(cur)
      return acc
    }
    if (Array.isArray(cur)) {
      acc.push(cur[0])
      return acc
    }
  }, [])
}

function trans2DataKeys(dict) {
  return dict.reduce((acc, cur) => {
    if (typeof cur === 'string' && cur) {
      acc.push(cur)
      return acc
    }
    if (Array.isArray(cur)) {
      acc.push(cur.pop())
      return acc
    }
  }, [])
}

function initState(vm, keys) {
  for(let key of keys) {
    vm.$set(vm.dict, key, [])
  }
}

function setData(vm, dict, dictKeys, dataKeys) {
  dataKeys.forEach((key, idx) => {
    let value = dict.find(_ => {
      return  _.dict === dictKeys[idx]
    })
    vm.$set(vm.dict, key, (value && value.value) || [])
  })
}
